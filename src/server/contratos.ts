/**
 * Contratos / garantias (issues 13-14): lista e detalhe. Tenant-scoped.
 */
import { db } from './db';
import { NotFoundError } from './http';
import type { Contrato } from '@/lib/types';

export function listContratos(empresaId: string, filtros: { status?: string } = {}): Contrato[] {
  return db.contratos
    .filter((c) => c.empresaId === empresaId)
    .filter((c) => (filtros.status ? c.status === filtros.status : true))
    .sort((a, b) => +new Date(b.vigenciaInicio) - +new Date(a.vigenciaInicio));
}

export function getContrato(empresaId: string, id: string): Contrato {
  const contrato = db.contratos.find((c) => c.empresaId === empresaId && c.id === id);
  if (!contrato) throw new NotFoundError('Contrato');
  return contrato;
}
