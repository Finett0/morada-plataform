import { PagePlaceholder } from '@/components/global/PagePlaceholder';

export default function DesligarColaboradorPage({ params }: { params: { id: string } }) {
  return (
    <PagePlaceholder
      eyebrow="Trava de rescisão"
      title="Desligar colaborador"
      spec="SPEC §2.10 · issue 12"
    >
      <p style={{ color: 'var(--muted)' }}>id: {params.id}</p>
    </PagePlaceholder>
  );
}
