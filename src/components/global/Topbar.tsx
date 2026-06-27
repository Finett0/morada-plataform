/**
 * Topbar (SPEC §3.1): nome da empresa, sino de notificações e menu de conta.
 * Placeholder estrutural do scaffold — notificações (issue 22) e menu de conta
 * com dados reais entram nas issues seguintes.
 */
export function Topbar() {
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
      <span style={{ fontWeight: 600 }}>Sua Empresa</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: 'var(--muted)' }}>
        <span aria-label="Notificações" title="Notificações">
          🔔
        </span>
        <span
          aria-label="Conta"
          title="Conta"
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'var(--soft-green)',
            display: 'inline-block',
          }}
        />
      </div>
    </header>
  );
}
