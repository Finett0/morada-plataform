/**
 * Trilha de auditoria (issue 23). Registro append-only de ações sensíveis,
 * chamado pelas actions (architecture.md §7). Aqui grava no store em memória;
 * em produção, grava na tabela EventoAuditoria.
 */
import { db } from './db';
import type { EventoAuditoria, Papel } from '@/lib/types';

export function recordAudit(input: {
  empresaId: string;
  usuario: string;
  papel: Papel;
  acao: string;
  entidade: string;
  contexto?: string;
}): EventoAuditoria {
  const evento: EventoAuditoria = {
    id: `evt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    ...input,
  };
  db.eventos.push(evento);
  return evento;
}
