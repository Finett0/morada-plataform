import { requireSession } from '@/server/session';
import { assertCan } from '@/lib/rbac';
import { listUsuarios, convidarUsuario } from '@/server/usuarios';
import { conviteUsuarioSchema } from '@/lib/validation';
import { ok, handleError, ValidationError } from '@/server/http';

export const dynamic = 'force-dynamic';

/** GET /api/usuarios — usuários da empresa. */
export async function GET() {
  try {
    const session = requireSession();
    assertCan(session.user.papel, 'usuario:gerenciar');
    return ok({ usuarios: listUsuarios(session.empresaId) });
  } catch (err) {
    return handleError(err);
  }
}

/** POST /api/usuarios — convida um usuário. */
export async function POST(req: Request) {
  try {
    const session = requireSession();
    assertCan(session.user.papel, 'usuario:gerenciar');
    const parsed = conviteUsuarioSchema.safeParse(await req.json());
    if (!parsed.success) throw new ValidationError('Dados inválidos', parsed.error.flatten());
    return ok({ usuario: convidarUsuario(session, parsed.data) }, 201);
  } catch (err) {
    return handleError(err);
  }
}
