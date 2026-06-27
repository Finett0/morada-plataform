import { cookies } from 'next/headers';
import { signupSchema } from '@/lib/validation';
import { createCompanyWithAdmin } from '@/server/auth';
import { SESSION_COOKIE } from '@/server/session';
import { ok, handleError, ValidationError } from '@/server/http';

/** POST /api/auth/signup — cria empresa + admin e abre a sessão. */
export async function POST(req: Request) {
  try {
    const parsed = signupSchema.safeParse(await req.json());
    if (!parsed.success) throw new ValidationError('Dados inválidos', parsed.error.flatten());
    const { admin } = createCompanyWithAdmin(parsed.data);
    cookies().set(SESSION_COOKIE, admin.id, { httpOnly: true, sameSite: 'lax', path: '/' });
    return ok({ user: admin }, 201);
  } catch (err) {
    return handleError(err);
  }
}
