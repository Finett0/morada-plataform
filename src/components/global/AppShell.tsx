import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

/**
 * Layout-shell das rotas autenticadas (SPEC §2.0 / §3.1):
 * sidebar fixa + topbar + área de conteúdo.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        <main style={{ flex: 1, padding: 32 }}>{children}</main>
      </div>
    </div>
  );
}
