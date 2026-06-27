import { requireSession } from '@/server/session';
import { listNotificacoes, contarNaoLidas } from '@/server/notificacoes';
import { ok, handleError } from '@/server/http';

export const dynamic = 'force-dynamic';

/** GET /api/notificacoes — lista + contador de não-lidas. */
export async function GET() {
  try {
    const session = requireSession();
    return ok({
      notificacoes: listNotificacoes(session.empresaId),
      naoLidas: contarNaoLidas(session.empresaId),
    });
  } catch (err) {
    return handleError(err);
  }
}
