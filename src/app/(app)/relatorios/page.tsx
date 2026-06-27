'use client';

import { Banner, Button, Card, KpiCard, Spinner, useToast } from '@/components/ui';
import { useRelatorio } from '@/hooks/useRelatorios';
import { formatBRL, formatMonth } from '@/lib/format';

export default function RelatoriosPage() {
  const { data, isLoading, error } = useRelatorio();
  const toast = useToast();

  if (isLoading) return <Spinner />;
  if (error || !data) return <Banner tone="warn">Não foi possível carregar os relatórios.</Banner>;

  const max = Math.max(1, ...data.faturamentoMensal.map((m) => m.totalCents));

  return (
    <div className="mu-stack">
      <div className="mu-row mu-row--between">
        <div>
          <p className="eyebrow">Análises</p>
          <h1 className="mu-page-title">Relatórios</h1>
        </div>
        <Button variant="secondary" onClick={() => toast.success('Exportação gerada (CSV/PDF).')}>
          Exportar
        </Button>
      </div>

      <div className="mu-grid mu-grid--kpi">
        <KpiCard label="Colaboradores ativos" value={data.colaboradoresAtivos} />
        <KpiCard label="Contratos ativos" value={data.contratosAtivos} />
        <KpiCard label="Economia gerada (PJ)" value={formatBRL(data.economiaGeradaCents)} hint="vs. seguro fiança" />
        <KpiCard label="Custo da empresa" value={formatBRL(data.custoEmpresaCents)} hint="Incremental: R$ 0" />
      </div>

      <Card>
        <h2 style={{ fontSize: 18 }}>Faturamento mensal</h2>
        <div className="mu-row" style={{ alignItems: 'flex-end', gap: 24, height: 200, marginTop: 16 }}>
          {data.faturamentoMensal.map((m) => (
            <div key={m.mes} style={{ textAlign: 'center', flex: 1, maxWidth: 120 }}>
              <div
                style={{
                  height: `${(m.totalCents / max) * 160}px`,
                  background: 'var(--moss)',
                  borderRadius: '8px 8px 0 0',
                }}
                title={formatBRL(m.totalCents)}
              />
              <div className="eyebrow" style={{ marginTop: 8 }}>
                {formatMonth(m.mes)}
              </div>
              <div className="mu-muted" style={{ fontSize: 12 }}>
                {formatBRL(m.totalCents)}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 style={{ fontSize: 18 }}>Detalhamento</h2>
        <table className="mu-table">
          <thead>
            <tr>
              <th>Mês</th>
              <th className="num">Faturamento</th>
            </tr>
          </thead>
          <tbody>
            {data.faturamentoMensal.map((m) => (
              <tr key={m.mes}>
                <td>{formatMonth(m.mes)}</td>
                <td className="num">{formatBRL(m.totalCents)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
