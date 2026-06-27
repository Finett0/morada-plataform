'use client';

import { useSession } from '@/hooks/useSession';
import { useLogout } from '@/hooks/useAuth';
import { Button } from '@/components/ui';
import { NotificationBell } from './NotificationBell';

/**
 * Topbar (SPEC §3.1): nome da empresa, sino de notificações e menu de conta.
 */
export function Topbar() {
  const { data } = useSession();
  const logout = useLogout();

  return (
    <header
      style={{
        height: 60,
        borderBottom: '1px solid var(--line)',
        background: 'var(--surface)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}
    >
      <span style={{ fontWeight: 600 }}>{data?.empresa?.razaoSocial ?? 'Morada'}</span>
      <div className="mu-row" style={{ gap: 16 }}>
        <NotificationBell />
        <span className="mu-muted" style={{ fontSize: 14 }}>
          {data?.user?.nome}
        </span>
        <Button variant="ghost" onClick={() => logout.mutate()} disabled={logout.isPending}>
          Sair
        </Button>
      </div>
    </header>
  );
}
