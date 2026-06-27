export function Spinner({ label = 'Carregando…' }: { label?: string }) {
  return (
    <span className="mu-row" role="status" aria-live="polite">
      <span className="mu-spinner" aria-hidden />
      <span className="mu-muted">{label}</span>
    </span>
  );
}
