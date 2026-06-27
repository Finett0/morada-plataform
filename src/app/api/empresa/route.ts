import { requireSession } from '@/server/session';
import { assertCan } from '@/lib/rbac';
import { getEmpresa, atualizarEmpresa } from '@/server/usuarios';
import { ok, handleError, ValidationError } from '@/server/http';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const updateSchema = z.object({
  razaoSocial: z.string().min(2).optional(),
  endereco: z.string().optional(),
});

/** GET /api/empresa — dados da empresa. */
export async function GET() {
  try {
    const session = requireSession();
    return ok({ empresa: getEmpresa(session.empresaId) });
  } catch (err) {
    return handleError(err);
  }
}

/** PATCH /api/empresa — atualiza dados da empresa. */
export async function PATCH(req: Request) {
  try {
    const session = requireSession();
    assertCan(session.user.papel, 'config:editar');
    const parsed = updateSchema.safeParse(await req.json());
    if (!parsed.success) throw new ValidationError('Dados inválidos', parsed.error.flatten());
    return ok({ empresa: atualizarEmpresa(session, parsed.data) });
  } catch (err) {
    return handleError(err);
  }
}
