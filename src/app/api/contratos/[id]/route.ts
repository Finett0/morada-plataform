import { requireSession } from '@/server/session';
import { assertCan } from '@/lib/rbac';
import { getContrato } from '@/server/contratos';
import { ok, handleError } from '@/server/http';

export const dynamic = 'force-dynamic';

/** GET /api/contratos/[id] — detalhe do contrato. */
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = requireSession();
    assertCan(session.user.papel, 'contrato:ver');
    return ok({ contrato: getContrato(session.empresaId, params.id) });
  } catch (err) {
    return handleError(err);
  }
}
