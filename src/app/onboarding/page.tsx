import { PagePlaceholder } from '@/components/global/PagePlaceholder';

/**
 * Onboarding da empresa (wizard). Fora dos grupos (auth)/(app): a empresa já
 * está autenticada, mas ainda não ativou o benefício. Tela real na issue 07.
 */
export default function OnboardingPage() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 48 }}>
      <PagePlaceholder
        eyebrow="Ativação"
        title="Onboarding da empresa"
        spec="SPEC §2.5 · issue 07"
      />
    </div>
  );
}
