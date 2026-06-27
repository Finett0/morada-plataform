import { PagePlaceholder } from '@/components/global/PagePlaceholder';

export default function FaturaDetalhePage({ params }: { params: { id: string } }) {
  return (
    <PagePlaceholder eyebrow="Faturamento" title="Detalhe da fatura" spec="SPEC §2.14 · issue 16">
      <p style={{ color: 'var(--muted)' }}>id: {params.id}</p>
    </PagePlaceholder>
  );
}
