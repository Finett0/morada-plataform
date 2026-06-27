'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Field, Input } from '@/components/ui';
import { useRecuperarSenha } from '@/hooks/useAuth';
import { recuperarSchema } from '@/lib/validation';
import { fieldErrors } from '@/lib/form';

export default function RecuperarSenhaPage() {
  const recuperar = useRecuperarSenha();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = recuperarSchema.safeParse({ email });
    setErrors(fieldErrors(parsed));
    if (parsed.success) recuperar.mutate(email);
  };

  return (
    <div>
      <p className="eyebrow">Acesso</p>
      <h1 style={{ fontSize: 24 }}>Recuperar senha</h1>
      <p className="mu-muted" style={{ fontSize: 14, marginBottom: 16 }}>
        Informe seu e-mail e enviaremos um link de redefinição.
      </p>

      {recuperar.isSuccess ? (
        <div className="mu-banner mu-banner--zero" style={{ marginBottom: 16 }}>
          Se o e-mail existir, enviamos um link de redefinição.
        </div>
      ) : null}

      <form onSubmit={submit} noValidate>
        <Field label="E-mail" error={errors.email} htmlFor="email">
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Button type="submit" block disabled={recuperar.isPending}>
          {recuperar.isPending ? 'Enviando…' : 'Enviar link'}
        </Button>
      </form>

      <p style={{ marginTop: 16, fontSize: 14 }}>
        <Link href="/login">Voltar para o login</Link>
      </p>
    </div>
  );
}
