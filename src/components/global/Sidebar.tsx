'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Sidebar de navegação (SPEC §3.1).
 * Placeholder estrutural do scaffold — itens, badges de pendência e RBAC
 * (esconder por papel) entram na issue 01 (design system) e 02 (RBAC).
 */
const NAV = [
  { href: '/', label: 'Dashboard' },
  { href: '/colaboradores', label: 'Colaboradores' },
  { href: '/contratos', label: 'Contratos' },
  { href: '/faturas', label: 'Faturas' },
  { href: '/relatorios', label: 'Relatórios' },
  { href: '/documentos', label: 'Documentos' },
  { href: '/configuracoes', label: 'Configurações' },
  { href: '/ajuda', label: 'Ajuda' },
];

export function Sidebar() {
  const pathname = usePathname();

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
        {NAV.map((item) => {
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
