import type { ReactNode } from 'react';

export type TimelineStatus = 'done' | 'current' | 'pending' | 'blocked';

export interface TimelineItem {
  title: string;
  status: TimelineStatus;
  detail?: ReactNode;
}

const dotClass: Record<TimelineStatus, string> = {
  done: 'mu-timeline__dot--done',
  current: 'mu-timeline__dot--current',
  blocked: 'mu-timeline__dot--blocked',
  pending: '',
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ul className="mu-timeline">
      {items.map((item, i) => (
        <li key={i} className="mu-timeline__item">
          <span className={`mu-timeline__dot ${dotClass[item.status]}`} aria-hidden />
          <div>
            <div style={{ fontWeight: 500 }}>{item.title}</div>
            {item.detail ? <div className="mu-muted">{item.detail}</div> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
