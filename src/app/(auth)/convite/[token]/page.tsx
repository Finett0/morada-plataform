'use client';

import { useState } from 'react';
import { Button, Field, Input } from '@/components/ui';
import { useAceitarConvite } from '@/hooks/useAuth';
import { conviteSchema } from '@/lib/validation';
import { fieldErrors, errorMessage } from '@/lib/form';

export default function ConvitePage({ params }: { params: { token: string } }) {
  const aceitar = useAceitarConvite();
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = conviteSchema.safeParse({ token: params.token, password });
    setErrors(fieldErrors(parsed));
    if (parsed.success) aceitar.mutate(parsed.data);
  };

  return (
    <div>
      <p className="eyebrow">Acesso</p>
      <h1 style={{ fontSize: 24 }}>Aceitar convite</h1>
      <p className="mu-muted" style={{ fontSize: 14, marginBottom: 16 }}>
        Defina uma senha para acessar o painel da empresa.
      </p>

      {aceitar.isError ? (
        <div className="mu-banner mu-banner--warn" role="alert" style={{ marginBottom: 16 }}>
          {errorMessage(aceitar.error, 'Convite inválido ou expirado')}
        </div>
      ) : null}

      <form onSubmit={submit} noValidate>
        <Field label="Senha" error={errors.password} hint="Mínimo 8 caracteres" htmlFor="password">
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <Button type="submit" block disabled={aceitar.isPending}>
          {aceitar.isPending ? 'Entrando…' : 'Aceitar e entrar'}
        </Button>
      </form>
    </div>
  );
}
