/**
 * Documentos (issue 18): repositório de documentos da empresa, tenant-scoped.
 */
import { db } from './db';
import type { Documento } from '@/lib/types';

export function listDocumentos(empresaId: string): Documento[] {
  return db.documentos
    .filter((d) => d.empresaId === empresaId)
    .sort((a, b) => +new Date(b.data) - +new Date(a.data));
}
