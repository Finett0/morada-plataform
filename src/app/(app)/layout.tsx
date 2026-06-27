import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { AppShell } from '@/components/global/AppShell';
import { getSession } from '@/server/session';
import { db } from '@/server/db';

/**
 * Layout do grupo autenticado. Guarda de acesso (SPEC §4.1):
 * - sem sessão -> /login;
 * - benefício não ativado -> /onboarding.
 */
export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  const session = getSession();
  if (!session) redirect('/login');

  const empresa = db.empresas.find((e) => e.id === session.empresaId);
  if (!empresa?.beneficioAtivo) redirect('/onboarding');

  return <AppShell>{children}</AppShell>;
}
