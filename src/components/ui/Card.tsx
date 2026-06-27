import type { CSSProperties, ReactNode } from 'react';

export function Card({
  children,
  large = false,
  className = '',
  style,
}: {
  children: ReactNode;
  large?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`mu-card ${large ? 'mu-card--pad-lg' : ''} ${className}`} style={style}>
      {children}
    </div>
  );
}
