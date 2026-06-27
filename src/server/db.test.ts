import { describe, it, expect } from 'vitest';
import { db, ETAPAS_ORIGINACAO } from './db';

describe('seed do store', () => {
  it('tem uma empresa ativa com convênio assinado', () => {
    expect(db.empresas).toHaveLength(1);
    expect(db.empresas[0].beneficioAtivo).toBe(true);
    expect(db.empresas[0].convenioAssinado).toBe(true);
  });

  it('cobre os 4 papéis e um convite pendente', () => {
    const papeis = db.usuarios.map((u) => u.papel);
    expect(papeis).toContain('admin');
    expect(papeis).toContain('financeiro');
    expect(papeis).toContain('rh');
    expect(papeis).toContain('visualizador');
    expect(db.usuarios.some((u) => u.status === 'pendente')).toBe(true);
  });

  it('a originação tem 8 passos', () => {
    expect(ETAPAS_ORIGINACAO).toHaveLength(8);
    expect(db.colaboradores[0].etapas).toHaveLength(8);
  });

  it('o split fecha: aluguel + líquido + taxa = nota; fundo = 30% da taxa', () => {
    const c = db.contratos.find((x) => x.id === 'ct_1')!;
    expect(c.aluguelCents + c.liquidoCents + c.taxaCents).toBe(1_500_000);
    expect(c.fundoCents).toBe(Math.round(c.taxaCents * 0.3));
  });
});
