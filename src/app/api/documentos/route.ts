import { requireSession } from '@/server/session';
import { assertCan } from '@/lib/rbac';
import { listDocumentos } from '@/server/documentos';
import { ok, handleError } from '@/server/http';

export const dynamic = 'force-dynamic';

/** GET /api/documentos — repositório de documentos da empresa. */
export async function GET() {
  try {
    const session = requireSession();
    assertCan(session.user.papel, 'documento:ver');
    return ok({ documentos: listDocumentos(session.empresaId) });
  } catch (err) {
    return handleError(err);
  }
}
