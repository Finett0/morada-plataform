import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import { Badge } from './Badge';
import { EmptyState } from './EmptyState';
import { formatBRL, formatCNPJ } from '@/lib/format';

describe('UI kit', () => {
  it('Button aplica a variante', () => {
    render(<Button variant="accent">Salvar</Button>);
    const btn = screen.getByRole('button', { name: 'Salvar' });
    expect(btn).toHaveClass('mu-btn--accent');
  });

  it('Badge renderiza o tom', () => {
    render(<Badge tone="success">ativo</Badge>);
    expect(screen.getByText('ativo')).toHaveClass('mu-badge--success');
  });

  it('EmptyState mostra título e ação', () => {
    render(<EmptyState title="Nada aqui" action={<Button>Criar</Button>} />);
    expect(screen.getByText('Nada aqui')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Criar' })).toBeInTheDocument();
  });
});

describe('format', () => {
  it('formata centavos em BRL', () => {
    expect(formatBRL(500000)).toContain('5.000,00');
    expect(formatBRL(30000)).toContain('300,00');
  });

  it('formata CNPJ', () => {
    expect(formatCNPJ('11222333000181')).toBe('11.222.333/0001-81');
  });
});
