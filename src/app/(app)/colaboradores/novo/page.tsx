'use client';

import { useState } from 'react';
import { Banner, Breadcrumb, Button, Card, Field, Input, Select, Textarea } from '@/components/ui';
import { useCriarColaborador } from '@/hooks/useColaboradores';
import { colaboradorSchema } from '@/lib/validation';
import { fieldErrors, errorMessage } from '@/lib/form';

export default function NovoColaboradorPage() {
  const criar = useCriarColaborador();
  const [form, setForm] = useState({ nome: '', cnpj: '', email: '', valor: '', observacoes: '' });
  const [modo, setModo] = useState<'convite' | 'dados'>('convite');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const valorNotaCents = Math.round(parseFloat(form.valor.replace(',', '.')) * 100) || 0;
    const parsed = colaboradorSchema.safeParse({
      nome: form.nome,
      cnpj: form.cnpj,
      email: form.email,
      valorNotaCents,
      observacoes: form.observacoes || undefined,
      modo,
    });
    setErrors(fieldErrors(parsed));
    if (parsed.success) criar.mutate(parsed.data);
  };

  return (
    <div style={{ maxWidth: 640 }}>
      <Breadcrumb items={[{ label: 'Colaboradores', href: '/colaboradores' }, { label: 'Novo' }]} />
      <h1 className="mu-page-title">Cadastrar colaborador</h1>

      <Banner tone="warn">
        A subscrição e o KYC da imobiliária ficam do lado da Morada — a originação leva alguns dias.
      </Banner>

      {criar.isError ? (
        <Banner tone="warn">{errorMessage(criar.error)}</Banner>
      ) : null}

      <Card large style={{ marginTop: 16 }}>
        <form onSubmit={submit} noValidate>
          <Field label="Modo">
            <Select value={modo} onChange={(e) => setModo(e.target.value as 'convite' | 'dados')}>
              <option value="convite">Convidar por e-mail</option>
              <option value="dados">Preencher dados</option>
            </Select>
          </Field>
          <Field label="Nome" error={errors.nome} htmlFor="nome">
            <Input id="nome" value={form.nome} onChange={set('nome')} />
          </Field>
          <Field label="CNPJ" error={errors.cnpj} htmlFor="cnpj">
            <Input id="cnpj" value={form.cnpj} onChange={set('cnpj')} placeholder="00.000.000/0000-00" />
          </Field>
          <Field label="E-mail" error={errors.email} htmlFor="email">
            <Input id="email" type="email" value={form.email} onChange={set('email')} />
          </Field>
          <Field label="Valor da nota mensal (R$)" error={errors.valorNotaCents} htmlFor="valor">
            <Input id="valor" inputMode="decimal" value={form.valor} onChange={set('valor')} placeholder="15000,00" />
          </Field>
          <Field label="Observações (opcional)" htmlFor="obs">
            <Textarea id="obs" rows={3} value={form.observacoes} onChange={set('observacoes')} />
          </Field>
          <Button type="submit" variant="accent" disabled={criar.isPending}>
            {criar.isPending ? 'Enviando…' : modo === 'convite' ? 'Enviar convite' : 'Cadastrar'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
