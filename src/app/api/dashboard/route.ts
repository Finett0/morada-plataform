import { requireSession } from '@/server/session';
import { assertCan } from '@/lib/rbac';
import { getDashboard } from '@/server/dashboard';
import { ok, handleError } from '@/server/http';

/** GET /api/dashboard — resumo da carteira de benefícios da empresa. */
export async function GET() {
  try {
    const session = requireSession();
    assertCan(session.user.papel, 'dashboard:ver');
    return ok(getDashboard(session.empresaId));
  } catch (err) {
    return handleError(err);
  }
}
