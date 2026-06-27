import type { ReactNode } from 'react';

export function KpiCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <div className="mu-kpi">
      <div className="mu-kpi__label">{label}</div>
      <div className="mu-kpi__value">{value}</div>
      {hint ? <div className="mu-kpi__hint">{hint}</div> : null}
    </div>
  );
}
