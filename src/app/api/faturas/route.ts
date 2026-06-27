import { requireSession } from '@/server/session';
import { assertCan } from '@/lib/rbac';
import { listFaturas } from '@/server/faturas';
import { ok, handleError } from '@/server/http';

export const dynamic = 'force-dynamic';

/** GET /api/faturas — lista de faturas consolidadas. */
export async function GET(req: Request) {
  try {
    const session = requireSession();
    assertCan(session.user.papel, 'fatura:ver');
    const status = new URL(req.url).searchParams.get('status') ?? undefined;
    return ok({ faturas: listFaturas(session.empresaId, { status }) });
  } catch (err) {
    return handleError(err);
  }
}
