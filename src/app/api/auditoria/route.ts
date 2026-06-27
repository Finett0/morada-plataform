import { requireSession } from '@/server/session';
import { assertCan } from '@/lib/rbac';
import { listEventos } from '@/server/auditoria';
import { ok, handleError } from '@/server/http';

export const dynamic = 'force-dynamic';

/** GET /api/auditoria — trilha de auditoria da empresa (conformidade). */
export async function GET(req: Request) {
  try {
    const session = requireSession();
    assertCan(session.user.papel, 'config:editar');
    const entidade = new URL(req.url).searchParams.get('entidade') ?? undefined;
    return ok({ eventos: listEventos(session.empresaId, entidade) });
  } catch (err) {
    return handleError(err);
  }
}
