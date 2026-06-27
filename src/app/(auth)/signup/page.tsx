'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Field, Input } from '@/components/ui';
import { useSignup } from '@/hooks/useAuth';
import { signupSchema } from '@/lib/validation';
import { fieldErrors, errorMessage } from '@/lib/form';

export default function SignupPage() {
  const signup = useSignup();
  const [form, setForm] = useState({ razaoSocial: '', cnpj: '', nome: '', email: '', password: '' });
  const [aceiteTermos, setAceite] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signupSchema.safeParse({ ...form, aceiteTermos });
    setErrors(fieldErrors(parsed));
    if (parsed.success) signup.mutate(parsed.data);
  };

  return (
    <div>
      <p className="eyebrow">Acesso</p>
      <h1 style={{ fontSize: 24 }}>Criar conta da empresa</h1>
      <p className="mu-muted" style={{ fontSize: 14, marginBottom: 16 }}>
        Depois de criar a conta, você fará o onboarding e a assinatura do convênio.
      </p>

      {signup.isError ? (
        <div className="mu-banner mu-banner--warn" role="alert" style={{ marginBottom: 16 }}>
          {errorMessage(signup.error)}
        </div>
      ) : null}

      <form onSubmit={submit} noValidate>
        <Field label="Nome da empresa" error={errors.razaoSocial} htmlFor="razaoSocial">
          <Input id="razaoSocial" value={form.razaoSocial} onChange={set('razaoSocial')} />
        </Field>
        <Field label="CNPJ" error={errors.cnpj} htmlFor="cnpj">
          <Input id="cnpj" value={form.cnpj} onChange={set('cnpj')} placeholder="00.000.000/0000-00" />
        </Field>
        <Field label="Nome do responsável" error={errors.nome} htmlFor="nome">
          <Input id="nome" value={form.nome} onChange={set('nome')} />
        </Field>
        <Field label="E-mail corporativo" error={errors.email} htmlFor="email">
          <Input id="email" type="email" value={form.email} onChange={set('email')} />
        </Field>
        <Field label="Senha" error={errors.password} hint="Mínimo 8 caracteres" htmlFor="password">
          <Input id="password" type="password" value={form.password} onChange={set('password')} />
        </Field>
        <Field label="" error={errors.aceiteTermos}>
          <label className="mu-row" style={{ fontSize: 14 }}>
            <input type="checkbox" checked={aceiteTermos} onChange={(e) => setAceite(e.target.checked)} />
            Aceito os termos de uso e a política de privacidade.
          </label>
        </Field>
        <Button type="submit" variant="accent" block disabled={signup.isPending}>
          {signup.isPending ? 'Criando…' : 'Criar conta'}
        </Button>
      </form>

      <p style={{ marginTop: 16, fontSize: 14 }}>
        Já tem conta? <Link href="/login">Entrar</Link>
      </p>
    </div>
  );
}
