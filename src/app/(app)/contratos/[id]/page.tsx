'use client';

import {
  Badge,
  Banner,
  Breadcrumb,
  Button,
  Card,
  Spinner,
  Tooltip,
  useToast,
} from '@/components/ui';
import { useContrato } from '@/hooks/useContratos';
import { contratoStatus, escopoLabel } from '@/lib/status';
import { formatBRL, formatDate } from '@/lib/format';

export default function ContratoDetalhePage({ params }: { params: { id: string } }) {
  const { data, isLoading, error } = useContrato(params.id);
  const toast = useToast();

  if (isLoading) return <Spinner />;
  if (error || !data) return <Banner tone="warn">Contrato não encontrado.</Banner>;

  const c = data.contrato;
  const s = contratoStatus[c.status];

  return (
    <div className="mu-stack" style={{ maxWidth: 820 }}>
      <Breadcrumb items={[{ label: 'Contratos', href: '/contratos' }, { label: c.colaboradorNome }]} />

      <div className="mu-row mu-row--between">
        <div>
          <h1 className="mu-page-title" style={{ marginBottom: 4 }}>
            {c.colaboradorNome}
          </h1>
          <span className="mu-row" style={{ gap: 8 }}>
            <span className="mu-muted">{c.imovel}</span>
            <Badge tone={s.tone}>{s.label}</Badge>
          </span>
        </div>
      </div>

      <div className="mu-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <Card>
          <h2 style={{ fontSize: 18 }}>Imóvel e partes</h2>
          <p><span className="mu-muted">Imóvel:</span> {c.imovel}</p>
          <p><span className="mu-muted">Proprietário:</span> {c.proprietario}</p>
          <p><span className="mu-muted">Imobiliária:</span> {c.imobiliaria}</p>
          <p>
            <span className="mu-muted">Vigência:</span> {formatDate(c.vigenciaInicio)}
            {c.vigenciaFim ? ` — ${formatDate(c.vigenciaFim)}` : ''}
          </p>
          <p className="mu-row" style={{ gap: 6 }}>
            <span className="mu-muted">Escopo da garantia:</span>
            <Tooltip label="Defina o escopo na originação; cobre só inadimplência salvo indicação em contrário.">
              <strong>{escopoLabel[c.escopo]}</strong>
            </Tooltip>
          </p>
        </Card>

        <Card>
          <h2 style={{ fontSize: 18 }}>Split na fonte</h2>
          <table className="mu-table">
            <tbody>
              <tr>
                <td>Aluguel → proprietário <span className="mu-muted">(primeiro)</span></td>
                <td className="num">{formatBRL(c.aluguelCents)}</td>
              </tr>
              <tr>
                <td>Líquido → PJ</td>
                <td className="num">{formatBRL(c.liquidoCents)}</td>
              </tr>
              <tr>
                <td>Taxa (garantia)</td>
                <td className="num">{formatBRL(c.taxaCents)}</td>
              </tr>
              <tr>
                <td className="mu-muted">└ Fundo de reserva</td>
                <td className="num mu-muted">{formatBRL(c.fundoCents)}</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>

      <Card>
        <h2 style={{ fontSize: 18 }}>Documentos</h2>
        {c.documentos.length === 0 ? (
          <p className="mu-muted">Documentos disponíveis quando a originação concluir.</p>
        ) : (
          <ul>
            {c.documentos.map((d, i) => (
              <li key={i} className="mu-row mu-row--between" style={{ maxWidth: 360 }}>
                <span>{d.nome}</span>
                <Button variant="ghost" onClick={() => toast.success(`Baixando ${d.nome}…`)}>
                  Baixar
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card>
        <h2 style={{ fontSize: 18 }}>Histórico</h2>
        {c.eventos.length === 0 ? (
          <p className="mu-muted">Sem eventos ainda.</p>
        ) : (
          <ul>
            {c.eventos.map((e, i) => (
              <li key={i}>
                <span className="mu-muted">{formatDate(e.data)}:</span> {e.descricao}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
