'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Badge,
  Banner,
  Button,
  Card,
  EmptyState,
  Select,
  Spinner,
  Table,
  useToast,
  type Column,
} from '@/components/ui';
import { useFaturas } from '@/hooks/useFaturas';
import { faturaStatus } from '@/lib/status';
import { formatBRL, formatDate, formatMonth } from '@/lib/format';
import type { Fatura } from '@/lib/types';

export default function FaturasPage() {
  const router = useRouter();
  const toast = useToast();
  const [status, setStatus] = useState('');
  const { data, isLoading, error } = useFaturas({ status });

  const cols: Column<Fatura>[] = [
    { key: 'mes', header: 'Mês', render: (f) => <strong>{formatMonth(f.mesRef)}</strong> },
    { key: 'venc', header: 'Vencimento', render: (f) => formatDate(f.vencimento) },
    { key: 'total', header: 'Total', numeric: true, render: (f) => formatBRL(f.totalCents) },
    {
      key: 'status',
      header: 'Status',
      render: (f) => {
        const s = faturaStatus[f.status];
        return <Badge tone={s.tone}>{s.label}</Badge>;
      },
    },
  ];

  return (
    <div className="mu-stack">
      <div className="mu-row mu-row--between">
        <div>
          <p className="eyebrow">Faturamento</p>
          <h1 className="mu-page-title">Faturas</h1>
        </div>
        <Button variant="secondary" onClick={() => toast.success('Exportação gerada.')}>
          Exportar
        </Button>
      </div>

      <Card>
        <div style={{ marginBottom: 16 }}>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} style={{ maxWidth: 220 }}>
            <option value="">Todos os status</option>
            <option value="aberta">Abertas</option>
            <option value="paga">Pagas</option>
            <option value="atrasada">Atrasadas</option>
          </Select>
        </div>

        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Banner tone="warn">Não foi possível carregar as faturas.</Banner>
        ) : !data || data.faturas.length === 0 ? (
          <EmptyState title="Nenhuma fatura" />
        ) : (
          <Table
            columns={cols}
            rows={data.faturas}
            rowKey={(f) => f.id}
            onRowClick={(f) => router.push(`/faturas/${f.id}`)}
          />
        )}
      </Card>
    </div>
  );
}
