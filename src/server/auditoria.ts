/**
 * Trilha de auditoria — leitura (issue 23). O registro (append-only) vive em
 * src/server/audit.ts e é chamado pelas actions sensíveis. Aqui ficam as
 * consultas para visualização/conformidade. Tenant-scoped.
 */
import { db } from './db';
import type { EventoAuditoria } from '@/lib/types';

export function listEventos(empresaId: string, filtroEntidade?: string): EventoAuditoria[] {
  return db.eventos
    .filter((e) => e.empresaId === empresaId)
    .filter((e) => (filtroEntidade ? e.entidade.includes(filtroEntidade) : true))
    .sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp));
}
