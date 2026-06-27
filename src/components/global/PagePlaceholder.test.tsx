import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PagePlaceholder } from './PagePlaceholder';

describe('PagePlaceholder', () => {
  it('renderiza título e eyebrow', () => {
    render(<PagePlaceholder eyebrow="Visão geral" title="Dashboard" spec="SPEC §2.6" />);
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByText('Visão geral')).toBeInTheDocument();
  });
});
