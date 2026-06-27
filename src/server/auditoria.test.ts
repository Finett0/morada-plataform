import { describe, it, expect } from 'vitest';
import { listEventos } from './auditoria';
import { recordAudit } from './audit';
import { CURRENT_EMPRESA_ID } from './db';

describe('auditoria', () => {
  it('lista eventos do seed', () => {
    expect(listEventos(CURRENT_EMPRESA_ID).length).toBeGreaterThan(0);
  });

  it('é append-only: novo registro aparece no topo', () => {
    const antes = listEventos(CURRENT_EMPRESA_ID).length;
    recordAudit({
      empresaId: CURRENT_EMPRESA_ID,
      usuario: 'Teste',
      papel: 'admin',
      acao: 'teste:acao',
      entidade: 'Teste 1',
    });
    const depois = listEventos(CURRENT_EMPRESA_ID);
    expect(depois.length).toBe(antes + 1);
    expect(depois[0].acao).toBe('teste:acao');
  });
});
