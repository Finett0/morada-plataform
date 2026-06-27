import { cookies } from 'next/headers';
import { loginSchema } from '@/lib/validation';
import { authenticate } from '@/server/auth';
import { SESSION_COOKIE } from '@/server/session';
import { ok, handleError, ValidationError } from '@/server/http';

/** POST /api/auth/login — autentica e abre a sessão (cookie). */
export async function POST(req: Request) {
  try {
    const parsed = loginSchema.safeParse(await req.json());
    if (!parsed.success) throw new ValidationError('Dados inválidos', parsed.error.flatten());
    const user = authenticate(parsed.data.email, parsed.data.password);
    cookies().set(SESSION_COOKIE, user.id, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });
    return ok({ user });
  } catch (err) {
    return handleError(err);
  }
}
