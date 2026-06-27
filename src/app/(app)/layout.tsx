import type { ReactNode } from 'react';
import { AppShell } from '@/components/global/AppShell';

/**
 * Layout do grupo autenticado. Envolve todas as telas internas no app shell.
 * A guarda de autenticação real (redirecionar para /login) entra na issue 03.
 */
export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
