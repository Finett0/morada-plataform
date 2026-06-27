/**
 * Gestão de usuários (issue 20) e dados da empresa (issue 19). Tenant-scoped;
 * ações sensíveis auditadas. Regra: a empresa nunca pode ficar sem um admin ativo.
 */
import { db } from './db';
import { recordAudit } from './audit';
import { DomainError, NotFoundError } from './http';
import type { Empresa, Papel, Usuario } from '@/lib/types';

type Session = { empresaId: string; user: { nome: string; papel: Papel } };

export function listUsuarios(empresaId: string): Usuario[] {
  return db.usuarios
    .filter((u) => u.empresaId === empresaId)
    .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
}

function adminsAtivos(empresaId: string): Usuario[] {
  return db.usuarios.filter(
    (u) => u.empresaId === empresaId && u.papel === 'admin' && u.status === 'ativo',
  );
}

export function convidarUsuario(session: Session, input: { email: string; papel: Papel }): Usuario {
  if (db.usuarios.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
    throw new DomainError('Já existe um usuário com este e-mail');
  }
  const usuario: Usuario = {
    id: `usr_${Date.now()}`,
    empresaId: session.empresaId,
    nome: input.email.split('@')[0],
    email: input.email,
    papel: input.papel,
    status: 'pendente',
    createdAt: new Date().toISOString(),
  };
  db.usuarios.push(usuario);
  recordAudit({
    empresaId: session.empresaId,
    usuario: session.user.nome,
    papel: session.user.papel,
    acao: 'usuario:convidar',
    entidade: `Usuário ${usuario.id}`,
    contexto: `papel=${input.papel}`,
  });
  return usuario;
}

function getUsuario(empresaId: string, id: string): Usuario {
  const u = db.usuarios.find((x) => x.empresaId === empresaId && x.id === id);
  if (!u) throw new NotFoundError('Usuário');
  return u;
}

export function alterarPapel(session: Session, id: string, papel: Papel): Usuario {
  const usuario = getUsuario(session.empresaId, id);
  if (usuario.papel === 'admin' && papel !== 'admin' && adminsAtivos(session.empresaId).length <= 1) {
    throw new DomainError('Não é possível rebaixar o último admin');
  }
  usuario.papel = papel;
  recordAudit({
    empresaId: session.empresaId,
    usuario: session.user.nome,
    papel: session.user.papel,
    acao: 'usuario:alterar-papel',
    entidade: `Usuário ${usuario.id}`,
    contexto: `papel=${papel}`,
  });
  return usuario;
}

export function removerUsuario(session: Session, id: string): void {
  const usuario = getUsuario(session.empresaId, id);
  if (usuario.papel === 'admin' && usuario.status === 'ativo' && adminsAtivos(session.empresaId).length <= 1) {
    throw new DomainError('Não é possível remover o último admin');
  }
  db.usuarios = db.usuarios.filter((u) => u.id !== id);
  recordAudit({
    empresaId: session.empresaId,
    usuario: session.user.nome,
    papel: session.user.papel,
    acao: 'usuario:remover',
    entidade: `Usuário ${id}`,
  });
}

export function getEmpresa(empresaId: string): Empresa {
  const e = db.empresas.find((x) => x.id === empresaId);
  if (!e) throw new NotFoundError('Empresa');
  return e;
}

export function atualizarEmpresa(
  session: Session,
  input: { razaoSocial?: string; endereco?: string },
): Empresa {
  const empresa = getEmpresa(session.empresaId);
  if (input.razaoSocial) empresa.razaoSocial = input.razaoSocial;
  if (input.endereco !== undefined) empresa.endereco = input.endereco;
  recordAudit({
    empresaId: session.empresaId,
    usuario: session.user.nome,
    papel: session.user.papel,
    acao: 'empresa:editar',
    entidade: `Empresa ${empresa.id}`,
  });
  return empresa;
}
