import { requireSession } from '@/server/session';
import { assertCan } from '@/lib/rbac';
import { desligarColaborador } from '@/server/colaboradores';
import { desligamentoSchema } from '@/lib/validation';
import { ok, handleError, ValidationError } from '@/server/http';

/** POST /api/colaboradores/[id]/desligar — aciona a trava de rescisão. */
export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = requireSession();
    assertCan(session.user.papel, 'colaborador:desligar');
    const parsed = desligamentoSchema.safeParse(await req.json());
    if (!parsed.success) throw new ValidationError('Dados inválidos', parsed.error.flatten());
    const colaborador = desligarColaborador(session, params.id, parsed.data);
    return ok({ colaborador });
  } catch (err) {
    return handleError(err);
  }
}
