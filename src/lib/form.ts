import type { z } from 'zod';

/** Extrai erros de campo de um safeParse do Zod para exibição inline. */
export function fieldErrors<T>(result: z.SafeParseReturnType<unknown, T>): Record<string, string> {
  if (result.success) return {};
  const fe = result.error.flatten().fieldErrors as Record<string, string[] | undefined>;
  const out: Record<string, string> = {};
  for (const [key, msgs] of Object.entries(fe)) {
    if (msgs && msgs.length) out[key] = msgs[0];
  }
  return out;
}

/** Mensagem amigável a partir de um erro de API. */
export function errorMessage(err: unknown, fallback = 'Algo deu errado'): string {
  if (err && typeof err === 'object' && 'message' in err) return String(err.message);
  return fallback;
}
