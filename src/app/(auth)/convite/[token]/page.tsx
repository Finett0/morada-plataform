import { PagePlaceholder } from '@/components/global/PagePlaceholder';

export default function ConvitePage({ params }: { params: { token: string } }) {
  return (
    <PagePlaceholder eyebrow="Acesso" title="Aceitar convite" spec="SPEC §2.4 · issue 06">
      <p style={{ color: 'var(--muted)' }}>token: {params.token}</p>
    </PagePlaceholder>
  );
}
