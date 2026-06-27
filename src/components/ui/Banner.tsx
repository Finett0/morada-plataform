import type { ReactNode } from 'react';
import { Tooltip } from './Tooltip';

export function Banner({
  tone = 'zero',
  children,
}: {
  tone?: 'zero' | 'warn';
  children: ReactNode;
}) {
  return <div className={`mu-banner mu-banner--${tone}`}>{children}</div>;
}

/**
 * Banner "custo zero" reutilizável (SPEC §1.4 / §3.1): mensagem persistente de
 * que o desembolso incremental da empresa é R$ 0.
 */
export function CostZeroBanner() {
  return (
    <Banner tone="zero">
      <strong>Custo incremental para a empresa: R$ 0.</strong>
      <Tooltip label="O desembolso da empresa não muda. A taxa da garantia sai do lado do colaborador PJ, não da empresa.">
        <span className="eyebrow">por quê?</span>
      </Tooltip>
    </Banner>
  );
}
