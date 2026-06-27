import { describe, it, expect } from 'vitest';
import {
  createColaborador,
  calcularDesligamento,
  desligarColaborador,
  getColaborador,
  listColaboradores,
} from './colaboradores';
import { CURRENT_EMPRESA_ID } from './db';

const session = {
  empresaId: CURRENT_EMPRESA_ID,
  user: { nome: 'Ana Martins', papel: 'rh' as const },
};

describe('colaboradores', () => {
  it('cadastra com status em_originacao e 8 etapas', () => {
    const c = createColaborador(session, {
      nome: 'Teste PJ',
      cnpj: '99888777000166',
      email: 't@pj.com',
      valorNotaCents: 1_000_000,
      modo: 'dados',
    });
    expect(c.status).toBe('em_originacao');
    expect(c.etapas).toHaveLength(8);
    expect(c.etapas[1].status).toBe('current');
  });

  it('calcula a trava de rescisão como ~3 meses de aluguel', () => {
    const resumo = calcularDesligamento(CURRENT_EMPRESA_ID, 'col_1');
    expect(resumo.retencaoCents).toBe(resumo.aluguelCents * 3);
    expect(resumo.retencaoCents).toBe(1_500_000);
  });

  it('desligar marca em_desligamento', () => {
    const c = desligarColaborador(session, 'col_1', { dataDesligamento: '2026-07-01' });
    expect(c.status).toBe('em_desligamento');
  });

  it('não acha colaborador de outro id', () => {
    expect(() => getColaborador(CURRENT_EMPRESA_ID, 'inexistente')).toThrow();
  });

  it('filtra por status', () => {
    const ativos = listColaboradores(CURRENT_EMPRESA_ID, { status: 'ativo' });
    expect(ativos.every((c) => c.status === 'ativo')).toBe(true);
  });
});
