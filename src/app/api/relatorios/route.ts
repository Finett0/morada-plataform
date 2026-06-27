import { requireSession } from '@/server/session';
import { assertCan } from '@/lib/rbac';
import { getRelatorio } from '@/server/relatorios';
import { ok, handleError } from '@/server/http';

export const dynamic = 'force-dynamic';

/** GET /api/relatorios — séries e totais da carteira. */
export async function GET() {
  try {
    const session = requireSession();
    assertCan(session.user.papel, 'relatorio:ver');
    return ok(getRelatorio(session.empresaId));
  } catch (err) {
    return handleError(err);
  }
}
