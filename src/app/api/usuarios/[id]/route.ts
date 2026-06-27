import { requireSession } from '@/server/session';
import { assertCan } from '@/lib/rbac';
import { alterarPapel, removerUsuario } from '@/server/usuarios';
import { ok, handleError, ValidationError } from '@/server/http';
import { z } from 'zod';

const papelSchema = z.object({ papel: z.enum(['admin', 'financeiro', 'rh', 'visualizador']) });

/** PATCH /api/usuarios/[id] — altera o papel. */
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = requireSession();
    assertCan(session.user.papel, 'usuario:gerenciar');
    const parsed = papelSchema.safeParse(await req.json());
    if (!parsed.success) throw new ValidationError('Dados inválidos', parsed.error.flatten());
    return ok({ usuario: alterarPapel(session, params.id, parsed.data.papel) });
  } catch (err) {
    return handleError(err);
  }
}

/** DELETE /api/usuarios/[id] — remove o usuário (bloqueia o último admin). */
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = requireSession();
    assertCan(session.user.papel, 'usuario:gerenciar');
    removerUsuario(session, params.id);
    return ok({ ok: true });
  } catch (err) {
    return handleError(err);
  }
}
