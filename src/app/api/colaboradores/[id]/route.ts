import { requireSession } from '@/server/session';
import { assertCan } from '@/lib/rbac';
import { getColaborador, calcularDesligamento } from '@/server/colaboradores';
import { ok, handleError } from '@/server/http';

export const dynamic = 'force-dynamic';

/** GET /api/colaboradores/[id] — detalhe + contrato + resumo de desligamento. */
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = requireSession();
    assertCan(session.user.papel, 'colaborador:ver');
    const { colaborador, contrato } = getColaborador(session.empresaId, params.id);
    const desligamento = calcularDesligamento(session.empresaId, params.id);
    return ok({ colaborador, contrato, desligamento });
  } catch (err) {
    return handleError(err);
  }
}
