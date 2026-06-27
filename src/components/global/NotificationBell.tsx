'use client';

/**
 * Sino de notificações (placeholder do scaffold). O sistema completo
 * (lista, contador de não-lidas, marcar como lida) é a issue 22.
 */
export function NotificationBell() {
  return (
    <span aria-label="Notificações" title="Notificações" style={{ cursor: 'pointer' }}>
      🔔
    </span>
  );
}
