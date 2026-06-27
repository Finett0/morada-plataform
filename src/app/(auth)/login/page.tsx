'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Field, Input } from '@/components/ui';
import { useLogin } from '@/hooks/useAuth';
import { loginSchema } from '@/lib/validation';
import { fieldErrors, errorMessage } from '@/lib/form';

export default function LoginPage() {
  const login = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = loginSchema.safeParse({ email, password });
    const errs = fieldErrors(parsed);
    setErrors(errs);
    if (parsed.success) login.mutate(parsed.data);
  };

  return (
    <div>
      <p className="eyebrow">Acesso</p>
      <h1 style={{ fontSize: 24 }}>Entrar</h1>

      {login.isError ? (
        <div className="mu-banner mu-banner--warn" role="alert" style={{ marginBottom: 16 }}>
          {errorMessage(login.error, 'Credenciais inválidas')}
        </div>
      ) : null}

      <form onSubmit={submit} noValidate>
        <Field label="E-mail" error={errors.email} htmlFor="email">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </Field>
        <Field label="Senha" error={errors.password} htmlFor="password">
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </Field>
        <Button type="submit" block disabled={login.isPending}>
          {login.isPending ? 'Entrando…' : 'Entrar'}
        </Button>
      </form>

      <div className="mu-row mu-row--between" style={{ marginTop: 16, fontSize: 14 }}>
        <Link href="/recuperar-senha">Esqueci minha senha</Link>
        <Link href="/signup">Criar conta da empresa</Link>
      </div>
    </div>
  );
}
