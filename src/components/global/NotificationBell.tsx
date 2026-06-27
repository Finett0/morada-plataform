'use client';

import { useState } from 'react';
import { useNotificacoes, useMarcarLidas } from '@/hooks/useNotificacoes';
import { formatDate } from '@/lib/format';

/** Sino de notificações (issue 22): contador de não-lidas + dropdown + marcar lidas. */
export function NotificationBell() {
  const { data } = useNotificacoes();
  const marcar = useMarcarLidas();
  const [open, setOpen] = useState(false);
  const naoLidas = data?.naoLidas ?? 0;

  return (
    <div style={{ position: 'relative' }}>
      <button
        aria-label={`Notificações (${naoLidas} não lidas)`}
        onClick={() => setOpen((o) => !o)}
        className="mu-btn mu-btn--ghost"
        style={{ padding: 4, position: 'relative' }}
      >
        🔔
        {naoLidas > 0 ? (
          <span
            style={{
              position: 'absolute',
              top: -2,
              right: -2,
              background: 'var(--coral)',
              color: '#fff',
              borderRadius: '50%',
              fontSize: 10,
              minWidth: 16,
              height: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {naoLidas}
          </span>
        ) : null}
      </button>

      {open ? (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '120%',
            width: 320,
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-card)',
            boxShadow: 'var(--shadow-pop)',
            zIndex: 40,
            padding: 12,
          }}
        >
          <div className="mu-row mu-row--between" style={{ marginBottom: 8 }}>
            <strong style={{ fontSize: 14 }}>Notificações</strong>
            <button className="mu-btn mu-btn--ghost" style={{ fontSize: 12, padding: 2 }} onClick={() => marcar.mutate(undefined)}>
              Marcar todas como lidas
            </button>
          </div>
          {!data || data.notificacoes.length === 0 ? (
            <p className="mu-muted" style={{ fontSize: 13 }}>
              Sem notificações.
            </p>
          ) : (
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, maxHeight: 320, overflow: 'auto' }}>
              {data.notificacoes.map((n) => (
                <li
                  key={n.id}
                  onClick={() => marcar.mutate(n.id)}
                  style={{
                    padding: '8px 6px',
                    borderBottom: '1px solid var(--line)',
                    fontSize: 13,
                    cursor: 'pointer',
                    background: n.lida ? 'transparent' : 'var(--soft-green)',
                    borderRadius: 6,
                  }}
                >
                  <div>{n.titulo}</div>
                  <div className="mu-muted" style={{ fontSize: 11 }}>
                    {formatDate(n.timestamp)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
