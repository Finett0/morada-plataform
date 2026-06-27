'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePermissions } from '@/hooks/useSession';
import type { Permission } from '@/lib/rbac';

/**
 * Sidebar de navegação (SPEC §3.1). Itens são filtrados pela permissão do
 * papel atual (RBAC — issue 02).
 */
const NAV: { href: string; label: string; perm?: Permission }[] = [
  { href: '/', label: 'Dashboard', perm: 'dashboard:ver' },
  { href: '/colaboradores', label: 'Colaboradores', perm: 'colaborador:ver' },
  { href: '/contratos', label: 'Contratos', perm: 'contrato:ver' },
  { href: '/faturas', label: 'Faturas', perm: 'fatura:ver' },
  { href: '/relatorios', label: 'Relatórios', perm: 'relatorio:ver' },
  { href: '/documentos', label: 'Documentos', perm: 'documento:ver' },
  { href: '/configuracoes', label: 'Configurações', perm: 'config:editar' },
  { href: '/ajuda', label: 'Ajuda' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { can } = usePermissions();
  const items = NAV.filter((item) => !item.perm || can(item.perm));

  return (
    <aside
      style={{
        width: 240,
        background: 'var(--pine)',
        color: 'var(--porcelain)',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <div style={{ fontFamily: 'var(--serif)', fontSize: 24, padding: '0 8px 16px' }}>Morada</div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((item) => {
          const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                color: active ? 'var(--porcelain)' : 'var(--cream-muted)',
                background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                padding: '10px 12px',
                borderRadius: 'var(--radius-chip)',
                fontSize: 14,
                textDecoration: 'none',
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
