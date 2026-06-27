import { describe, it, expect } from 'vitest';
import { can, assertCan, ForbiddenError } from './rbac';

describe('RBAC', () => {
  it('admin pode tudo', () => {
    expect(can('admin', 'fatura:pagar')).toBe(true);
    expect(can('admin', 'colaborador:desligar')).toBe(true);
    expect(can('admin', 'usuario:gerenciar')).toBe(true);
  });

  it('financeiro paga fatura mas não gerencia colaborador', () => {
    expect(can('financeiro', 'fatura:pagar')).toBe(true);
    expect(can('financeiro', 'colaborador:criar')).toBe(false);
    expect(can('financeiro', 'colaborador:desligar')).toBe(false);
  });

  it('rh gerencia colaborador mas não paga fatura', () => {
    expect(can('rh', 'colaborador:criar')).toBe(true);
    expect(can('rh', 'colaborador:desligar')).toBe(true);
    expect(can('rh', 'fatura:pagar')).toBe(false);
  });

  it('visualizador é somente leitura', () => {
    expect(can('visualizador', 'dashboard:ver')).toBe(true);
    expect(can('visualizador', 'relatorio:ver')).toBe(true);
    expect(can('visualizador', 'colaborador:criar')).toBe(false);
    expect(can('visualizador', 'fatura:pagar')).toBe(false);
  });

  it('assertCan lança ForbiddenError quando negado', () => {
    expect(() => assertCan('visualizador', 'fatura:pagar')).toThrow(ForbiddenError);
    expect(() => assertCan('admin', 'fatura:pagar')).not.toThrow();
  });
});
