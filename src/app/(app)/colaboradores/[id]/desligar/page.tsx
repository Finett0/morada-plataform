'use client';

import { useState } from 'react';
import { Banner, Breadcrumb, Button, Card, Field, Input, Spinner } from '@/components/ui';
import { useColaborador, useDesligarColaborador } from '@/hooks/useColaboradores';
import { desligamentoSchema } from '@/lib/validation';
import { fieldErrors, errorMessage } from '@/lib/form';
import { formatBRL } from '@/lib/format';

export default function DesligarColaboradorPage({ params }: { params: { id: string } }) {
  const { data, isLoading } = useColaborador(params.id);
  const desligar = useDesligarColaborador(params.id);
  const [dataDesligamento, setDataDesligamento] = useState('');
  const [confirmado, setConfirmado] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (isLoading) return <Spinner />;
  if (!data) return <Banner tone="warn">Colaborador não encontrado.</Banner>;

  const { colaborador, desligamento } = data;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = desligamentoSchema.safeParse({ dataDesligamento, confirmado });
    setErrors(fieldErrors(parsed));
    if (parsed.success) desligar.mutate(parsed.data);
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <Breadcrumb
        items={[
          { label: 'Colaboradores', href: '/colaboradores' },
          { label: colaborador.nome, href: `/colaboradores/${colaborador.id}` },
          { label: 'Desligar' },
        ]}
      />
      <h1 className="mu-page-title">Desligar {colaborador.nome}</h1>

      <Card large>
        <p>
          No desligamento, a empresa <strong>retém a última fatura</strong> para cobrir até ~3 meses
          de aluguel até a desocupação.
        </p>
        <p className="mu-row mu-row--between" style={{ marginTop: 8 }}>
          <span className="mu-muted">Valor estimado retido</span>
          <strong>{formatBRL(desligamento.retencaoCents)}</strong>
        </p>

        <Banner tone="warn">A empresa nunca é fiadora. A garantia é prestada pela Morada.</Banner>

        {desligar.isError ? <Banner tone="warn">{errorMessage(desligar.error)}</Banner> : null}

        <form onSubmit={submit} noValidate style={{ marginTop: 16 }}>
          <Field label="Data do desligamento" error={errors.dataDesligamento} htmlFor="data">
            <Input
              id="data"
              type="date"
              value={dataDesligamento}
              onChange={(e) => setDataDesligamento(e.target.value)}
            />
          </Field>
          <Field label="" error={errors.confirmado}>
            <label className="mu-row" style={{ fontSize: 14 }}>
              <input
                type="checkbox"
                checked={confirmado}
                onChange={(e) => setConfirmado(e.target.checked)}
              />
              Confirmo o desligamento e o entendimento de que a empresa não é fiadora.
            </label>
          </Field>
          <Button type="submit" variant="danger" disabled={desligar.isPending}>
            {desligar.isPending ? 'Processando…' : 'Confirmar desligamento'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
