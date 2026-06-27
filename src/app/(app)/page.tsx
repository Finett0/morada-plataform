'use client';

import Link from 'next/link';
import {
  Banner,
  Button,
  Card,
  CostZeroBanner,
  EmptyState,
  KpiCard,
  Spinner,
  Table,
  type Column,
} from '@/components/ui';
import { useDashboard } from '@/hooks/useDashboard';
import { usePermissions } from '@/hooks/useSession';
import { formatBRL, formatDate, formatMonth } from '@/lib/format';
import { faturaStatus } from '@/lib/status';
import { Badge } from '@/components/ui';
import type { FaturaStatus } from '@/lib/types';

interface Vencimento {
  id: string;
  mesRef: string;
  vencimento: string;
  totalCents: number;
  status: string;
}

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboard();
  const { can } = usePermissions();

  if (isLoading) return <Spinner />;
  if (error || !data) return <Banner tone="warn">Não foi possível carregar o dashboard.</Banner>;

  const cols: Column<Vencimento>[] = [
    { key: 'mes', header: 'Mês', render: (v) => formatMonth(v.mesRef) },
    { key: 'venc', header: 'Vencimento', render: (v) => formatDate(v.vencimento) },
    { key: 'total', header: 'Total', numeric: true, render: (v) => formatBRL(v.totalCents) },
    {
      key: 'status',
      header: 'Status',
      render: (v) => {
        const s = faturaStatus[v.status as FaturaStatus];
        return <Badge tone={s.tone}>{s.label}</Badge>;
      },
    },
  ];

  return (
    <div className="mu-stack">
      <div>
        <p className="eyebrow">Visão geral</p>
        <h1 className="mu-page-title">Dashboard</h1>
      </div>

      <CostZeroBanner />

      <div className="mu-grid mu-grid--kpi">
        <KpiCard label="Colaboradores ativos" value={data.colaboradoresAtivos} />
        <KpiCard label="Contratos ativos" value={data.contratosAtivos} />
        <KpiCard label="Em originação" value={data.emOriginacao} />
        <KpiCard label="Custo da empresa" value={formatBRL(data.custoEmpresaCents)} hint="Incremental: R$ 0" />
        <KpiCard
          label="Economia gerada (PJ)"
          value={formatBRL(data.economiaGeradaCents)}
          hint="vs. ~12% por conta própria"
        />
      </div>

      <div className="mu-row" style={{ gap: 12 }}>
        {can('colaborador:criar') ? (
          <Link href="/colaboradores/novo">
            <Button>Cadastrar colaborador</Button>
          </Link>
        ) : null}
        <Link href="/faturas">
          <Button variant="secondary">Ver faturas</Button>
        </Link>
      </div>

      <Card>
        <h2 style={{ fontSize: 18 }}>Pendências</h2>
        {data.pendencias.length === 0 ? (
          <p className="mu-muted">Nada pendente. 🎉</p>
        ) : (
          <ul style={{ paddingLeft: 18 }}>
            {data.pendencias.map((p, i) => (
              <li key={i} style={{ marginBottom: 6 }}>
                <span className="eyebrow" style={{ marginRight: 8 }}>
                  {p.tipo}
                </span>
                <Link href={p.href}>{p.descricao}</Link>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card>
        <h2 style={{ fontSize: 18 }}>Próximos vencimentos</h2>
        {data.proximosVencimentos.length === 0 ? (
          <EmptyState title="Sem faturas em aberto" />
        ) : (
          <Table columns={cols} rows={data.proximosVencimentos} rowKey={(v) => v.id} />
        )}
      </Card>
    </div>
  );
}
