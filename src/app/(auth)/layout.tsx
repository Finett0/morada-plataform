import type { ReactNode } from 'react';

/**
 * Layout das páginas públicas (login, signup, recuperação, convite):
 * card centrado sobre o fundo da marca, sem o app shell.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        padding: 24,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--shadow-card)',
          padding: 32,
        }}
      >
        <div style={{ fontFamily: 'var(--serif)', fontSize: 28, marginBottom: 16 }}>Morada</div>
        {children}
      </div>
    </div>
  );
}
