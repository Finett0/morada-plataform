import { cookies } from 'next/headers';
import { SESSION_COOKIE } from '@/server/session';
import { ok } from '@/server/http';

/** POST /api/auth/logout — encerra a sessão. */
export async function POST() {
  cookies().delete(SESSION_COOKIE);
  return ok({ ok: true });
}
