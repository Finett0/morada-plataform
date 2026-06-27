import { requireSession } from '@/server/session';
import { marcarLidas } from '@/server/notificacoes';
import { ok, handleError } from '@/server/http';

/** POST /api/notificacoes/ler — marca uma (body {id}) ou todas como lidas. */
export async function POST(req: Request) {
  try {
    const session = requireSession();
    const body = (await req.json().catch(() => ({}))) as { id?: string };
    marcarLidas(session.empresaId, body.id);
    return ok({ ok: true });
  } catch (err) {
    return handleError(err);
  }
}
