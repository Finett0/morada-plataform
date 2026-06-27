import { redirect } from 'next/navigation';
import { getSession } from '@/server/session';
import { db } from '@/server/db';
import { formatCNPJ } from '@/lib/format';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';

/**
 * Onboarding da empresa (SPEC §2.5). Guarda: sem sessão -> /login;
 * benefício já ativo -> /. Caso contrário, renderiza o wizard.
 */
export default function OnboardingPage() {
  const session = getSession();
  if (!session) redirect('/login');

  const empresa = db.empresas.find((e) => e.id === session.empresaId);
  if (!empresa) redirect('/login');
  if (empresa.beneficioAtivo) redirect('/');

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 48 }}>
      <OnboardingWizard
        empresa={{ razaoSocial: empresa.razaoSocial, cnpj: formatCNPJ(empresa.cnpj) }}
      />
    </div>
  );
}
