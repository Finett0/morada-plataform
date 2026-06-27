import { Button } from './Button';

export function Pagination({
  page,
  pageCount,
  onPage,
}: {
  page: number;
  pageCount: number;
  onPage: (page: number) => void;
}) {
  if (pageCount <= 1) return null;
  return (
    <div className="mu-pagination">
      <Button variant="secondary" onClick={() => onPage(page - 1)} disabled={page <= 1}>
        Anterior
      </Button>
      <span className="mu-muted">
        Página {page} de {pageCount}
      </span>
      <Button variant="secondary" onClick={() => onPage(page + 1)} disabled={page >= pageCount}>
        Próxima
      </Button>
    </div>
  );
}
