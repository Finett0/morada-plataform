'use client';

import { useState } from 'react';
import {
  Badge,
  Banner,
  Breadcrumb,
  Button,
  Card,
  ConfirmModal,
  CostZeroBanner,
  Spinner,
  useToast,
} from '@/components/ui';
import { useFatura, usePagarFatura } from '@/hooks/useFaturas';
import { usePermissions } from '@/hooks/useSession';
import { faturaStatus } from '@/lib/status';
import { formatBRL, formatDate, formatMonth } from '@/lib/format';

export default function FaturaDetalhePage({ params }: { params: { id: string } }) {
  const { data, isLoading, error } = useFatura(params.id);
  const pagar = usePagarFatura(params.id);
  const { can } = usePermissions();
  const toast = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (isLoading) return <Spinner />;
  if (error || !data) return <Banner tone="warn">Fatura não encontrada.</Banner>;

  const f = data.fatura;
  const s = faturaStatus[f.status];
  const totalRetencao = f.linhas.reduce((sum, l) => sum + (l.retencaoCents ?? 0), 0);

  return (
    <div className="mu-stack" style={{ maxWidth: 900 }}>
      <Breadcrumb items={[{ label: 'Faturas', href: '/faturas' }, { label: formatMonth(f.mesRef) }]} />

      <div className="mu-row mu-row--between">
        <div>
          <h1 className="mu-page-title" style={{ marginBottom: 4 }}>
            {formatMonth(f.mesRef)}
          </h1>
          <span className="mu-row" style={{ gap: 8 }}>
            <span className="mu-muted">Vence {formatDate(f.vencimento)}</span>
            <Badge tone={s.tone}>{s.label}</Badge>
          </span>
        </div>
        <div className="mu-row" style={{ gap: 8 }}>
          <Button variant="secondary" onClick={() => toast.success('Baixando comprovante…')}>
            Baixar PDF
          </Button>
          {f.status !== 'paga' && can('fatura:pagar') ? (
            <Button variant="accent" onClick={() => setConfirmOpen(true)}>
              Pagar fatura
            </Button>
          ) : null}
        </div>
      </div>

      <CostZeroBanner />

      <Card>
        <h2 style={{ fontSize: 18 }}>Split por colaborador</h2>
        <table className="mu-table">
          <thead>
            <tr>
              <th>Colaborador</th>
              <th className="num">Aluguel → proprietário</th>
              <th className="num">Líquido → PJ</th>
              <th className="num">Taxa</th>
              <th className="num">Fundo</th>
            </tr>
          </thead>
          <tbody>
            {f.linhas.map((l) => (
              <tr key={l.colaboradorId}>
                <td>{l.colaboradorNome}</td>
                <td className="num">{formatBRL(l.aluguelCents)}</td>
                <td className="num">{formatBRL(l.liquidoCents)}</td>
                <td className="num">{formatBRL(l.taxaCents)}</td>
                <td className="num mu-muted">{formatBRL(l.fundoCents)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>
                <strong>Total</strong>
              </td>
              <td className="num">
                <strong>{formatBRL(f.totalCents)}</strong>
              </td>
            </tr>
          </tfoot>
        </table>

        {totalRetencao > 0 ? (
          <Banner tone="warn">
            Retenção por trava de rescisão nesta fatura: {formatBRL(totalRetencao)} (cobre até ~3
            meses até a desocupação).
          </Banner>
        ) : null}
      </Card>

      <ConfirmModal
        open={confirmOpen}
        title="Pagar fatura"
        description={`Confirmar o pagamento de ${formatBRL(f.totalCents)}? O split é executado na fonte (aluguel primeiro).`}
        confirmLabel="Pagar"
        loading={pagar.isPending}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() =>
          pagar.mutate(undefined, {
            onSuccess: () => setConfirmOpen(false),
          })
        }
      />
    </div>
  );
}
