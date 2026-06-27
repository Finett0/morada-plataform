import Link from 'next/link';
import { Fragment } from 'react';

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="mu-breadcrumb" aria-label="breadcrumb">
      {items.map((item, i) => (
        <Fragment key={i}>
          {i > 0 ? <span aria-hidden>/</span> : null}
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
        </Fragment>
      ))}
    </nav>
  );
}
