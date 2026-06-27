import { requireSession } from '@/server/session';
import { assertCan } from '@/lib/rbac';
import { listContratos } from '@/server/contratos';
import { ok, handleError } from '@/server/http';

export const dynamic = 'force-dynamic';

/** GET /api/contratos — lista de contratos/garantias. */
export async function GET(req: Request) {
  try {
    const session = requireSession();
    assertCan(session.user.papel, 'contrato:ver');
    const status = new URL(req.url).searchParams.get('status') ?? undefined;
    return ok({ contratos: listContratos(session.empresaId, { status }) });
  } catch (err) {
    return handleError(err);
  }
}
