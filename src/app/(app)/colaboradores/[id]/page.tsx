'use client';

import Link from 'next/link';
import {
  Badge,
  Banner,
  Breadcrumb,
  Button,
  Card,
  Spinner,
  Timeline,
  Tooltip,
  useToast,
  type TimelineItem,
} from '@/components/ui';
import { useColaborador } from '@/hooks/useColaboradores';
import { usePermissions } from '@/hooks/useSession';
import { colaboradorStatus } from '@/lib/status';
import { formatBRL, formatCNPJ } from '@/lib/format';

export default function ColaboradorDetalhePage({ params }: { params: { id: string } }) {
  const { data, isLoading, error } = useColaborador(params.id);
  const { can } = usePermissions();
  const toast = useToast();

  if (isLoading) return <Spinner />;
  if (error || !data) return <Banner tone="warn">Colaborador não encontrado.</Banner>;

  const { colaborador: c, contrato, desligamento } = data;
  const s = colaboradorStatus[c.status];
  const podeDesligar = can('colaborador:desligar') && (c.status === 'ativo' || c.status === 'em_originacao');

  const timeline: TimelineItem[] = c.etapas.map((e) => ({
    title: e.nome,
    status: e.status,
    detail: e.motivo,
  }));

  return (
    <div className="mu-stack" style={{ maxWidth: 820 }}>
      <Breadcrumb items={[{ label: 'Colaboradores', href: '/colaboradores' }, { label: c.nome }]} />

      <div className="mu-row mu-row--between">
        <div>
          <h1 className="mu-page-title" style={{ marginBottom: 4 }}>
            {c.nome}
          </h1>
          <span className="mu-row" style={{ gap: 8 }}>
            <span className="mu-muted">{formatCNPJ(c.cnpj)}</span>
            <Badge tone={s.tone}>{s.label}</Badge>
            {c.thinFile ? (
              <Tooltip label="Vínculo novo/curto: recebível menos provado, risco maior.">
                <Badge tone="warning">thin file</Badge>
              </Tooltip>
            ) : null}
          </span>
        </div>
        <div className="mu-row" style={{ gap: 8 }}>
          {c.status === 'em_originacao' ? (
            <Button variant="secondary" onClick={() => toast.success('Convite reenviado.')}>
              Reenviar convite
            </Button>
          ) : null}
          {podeDesligar ? (
            <Link href={`/colaboradores/${c.id}/desligar`}>
              <Button variant="danger">Iniciar desligamento</Button>
            </Link>
          ) : null}
        </div>
      </div>

      <Card>
        <h2 style={{ fontSize: 18 }}>Originação</h2>
        <Timeline items={timeline} />
      </Card>

      <Card>
        <h2 style={{ fontSize: 18 }}>Financeiro</h2>
        <p className="mu-row mu-row--between">
          <span className="mu-muted">Nota mensal</span>
          <strong>{formatBRL(c.valorNotaCents)}</strong>
        </p>
        {contrato ? (
          <table className="mu-table" style={{ marginTop: 8 }}>
            <tbody>
              <tr>
                <td>Aluguel → proprietário</td>
                <td className="num">{formatBRL(contrato.aluguelCents)}</td>
              </tr>
              <tr>
                <td>Líquido → PJ</td>
                <td className="num">{formatBRL(contrato.liquidoCents)}</td>
              </tr>
              <tr>
                <td>Taxa (garantia)</td>
                <td className="num">{formatBRL(contrato.taxaCents)}</td>
              </tr>
              <tr>
                <td className="mu-muted">└ Fundo de reserva</td>
                <td className="num mu-muted">{formatBRL(contrato.fundoCents)}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="mu-muted">Split definido quando o contrato for originado.</p>
        )}
        {desligamento.retencaoCents > 0 ? (
          <p className="mu-muted" style={{ marginTop: 8 }}>
            Trava de rescisão estimada (~3 meses): {formatBRL(desligamento.retencaoCents)}
          </p>
        ) : null}
      </Card>

      <Card>
        <h2 style={{ fontSize: 18 }}>Contrato</h2>
        {contrato ? (
          <Link href={`/contratos/${contrato.id}`}>Ver contrato {contrato.imovel}</Link>
        ) : (
          <p className="mu-muted">Sem contrato vinculado ainda.</p>
        )}
      </Card>
    </div>
  );
}
