import { describe, it, expect } from 'vitest';
import { loginSchema, signupSchema } from './validation';

describe('validation', () => {
  it('login exige e-mail válido e senha', () => {
    expect(loginSchema.safeParse({ email: 'x', password: '' }).success).toBe(false);
    expect(loginSchema.safeParse({ email: 'a@b.com', password: 'x' }).success).toBe(true);
  });

  it('signup normaliza CNPJ e exige aceite + senha forte', () => {
    const base = {
      razaoSocial: 'Acme',
      cnpj: '11.222.333/0001-81',
      nome: 'Ana',
      email: 'ana@acme.com',
      password: 'segredo123',
      aceiteTermos: true,
    };
    const ok = signupSchema.safeParse(base);
    expect(ok.success).toBe(true);
    if (ok.success) expect(ok.data.cnpj).toBe('11222333000181');

    expect(signupSchema.safeParse({ ...base, aceiteTermos: false }).success).toBe(false);
    expect(signupSchema.safeParse({ ...base, password: '123' }).success).toBe(false);
  });
});
