import { describe, it, expect } from 'vitest';
import { ApiError } from './client';

describe('ApiError', () => {
  it('expõe status e payload', () => {
    const err = new ApiError(422, 'inválido', { field: 'cnpj' });
    expect(err.status).toBe(422);
    expect(err.payload).toEqual({ field: 'cnpj' });
    expect(err.name).toBe('ApiError');
  });

  it('sinaliza 401 como não autenticado', () => {
    expect(new ApiError(401, 'sem sessão').isUnauthenticated).toBe(true);
    expect(new ApiError(403, 'sem permissão').isUnauthenticated).toBe(false);
  });

  it('sinaliza 403 como sem permissão (RBAC)', () => {
    expect(new ApiError(403, 'sem permissão').isForbidden).toBe(true);
    expect(new ApiError(401, 'sem sessão').isForbidden).toBe(false);
  });
});
