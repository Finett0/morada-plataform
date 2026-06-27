/**
 * RBAC — controle de acesso por papel (SPEC §1.2, issue 02).
 * Fonte única de verdade das permissões, usada na UI (esconder/desabilitar),
 * nas rotas e nas actions (defesa em profundidade — architecture.md §7).
 */
import type { Papel } from './types';

export type Permission =
  | 'dashboard:ver'
  | 'colaborador:ver'
  | 'colaborador:criar'
  | 'colaborador:editar'
  | 'colaborador:desligar'
  | 'contrato:ver'
  | 'fatura:ver'
  | 'fatura:pagar'
  | 'relatorio:ver'
  | 'documento:ver'
  | 'usuario:gerenciar'
  | 'convenio:assinar'
  | 'config:editar';

const ALL: Permission[] = [
  'dashboard:ver',
  'colaborador:ver',
  'colaborador:criar',
  'colaborador:editar',
  'colaborador:desligar',
  'contrato:ver',
  'fatura:ver',
  'fatura:pagar',
  'relatorio:ver',
  'documento:ver',
  'usuario:gerenciar',
  'convenio:assinar',
  'config:editar',
];

export const ROLE_PERMISSIONS: Record<Papel, Permission[]> = {
  admin: ALL,
  financeiro: ['dashboard:ver', 'contrato:ver', 'fatura:ver', 'fatura:pagar', 'relatorio:ver', 'documento:ver'],
  rh: [
    'dashboard:ver',
    'colaborador:ver',
    'colaborador:criar',
    'colaborador:editar',
    'colaborador:desligar',
    'contrato:ver',
    'documento:ver',
  ],
  visualizador: ['dashboard:ver', 'colaborador:ver', 'contrato:ver', 'relatorio:ver', 'documento:ver'],
};

/** true se o papel tem a permissão. */
export function can(papel: Papel, permission: Permission): boolean {
  return ROLE_PERMISSIONS[papel].includes(permission);
}

/** Erro de domínio para autorização negada (mapear para 403 nas rotas). */
export class ForbiddenError extends Error {
  constructor(permission: Permission) {
    super(`Sem permissão: ${permission}`);
    this.name = 'ForbiddenError';
  }
}

/** Garante a permissão ou lança ForbiddenError (uso em actions). */
export function assertCan(papel: Papel, permission: Permission): void {
  if (!can(papel, permission)) throw new ForbiddenError(permission);
}
