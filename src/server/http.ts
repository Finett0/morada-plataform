/**
 * Helpers para route handlers (skills/route-writer): respostas padronizadas e
 * mapeamento de erros de domínio para os códigos HTTP do SPEC.
 */
import { NextResponse } from 'next/server';
import { ForbiddenError } from '@/lib/rbac';
import { UnauthenticatedError } from './session';

export class NotFoundError extends Error {
  constructor(entidade = 'Recurso') {
    super(`${entidade} não encontrado`);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends Error {
  readonly details: unknown;
  constructor(message: string, details?: unknown) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
  }
}

export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainError';
  }
}

export function ok<T>(data: T, status = 200): NextResponse {
  return NextResponse.json(data, { status });
}

/** Converte erros conhecidos em respostas HTTP coerentes com o SPEC. */
export function handleError(err: unknown): NextResponse {
  if (err instanceof UnauthenticatedError) {
    return NextResponse.json({ message: err.message }, { status: 401 });
  }
  if (err instanceof ForbiddenError) {
    return NextResponse.json({ message: err.message }, { status: 403 });
  }
  if (err instanceof NotFoundError) {
    return NextResponse.json({ message: err.message }, { status: 404 });
  }
  if (err instanceof ValidationError) {
    return NextResponse.json({ message: err.message, details: err.details }, { status: 422 });
  }
  if (err instanceof DomainError) {
    return NextResponse.json({ message: err.message }, { status: 409 });
  }
  console.error('Erro inesperado:', err);
  return NextResponse.json({ message: 'Erro interno' }, { status: 500 });
}

/** Envolve um handler aplicando o tratamento de erro padrão. */
export function route(handler: () => Promise<NextResponse> | NextResponse) {
  return async () => {
    try {
      return await handler();
    } catch (err) {
      return handleError(err);
    }
  };
}
