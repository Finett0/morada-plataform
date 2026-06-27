import { cookies } from 'next/headers';
import { conviteSchema } from '@/lib/validation';
import { acceptInvite } from '@/server/auth';
import { SESSION_COOKIE } from '@/server/session';
import { ok, handleError, ValidationError } from '@/server/http';

/** POST /api/auth/convite — aceita o convite, ativa o usuário e abre a sessão. */
export async function POST(req: Request) {
  try {
    const parsed = conviteSchema.safeParse(await req.json());
    if (!parsed.success) throw new ValidationError('Dados inválidos', parsed.error.flatten());
    const user = acceptInvite(parsed.data.token);
    cookies().set(SESSION_COOKIE, user.id, { httpOnly: true, sameSite: 'lax', path: '/' });
    return ok({ user });
  } catch (err) {
    return handleError(err);
  }
}
