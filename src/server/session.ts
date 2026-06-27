/**
 * Sessão do servidor. No scaffold, resolve o usuário atual por um cookie
 * (definido no login — issue 03), com fallback no admin do seed. Mantém o
 * contrato que a autenticação real vai preencher: { user, empresaId }.
 */
import { cookies } from 'next/headers';
import { db, CURRENT_EMPRESA_ID } from './db';
import type { Usuario } from '@/lib/types';

export const SESSION_COOKIE = 'morada_uid';

export interface Session {
  user: Usuario;
  empresaId: string;
}

/** Usuário autenticado atual (ou null se não houver sessão válida). */
export function getSession(): Session | null {
  const uid = cookies().get(SESSION_COOKIE)?.value;
  const user = db.usuarios.find((u) => u.id === uid && u.status === 'ativo');
  if (!user) return null;
  return { user, empresaId: user.empresaId };
}

/** Sessão garantida — lança se não autenticado (mapear para 401). */
export class UnauthenticatedError extends Error {
  constructor() {
    super('Não autenticado');
    this.name = 'UnauthenticatedError';
  }
}

export function requireSession(): Session {
  const session = getSession();
  if (!session) throw new UnauthenticatedError();
  return session;
}

/** Usuário admin do seed — atalho de desenvolvimento. */
export function seededAdmin(): Usuario {
  return db.usuarios.find((u) => u.id === 'usr_1' && u.empresaId === CURRENT_EMPRESA_ID)!;
}
