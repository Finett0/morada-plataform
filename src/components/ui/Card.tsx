import type { ReactNode } from 'react';

export function Card({
  children,
  large = false,
  className = '',
}: {
  children: ReactNode;
  large?: boolean;
  className?: string;
}) {
  return <div className={`mu-card ${large ? 'mu-card--pad-lg' : ''} ${className}`}>{children}</div>;
}
