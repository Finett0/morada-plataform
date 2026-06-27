/**
 * Notificações (issue 22): lista in-app e marcação de leitura. Tenant-scoped.
 * O envio de e-mail transacional é responsabilidade da camada de integração
 * (integration-writer); aqui ficam as notificações in-app.
 */
import { db } from './db';
import type { Notificacao } from '@/lib/types';

export function listNotificacoes(empresaId: string): Notificacao[] {
  return db.notificacoes
    .filter((n) => n.empresaId === empresaId)
    .sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp));
}

export function contarNaoLidas(empresaId: string): number {
  return db.notificacoes.filter((n) => n.empresaId === empresaId && !n.lida).length;
}

export function marcarLidas(empresaId: string, id?: string): void {
  for (const n of db.notificacoes) {
    if (n.empresaId === empresaId && (id ? n.id === id : true)) n.lida = true;
  }
}
