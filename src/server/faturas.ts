/**
 * Faturas (issues 15-16): lista, detalhe e pagamento. Tenant-scoped.
 * O pagamento dispara o split na fonte (aluguel primeiro) — aqui simulado;
 * em produção, via integração com o PSP licenciado (integration-writer).
 */
import { db } from './db';
import { recordAudit } from './audit';
import { DomainError, NotFoundError } from './http';
import type { Fatura, Papel } from '@/lib/types';

export function listFaturas(empresaId: string, filtros: { status?: string } = {}): Fatura[] {
  return db.faturas
    .filter((f) => f.empresaId === empresaId)
    .filter((f) => (filtros.status ? f.status === filtros.status : true))
    .sort((a, b) => +new Date(b.mesRef) - +new Date(a.mesRef));
}

export function getFatura(empresaId: string, id: string): Fatura {
  const fatura = db.faturas.find((f) => f.empresaId === empresaId && f.id === id);
  if (!fatura) throw new NotFoundError('Fatura');
  return fatura;
}

export function pagarFatura(
  session: { empresaId: string; user: { nome: string; papel: Papel } },
  id: string,
): Fatura {
  const fatura = getFatura(session.empresaId, id);
  if (fatura.status === 'paga') throw new DomainError('Fatura já paga');

  // Em produção: chamada idempotente ao PSP; split na fonte (aluguel primeiro).
  fatura.status = 'paga';

  db.notificacoes.push({
    id: `ntf_${Date.now()}`,
    empresaId: session.empresaId,
    titulo: `Fatura paga — split executado na fonte.`,
    lida: false,
    timestamp: new Date().toISOString(),
  });

  recordAudit({
    empresaId: session.empresaId,
    usuario: session.user.nome,
    papel: session.user.papel,
    acao: 'fatura:pagar',
    entidade: `Fatura ${fatura.id}`,
    contexto: `totalCents=${fatura.totalCents}`,
  });

  return fatura;
}
