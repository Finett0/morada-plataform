/**
 * Guarda de linguagem jurídica (issue 24 / design.md §2 / README §4, §6).
 *
 * A tese da Morada é fiança ≠ seguro. Usar vocabulário securitário em código,
 * cópia de tela ou e-mail "entrega munição" contra a própria tese. Este módulo
 * define os termos proibidos e um verificador, usado por um teste de CI que
 * quebra o build se um termo aparecer no código-fonte da aplicação.
 */

/** Termos proibidos (lógica de palavra inteira, case-insensitive). */
export const FORBIDDEN_TERMS = [
  'seguro',
  'seguros',
  'apólice',
  'apolice',
  'segurado',
  'segurada',
  'seguradora',
  'reservas técnicas',
  'reservas tecnicas',
  'reserva técnica',
  'reserva tecnica',
] as const;

/** Termos corretos a usar no lugar. */
export const PREFERRED_TERMS = [
  'fiança',
  'garantia',
  'roteamento',
  'fundo de reserva',
  'convênio',
  'trava de rescisão',
] as const;

const PATTERN = new RegExp(
  `\\b(${FORBIDDEN_TERMS.map((t) => t.replace(/ /g, '\\s+')).join('|')})\\b`,
  'gi',
);

/** Retorna os termos proibidos encontrados no texto (vazio = ok). */
export function findForbiddenTerms(text: string): string[] {
  const matches = text.match(PATTERN);
  return matches ? Array.from(new Set(matches.map((m) => m.toLowerCase()))) : [];
}

/** true se o texto está livre de termos proibidos. */
export function isLegalLanguageClean(text: string): boolean {
  return findForbiddenTerms(text).length === 0;
}
