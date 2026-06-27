import { requireSession } from '@/server/session';
import { assertCan } from '@/lib/rbac';
import { listColaboradores, createColaborador } from '@/server/colaboradores';
import { colaboradorSchema } from '@/lib/validation';
import { ok, handleError, ValidationError } from '@/server/http';

export const dynamic = 'force-dynamic';

/** GET /api/colaboradores — lista filtrável. */
export async function GET(req: Request) {
  try {
    const session = requireSession();
    assertCan(session.user.papel, 'colaborador:ver');
    const url = new URL(req.url);
    const thinFileParam = url.searchParams.get('thinFile');
    const list = listColaboradores(session.empresaId, {
      busca: url.searchParams.get('busca') ?? undefined,
      status: url.searchParams.get('status') ?? undefined,
      thinFile: thinFileParam === null ? undefined : thinFileParam === 'true',
    });
    return ok({ colaboradores: list });
  } catch (err) {
    return handleError(err);
  }
}

/** POST /api/colaboradores — cadastra/convida um PJ e inicia a originação. */
export async function POST(req: Request) {
  try {
    const session = requireSession();
    assertCan(session.user.papel, 'colaborador:criar');
    const parsed = colaboradorSchema.safeParse(await req.json());
    if (!parsed.success) throw new ValidationError('Dados inválidos', parsed.error.flatten());
    const colaborador = createColaborador(session, parsed.data);
    return ok({ colaborador }, 201);
  } catch (err) {
    return handleError(err);
  }
}
