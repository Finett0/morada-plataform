'use client';

import {
  Badge,
  Banner,
  Button,
  Card,
  EmptyState,
  Spinner,
  Table,
  useToast,
  type Column,
} from '@/components/ui';
import { useDocumentos } from '@/hooks/useRelatorios';
import { formatDate } from '@/lib/format';
import type { Documento } from '@/lib/types';

export default function DocumentosPage() {
  const { data, isLoading, error } = useDocumentos();
  const toast = useToast();

  const cols: Column<Documento>[] = [
    { key: 'nome', header: 'Documento', render: (d) => <strong>{d.nome}</strong> },
    { key: 'tipo', header: 'Tipo', render: (d) => d.tipo },
    {
      key: 'status',
      header: 'Assinatura',
      render: (d) => (
        <Badge tone={d.status === 'assinado' ? 'success' : 'warning'}>
          {d.status === 'assinado' ? 'Assinado' : 'Pendente'}
        </Badge>
      ),
    },
    { key: 'data', header: 'Data', render: (d) => formatDate(d.data) },
    {
      key: 'acao',
      header: '',
      render: (d) => (
        <Button variant="ghost" onClick={() => toast.success(`Baixando ${d.nome}…`)}>
          Baixar
        </Button>
      ),
    },
  ];

  return (
    <div className="mu-stack">
      <div>
        <p className="eyebrow">Repositório</p>
        <h1 className="mu-page-title">Documentos</h1>
      </div>

      <Card>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Banner tone="warn">Não foi possível carregar os documentos.</Banner>
        ) : !data || data.documentos.length === 0 ? (
          <EmptyState title="Nenhum documento" />
        ) : (
          <Table columns={cols} rows={data.documentos} rowKey={(d) => d.id} />
        )}
      </Card>
    </div>
  );
}
