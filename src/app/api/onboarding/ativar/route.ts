import { requireSession } from '@/server/session';
import { assertCan } from '@/lib/rbac';
import { ativarBeneficio } from '@/server/onboarding';
import { ok, handleError } from '@/server/http';

/** POST /api/onboarding/ativar — assina o convênio e ativa o benefício. */
export async function POST(req: Request) {
  try {
    const session = requireSession();
    assertCan(session.user.papel, 'convenio:assinar');
    const body = (await req.json().catch(() => ({}))) as { endereco?: string };
    const empresa = ativarBeneficio(session, { endereco: body.endereco });
    return ok({ empresa });
  } catch (err) {
    return handleError(err);
  }
}
