/**
 * Lógica de autenticação (issues 03-06). No scaffold a senha é mock: a sessão
 * é resolvida por e-mail contra o store. A troca para verificação real de
 * hash + hashing de senha acontece junto da migração para Prisma.
 */
import { db } from './db';
import { recordAudit } from './audit';
import { DomainError, NotFoundError, ValidationError } from './http';
import type { Empresa, Usuario } from '@/lib/types';

export function authenticate(email: string, password: string): Usuario {
  const key = email.toLowerCase();
  const user = db.usuarios.find((u) => u.email.toLowerCase() === key);
  if (!user || user.status !== 'ativo' || db.credenciais[key] !== password) {
    throw new ValidationError('Credenciais inválidas');
  }
  return user;
}

export function createCompanyWithAdmin(input: {
  razaoSocial: string;
  cnpj: string;
  nome: string;
  email: string;
  password: string;
}): { empresa: Empresa; admin: Usuario } {
  if (db.empresas.some((e) => e.cnpj === input.cnpj)) {
    throw new DomainError('Já existe uma empresa com este CNPJ');
  }
  if (db.usuarios.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
    throw new DomainError('Já existe um usuário com este e-mail');
  }

  const empresa: Empresa = {
    id: `emp_${Date.now()}`,
    razaoSocial: input.razaoSocial,
    cnpj: input.cnpj,
    beneficioAtivo: false,
    convenioAssinado: false,
    createdAt: new Date().toISOString(),
  };
  const admin: Usuario = {
    id: `usr_${Date.now()}`,
    empresaId: empresa.id,
    nome: input.nome,
    email: input.email,
    papel: 'admin',
    status: 'ativo',
    createdAt: new Date().toISOString(),
  };
  db.empresas.push(empresa);
  db.usuarios.push(admin);
  db.credenciais[input.email.toLowerCase()] = input.password;
  recordAudit({
    empresaId: empresa.id,
    usuario: admin.nome,
    papel: 'admin',
    acao: 'empresa:criar',
    entidade: `Empresa ${empresa.id}`,
  });
  return { empresa, admin };
}

/** Aceita um convite (token = id do usuário pendente, no scaffold). */
export function acceptInvite(token: string, password: string): Usuario {
  const user = db.usuarios.find((u) => u.id === token);
  if (!user) throw new NotFoundError('Convite');
  if (user.status === 'ativo') throw new DomainError('Convite já utilizado');
  user.status = 'ativo';
  db.credenciais[user.email.toLowerCase()] = password;
  recordAudit({
    empresaId: user.empresaId,
    usuario: user.nome,
    papel: user.papel,
    acao: 'usuario:aceitar-convite',
    entidade: `Usuário ${user.id}`,
  });
  return user;
}
