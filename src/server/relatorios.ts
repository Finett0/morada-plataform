/**
 * Relatórios (issue 17): séries e totais agregados, tenant-scoped.
 */
import { db } from './db';

export interface Relatorio {
  faturamentoMensal: { mes: string; totalCents: number }[];
  economiaGeradaCents: number;
  custoEmpresaCents: number;
  contratosAtivos: number;
  colaboradoresAtivos: number;
}

export function getRelatorio(empresaId: string): Relatorio {
  const faturas = db.faturas.filter((f) => f.empresaId === empresaId);
  const contratos = db.contratos.filter((c) => c.empresaId === empresaId);
  const colaboradores = db.colaboradores.filter((c) => c.empresaId === empresaId);

  const faturamentoMensal = [...faturas]
    .sort((a, b) => +new Date(a.mesRef) - +new Date(b.mesRef))
    .map((f) => ({ mes: f.mesRef, totalCents: f.totalCents }));

  const economiaGeradaCents = contratos
    .filter((c) => c.status === 'ativo')
    .reduce((sum, c) => sum + Math.max(0, Math.round(c.aluguelCents * 0.12) - c.taxaCents), 0);

  return {
    faturamentoMensal,
    economiaGeradaCents,
    custoEmpresaCents: 0,
    contratosAtivos: contratos.filter((c) => c.status === 'ativo').length,
    colaboradoresAtivos: colaboradores.filter((c) => c.status === 'ativo').length,
  };
}
