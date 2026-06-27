import { requireSession } from '@/server/session';
import { assertCan } from '@/lib/rbac';
import { pagarFatura } from '@/server/faturas';
import { ok, handleError } from '@/server/http';

/** POST /api/faturas/[id]/pagar — paga a fatura consolidada (split na fonte). */
export async function POST(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = requireSession();
    assertCan(session.user.papel, 'fatura:pagar');
    const fatura = pagarFatura(session, params.id);
    return ok({ fatura });
  } catch (err) {
    return handleError(err);
  }
}
