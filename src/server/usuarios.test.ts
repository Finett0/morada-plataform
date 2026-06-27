import { describe, it, expect } from 'vitest';
import { listUsuarios, convidarUsuario, removerUsuario, alterarPapel } from './usuarios';
import { CURRENT_EMPRESA_ID } from './db';

const session = {
  empresaId: CURRENT_EMPRESA_ID,
  user: { nome: 'Ana Martins', papel: 'admin' as const },
};

describe('usuarios', () => {
  it('convida com status pendente', () => {
    const u = convidarUsuario(session, { email: 'novo@acme.com', papel: 'financeiro' });
    expect(u.status).toBe('pendente');
    expect(u.papel).toBe('financeiro');
  });

  it('não convida e-mail duplicado', () => {
    expect(() => convidarUsuario(session, { email: 'novo@acme.com', papel: 'rh' })).toThrow();
  });

  it('bloqueia rebaixar o último admin', () => {
    const admins = listUsuarios(CURRENT_EMPRESA_ID).filter(
      (u) => u.papel === 'admin' && u.status === 'ativo',
    );
    // o seed tem apenas 1 admin ativo
    expect(admins).toHaveLength(1);
    expect(() => alterarPapel(session, admins[0].id, 'rh')).toThrow();
  });

  it('bloqueia remover o último admin', () => {
    const admin = listUsuarios(CURRENT_EMPRESA_ID).find(
      (u) => u.papel === 'admin' && u.status === 'ativo',
    )!;
    expect(() => removerUsuario(session, admin.id)).toThrow();
  });
});
