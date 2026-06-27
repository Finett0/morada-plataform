import { describe, it, expect } from 'vitest';
import { listFaturas, getFatura, pagarFatura } from './faturas';
import { CURRENT_EMPRESA_ID } from './db';

const session = {
  empresaId: CURRENT_EMPRESA_ID,
  user: { nome: 'Bruno Lima', papel: 'financeiro' as const },
};

describe('faturas', () => {
  it('o total da fatura bate com a soma das notas das linhas', () => {
    const f = getFatura(CURRENT_EMPRESA_ID, 'fat_1');
    const soma = f.linhas.reduce((s, l) => s + l.aluguelCents + l.liquidoCents + l.taxaCents, 0);
    expect(f.totalCents).toBe(soma);
  });

  it('pagar transita para paga', () => {
    const f = pagarFatura(session, 'fat_1');
    expect(f.status).toBe('paga');
  });

  it('pagar é idempotente: relança se já paga', () => {
    expect(() => pagarFatura(session, 'fat_1')).toThrow();
  });

  it('filtra por status', () => {
    const pagas = listFaturas(CURRENT_EMPRESA_ID, { status: 'paga' });
    expect(pagas.every((f) => f.status === 'paga')).toBe(true);
  });
});
