/**
 * Cliente HTTP central da Plataforma da Empresa.
 *
 * Padroniza chamadas à API com:
 * - base URL única (config.apiBaseUrl);
 * - parsing de JSON;
 * - erro tipado (ApiError) com status e payload;
 * - tratamento dos códigos do SPEC (401 não autenticado, 403 sem permissão, etc.).
 *
 * Estados de loading/erro são gerenciados pelos hooks (ver skills/hook-writer)
 * sobre o TanStack Query — este módulo cuida apenas do transporte.
 */
import { config } from '@/lib/config';

export class ApiError extends Error {
  readonly status: number;
  readonly payload: unknown;

  constructor(status: number, message: string, payload?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }

  /** true quando o usuário não está autenticado (deve ir para /login). */
  get isUnauthenticated(): boolean {
    return this.status === 401;
  }

  /** true quando o usuário está autenticado mas não tem permissão (RBAC). */
  get isForbidden(): boolean {
    return this.status === 403;
  }
}

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  /** Query params serializados na URL. */
  params?: Record<string, string | number | boolean | undefined>;
}

function buildUrl(path: string, params?: RequestOptions['params']): string {
  const base = config.apiBaseUrl.replace(/\/$/, '');
  const url = `${base}/${path.replace(/^\//, '')}`;
  if (!params) return url;
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `${url}?${qs}` : url;
}

async function request<T>(method: string, path: string, options: RequestOptions = {}): Promise<T> {
  const { body, params, headers, ...rest } = options;

  const response = await fetch(buildUrl(path, params), {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: 'include',
    ...rest,
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json().catch(() => undefined) : undefined;

  if (!response.ok) {
    const message =
      (data && typeof data === 'object' && 'message' in data && String(data.message)) ||
      `Erro ${response.status}`;
    throw new ApiError(response.status, message, data);
  }

  return data as T;
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) => request<T>('GET', path, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>('POST', path, { ...options, body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>('PUT', path, { ...options, body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>('PATCH', path, { ...options, body }),
  delete: <T>(path: string, options?: RequestOptions) => request<T>('DELETE', path, options),
};
