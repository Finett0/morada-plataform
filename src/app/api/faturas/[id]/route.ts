import { requireSession } from '@/server/session';
import { assertCan } from '@/lib/rbac';
import { getFatura } from '@/server/faturas';
import { ok, handleError } from '@/server/http';

export const dynamic = 'force-dynamic';

/** GET /api/faturas/[id] — detalhe da fatura com o split por colaborador. */
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = requireSession();
    assertCan(session.user.papel, 'fatura:ver');
    return ok({ fatura: getFatura(session.empresaId, params.id) });
  } catch (err) {
    return handleError(err);
  }
}
