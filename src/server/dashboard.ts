/**
 * Agregações do dashboard (issue 08), escopadas por empresa.
 * A economia gerada ao PJ estima o que ele pagaria em seguro fiança
 * (~12% do aluguel) menos a taxa da garantia (README §3).
 */
import { db } from './db';

export interface DashboardSummary {
  colaboradoresAtivos: number;
  contratosAtivos: number;
  emOriginacao: number;
  custoEmpresaCents: number;
  economiaGeradaCents: number;
  pendencias: { tipo: string; descricao: string; href: string }[];
  proximosVencimentos: {
    id: string;
    mesRef: string;
    vencimento: string;
    totalCents: number;
    status: string;
  }[];
}

export function getDashboard(empresaId: string): DashboardSummary {
  const colaboradores = db.colaboradores.filter((c) => c.empresaId === empresaId);
  const contratos = db.contratos.filter((c) => c.empresaId === empresaId);
  const faturas = db.faturas.filter((f) => f.empresaId === empresaId);
  const usuarios = db.usuarios.filter((u) => u.empresaId === empresaId);

  const contratosAtivos = contratos.filter((c) => c.status === 'ativo');
  const economiaGeradaCents = contratosAtivos.reduce(
    (sum, c) => sum + Math.max(0, Math.round(c.aluguelCents * 0.12) - c.taxaCents),
    0,
  );

  const pendencias: DashboardSummary['pendencias'] = [];
  for (const c of colaboradores) {
    const bloqueada = c.etapas.find((e) => e.status === 'blocked');
    const atual = c.etapas.find((e) => e.status === 'current');
    if (c.status === 'em_originacao' && (bloqueada || atual)) {
      pendencias.push({
        tipo: 'Originação',
        descricao: `${c.nome}: ${(bloqueada ?? atual)!.nome}`,
        href: `/colaboradores/${c.id}`,
      });
    }
  }
  for (const f of faturas.filter((x) => x.status === 'aberta' || x.status === 'atrasada')) {
    pendencias.push({
      tipo: 'Fatura',
      descricao: `Fatura ${f.status} — vence ${new Date(f.vencimento).toLocaleDateString('pt-BR')}`,
      href: `/faturas/${f.id}`,
    });
  }
  for (const u of usuarios.filter((x) => x.status === 'pendente')) {
    pendencias.push({
      tipo: 'Usuário',
      descricao: `Convite pendente: ${u.email}`,
      href: '/configuracoes',
    });
  }

  const proximosVencimentos = faturas
    .filter((f) => f.status !== 'paga')
    .sort((a, b) => +new Date(a.vencimento) - +new Date(b.vencimento))
    .map((f) => ({
      id: f.id,
      mesRef: f.mesRef,
      vencimento: f.vencimento,
      totalCents: f.totalCents,
      status: f.status,
    }));

  return {
    colaboradoresAtivos: colaboradores.filter((c) => c.status === 'ativo').length,
    contratosAtivos: contratosAtivos.length,
    emOriginacao: colaboradores.filter((c) => c.status === 'em_originacao').length,
    custoEmpresaCents: 0,
    economiaGeradaCents,
    pendencias,
    proximosVencimentos,
  };
}
