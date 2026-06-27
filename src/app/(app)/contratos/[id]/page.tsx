import { PagePlaceholder } from '@/components/global/PagePlaceholder';

export default function ContratoDetalhePage({ params }: { params: { id: string } }) {
  return (
    <PagePlaceholder eyebrow="Garantias" title="Detalhe do contrato" spec="SPEC §2.12 · issue 14">
      <p style={{ color: 'var(--muted)' }}>id: {params.id}</p>
    </PagePlaceholder>
  );
}
