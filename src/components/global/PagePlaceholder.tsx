import type { ReactNode } from 'react';

/**
 * Placeholder de página usado no scaffold (issue 00).
 * Cada rota será substituída pela tela real nas issues seguintes.
 */
export function PagePlaceholder({
  eyebrow,
  title,
  spec,
  children,
}: {
  eyebrow?: string;
  title: string;
  spec?: string;
  children?: ReactNode;
}) {
  return (
    <section>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1>{title}</h1>
      {spec ? (
        <p style={{ color: 'var(--muted)' }}>
          Placeholder do scaffold · referência: <code>{spec}</code>
        </p>
      ) : null}
      {children}
    </section>
  );
}
