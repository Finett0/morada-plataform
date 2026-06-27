import { PagePlaceholder } from '@/components/global/PagePlaceholder';

export default function ColaboradorDetalhePage({ params }: { params: { id: string } }) {
  return (
    <PagePlaceholder
      eyebrow="Colaboradores PJ"
      title="Detalhe do colaborador"
      spec="SPEC §2.9 · issue 11"
    >
      <p style={{ color: 'var(--muted)' }}>id: {params.id}</p>
    </PagePlaceholder>
  );
}
