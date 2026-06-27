import type { ReactNode } from 'react';

export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="mu-tooltip" tabIndex={0}>
      {children}
      <span className="mu-tooltip__bubble" role="tooltip">
        {label}
      </span>
    </span>
  );
}
