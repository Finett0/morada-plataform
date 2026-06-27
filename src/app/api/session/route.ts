import { getSession } from '@/server/session';
import { db } from '@/server/db';
import { ROLE_PERMISSIONS } from '@/lib/rbac';
import { ok, handleError } from '@/server/http';

export const dynamic = 'force-dynamic';

/** GET /api/session — usuário autenticado, permissões e status do benefício. */
export async function GET() {
  try {
    const session = getSession();
    if (!session) return ok({ authenticated: false }, 200);
    const empresa = db.empresas.find((e) => e.id === session.empresaId)!;
    return ok({
      authenticated: true,
      user: session.user,
      permissions: ROLE_PERMISSIONS[session.user.papel],
      empresa: { id: empresa.id, razaoSocial: empresa.razaoSocial, beneficioAtivo: empresa.beneficioAtivo },
    });
  } catch (err) {
    return handleError(err);
  }
}
