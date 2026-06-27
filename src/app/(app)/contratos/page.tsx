'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Badge,
  Banner,
  Card,
  EmptyState,
  Select,
  Spinner,
  Table,
  type Column,
} from '@/components/ui';
import { useContratos } from '@/hooks/useContratos';
import { contratoStatus } from '@/lib/status';
import { formatBRL, formatDate } from '@/lib/format';
import type { Contrato } from '@/lib/types';

export default function ContratosPage() {
  const router = useRouter();
  const [status, setStatus] = useState('');
  const { data, isLoading, error } = useContratos({ status });

  const cols: Column<Contrato>[] = [
    { key: 'colab', header: 'Colaborador', render: (c) => <strong>{c.colaboradorNome}</strong> },
    { key: 'imovel', header: 'Imóvel', render: (c) => c.imovel },
    { key: 'aluguel', header: 'Aluguel', numeric: true, render: (c) => formatBRL(c.aluguelCents) },
    {
      key: 'status',
      header: 'Status',
      render: (c) => {
        const s = contratoStatus[c.status];
        return <Badge tone={s.tone}>{s.label}</Badge>;
      },
    },
    { key: 'vig', header: 'Início', render: (c) => formatDate(c.vigenciaInicio) },
  ];

  return (
    <div className="mu-stack">
      <div>
        <p className="eyebrow">Garantias</p>
        <h1 className="mu-page-title">Contratos</h1>
      </div>

      <Card>
        <div style={{ marginBottom: 16 }}>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} style={{ maxWidth: 220 }}>
            <option value="">Todos os status</option>
            <option value="em_originacao">Em originação</option>
            <option value="ativo">Ativos</option>
            <option value="encerrado">Encerrados</option>
          </Select>
        </div>

        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Banner tone="warn">Não foi possível carregar os contratos.</Banner>
        ) : !data || data.contratos.length === 0 ? (
          <EmptyState title="Nenhum contrato" description="Os contratos aparecem conforme a originação avança." />
        ) : (
          <Table
            columns={cols}
            rows={data.contratos}
            rowKey={(c) => c.id}
            onRowClick={(c) => router.push(`/contratos/${c.id}`)}
          />
        )}
      </Card>
    </div>
  );
}
