import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { findForbiddenTerms } from './legal-guard';

describe('legal-guard (unidade)', () => {
  it('detecta termos proibidos', () => {
    expect(findForbiddenTerms('isto é um seguro fiança')).toContain('seguro');
    expect(findForbiddenTerms('a apólice e o segurado')).toEqual(
      expect.arrayContaining(['apólice', 'segurado']),
    );
    expect(findForbiddenTerms('reservas técnicas')).toContain('reservas técnicas');
  });

  it('aceita linguagem correta', () => {
    expect(findForbiddenTerms('fiança onerosa com fundo de reserva e convênio')).toEqual([]);
    // "Segurança" não é um termo proibido (palavra inteira)
    expect(findForbiddenTerms('aba de Segurança')).toEqual([]);
  });
});

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.(ts|tsx)$/.test(name)) out.push(full);
  }
  return out;
}

describe('legal-guard (varredura do src)', () => {
  it('nenhum termo securitário no código da aplicação', () => {
    const root = join(process.cwd(), 'src');
    const files = walk(root).filter(
      (f) => !f.includes('legal-guard') && !/\.(test|spec)\.(ts|tsx)$/.test(f),
    );
    const violacoes: string[] = [];
    for (const file of files) {
      const termos = findForbiddenTerms(readFileSync(file, 'utf8'));
      if (termos.length) violacoes.push(`${file}: ${termos.join(', ')}`);
    }
    expect(violacoes).toEqual([]);
  });
});
