'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Badge,
  Banner,
  Button,
  Card,
  EmptyState,
  Input,
  Select,
  Spinner,
  Table,
  type Column,
} from '@/components/ui';
import { useColaboradores } from '@/hooks/useColaboradores';
import { usePermissions } from '@/hooks/useSession';
import { colaboradorStatus } from '@/lib/status';
import { formatBRL, formatCNPJ } from '@/lib/format';
import type { ColaboradorPJ } from '@/lib/types';

export default function ColaboradoresPage() {
  const router = useRouter();
  const { can } = usePermissions();
  const [busca, setBusca] = useState('');
  const [status, setStatus] = useState('');
  const { data, isLoading, error } = useColaboradores({ busca, status });

  const cols: Column<ColaboradorPJ>[] = [
    { key: 'nome', header: 'Nome', render: (c) => <strong>{c.nome}</strong> },
    { key: 'cnpj', header: 'CNPJ', render: (c) => formatCNPJ(c.cnpj) },
    {
      key: 'status',
      header: 'Status',
      render: (c) => {
        const s = colaboradorStatus[c.status];
        return (
          <span className="mu-row" style={{ gap: 6 }}>
            <Badge tone={s.tone}>{s.label}</Badge>
            {c.thinFile ? <Badge tone="warning">thin file</Badge> : null}
          </span>
        );
      },
    },
    { key: 'valor', header: 'Nota/mês', numeric: true, render: (c) => formatBRL(c.valorNotaCents) },
  ];

  return (
    <div className="mu-stack">
      <div className="mu-row mu-row--between">
        <div>
          <p className="eyebrow">Colaboradores PJ</p>
          <h1 className="mu-page-title">Colaboradores</h1>
        </div>
        {can('colaborador:criar') ? (
          <Link href="/colaboradores/novo">
            <Button>Cadastrar colaborador</Button>
          </Link>
        ) : null}
      </div>

      <Card>
        <div className="mu-row" style={{ gap: 12, marginBottom: 16 }}>
          <Input
            placeholder="Buscar por nome ou CNPJ"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{ maxWidth: 280 }}
          />
          <Select value={status} onChange={(e) => setStatus(e.target.value)} style={{ maxWidth: 200 }}>
            <option value="">Todos os status</option>
            <option value="em_originacao">Em originação</option>
            <option value="ativo">Ativo</option>
            <option value="em_desligamento">Em desligamento</option>
            <option value="desligado">Desligado</option>
          </Select>
        </div>

        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Banner tone="warn">Não foi possível carregar os colaboradores.</Banner>
        ) : !data || data.colaboradores.length === 0 ? (
          <EmptyState
            title="Nenhum colaborador"
            description="Cadastre o primeiro colaborador para iniciar a originação."
            action={
              can('colaborador:criar') ? (
                <Link href="/colaboradores/novo">
                  <Button>Cadastrar colaborador</Button>
                </Link>
              ) : undefined
            }
          />
        ) : (
          <Table
            columns={cols}
            rows={data.colaboradores}
            rowKey={(c) => c.id}
            onRowClick={(c) => router.push(`/colaboradores/${c.id}`)}
          />
        )}
      </Card>
    </div>
  );
}
