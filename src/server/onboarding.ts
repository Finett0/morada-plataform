/**
 * Onboarding (issue 07): ativa o benefício após a assinatura do convênio.
 */
import { db } from './db';
import { recordAudit } from './audit';
import { DomainError, NotFoundError } from './http';
import type { Papel } from '@/lib/types';

export function ativarBeneficio(
  session: { empresaId: string; user: { nome: string; papel: Papel } },
  input: { endereco?: string },
) {
  const empresa = db.empresas.find((e) => e.id === session.empresaId);
  if (!empresa) throw new NotFoundError('Empresa');
  if (empresa.beneficioAtivo) throw new DomainError('Benefício já ativado');

  if (input.endereco) empresa.endereco = input.endereco;
  empresa.convenioAssinado = true;
  empresa.beneficioAtivo = true;

  db.documentos.push({
    id: `doc_${Date.now()}`,
    empresaId: empresa.id,
    nome: 'Convênio B2B de roteamento',
    tipo: 'convênio',
    status: 'assinado',
    data: new Date().toISOString(),
  });

  recordAudit({
    empresaId: empresa.id,
    usuario: session.user.nome,
    papel: session.user.papel,
    acao: 'convenio:assinar',
    entidade: `Empresa ${empresa.id}`,
    contexto: 'Assinatura eletrônica do convênio no onboarding',
  });

  return empresa;
}
