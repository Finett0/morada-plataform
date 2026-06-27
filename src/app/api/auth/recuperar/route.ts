import { recuperarSchema } from '@/lib/validation';
import { ok, handleError, ValidationError } from '@/server/http';

/**
 * POST /api/auth/recuperar — envia link de redefinição.
 * Resposta sempre genérica: não revela se o e-mail existe (SPEC §4.1).
 */
export async function POST(req: Request) {
  try {
    const parsed = recuperarSchema.safeParse(await req.json());
    if (!parsed.success) throw new ValidationError('Dados inválidos', parsed.error.flatten());
    // Em produção: gerar token expirável e enviar e-mail (integration-writer).
    return ok({ ok: true });
  } catch (err) {
    return handleError(err);
  }
}
