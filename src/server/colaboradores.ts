/**
 * Colaboradores PJ (issues 09-12): lista, detalhe, cadastro e desligamento
 * com trava de rescisão. Tenant-scoped; ações sensíveis registram auditoria.
 */
import { db, ETAPAS_ORIGINACAO } from './db';
import { recordAudit } from './audit';
import { DomainError, NotFoundError } from './http';
import type {
  ColaboradorPJ,
  Contrato,
  EtapaOriginacao,
  Papel,
} from '@/lib/types';

export interface ColaboradorFiltros {
  busca?: string;
  status?: string;
  thinFile?: boolean;
}

export function listColaboradores(empresaId: string, f: ColaboradorFiltros = {}): ColaboradorPJ[] {
  return db.colaboradores
    .filter((c) => c.empresaId === empresaId)
    .filter((c) => (f.status ? c.status === f.status : true))
    .filter((c) => (f.thinFile === undefined ? true : c.thinFile === f.thinFile))
    .filter((c) =>
      f.busca
        ? c.nome.toLowerCase().includes(f.busca.toLowerCase()) ||
          c.cnpj.includes(f.busca.replace(/\D/g, ''))
        : true,
    )
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export function getColaborador(
  empresaId: string,
  id: string,
): { colaborador: ColaboradorPJ; contrato?: Contrato } {
  const colaborador = db.colaboradores.find((c) => c.empresaId === empresaId && c.id === id);
  if (!colaborador) throw new NotFoundError('Colaborador');
  const contrato = db.contratos.find((c) => c.colaboradorId === id);
  return { colaborador, contrato };
}

function novasEtapas(): EtapaOriginacao[] {
  return ETAPAS_ORIGINACAO.map((nome, i) => ({
    nome,
    status: i === 0 ? 'done' : i === 1 ? 'current' : 'pending',
  }));
}

export function createColaborador(
  session: { empresaId: string; user: { nome: string; papel: Papel } },
  input: { nome: string; cnpj: string; email: string; valorNotaCents: number; modo: 'convite' | 'dados' },
): ColaboradorPJ {
  const colaborador: ColaboradorPJ = {
    id: `col_${Date.now()}`,
    empresaId: session.empresaId,
    nome: input.nome,
    cnpj: input.cnpj,
    email: input.email,
    valorNotaCents: input.valorNotaCents,
    status: 'em_originacao',
    thinFile: false,
    etapas: novasEtapas(),
    createdAt: new Date().toISOString(),
  };
  db.colaboradores.push(colaborador);

  db.notificacoes.push({
    id: `ntf_${Date.now()}`,
    empresaId: session.empresaId,
    titulo:
      input.modo === 'convite'
        ? `Convite enviado para ${colaborador.nome}.`
        : `${colaborador.nome} cadastrado — originação iniciada.`,
    lida: false,
    timestamp: new Date().toISOString(),
  });

  recordAudit({
    empresaId: session.empresaId,
    usuario: session.user.nome,
    papel: session.user.papel,
    acao: 'colaborador:criar',
    entidade: `Colaborador ${colaborador.id}`,
    contexto: `modo=${input.modo}`,
  });

  return colaborador;
}

export interface DesligamentoResumo {
  retencaoCents: number;
  aluguelCents: number;
}

/** Cálculo da trava de rescisão: retém ~3 meses de aluguel. */
export function calcularDesligamento(empresaId: string, id: string): DesligamentoResumo {
  const { contrato } = getColaborador(empresaId, id);
  const aluguelCents = contrato?.aluguelCents ?? 0;
  return { aluguelCents, retencaoCents: aluguelCents * 3 };
}

export function desligarColaborador(
  session: { empresaId: string; user: { nome: string; papel: Papel } },
  id: string,
  input: { dataDesligamento: string },
): ColaboradorPJ {
  const { colaborador, contrato } = getColaborador(session.empresaId, id);
  if (colaborador.status === 'desligado' || colaborador.status === 'em_desligamento') {
    throw new DomainError('Colaborador já está em desligamento');
  }

  colaborador.status = 'em_desligamento';

  const { retencaoCents } = calcularDesligamento(session.empresaId, id);
  if (contrato && retencaoCents > 0) {
    const faturaAberta = db.faturas.find(
      (f) => f.empresaId === session.empresaId && f.status === 'aberta',
    );
    const linha = faturaAberta?.linhas.find((l) => l.colaboradorId === id);
    if (linha) linha.retencaoCents = retencaoCents;
  }

  db.notificacoes.push({
    id: `ntf_${Date.now()}`,
    empresaId: session.empresaId,
    titulo: `Desligamento iniciado: ${colaborador.nome} (trava de rescisão acionada).`,
    lida: false,
    timestamp: new Date().toISOString(),
  });

  recordAudit({
    empresaId: session.empresaId,
    usuario: session.user.nome,
    papel: session.user.papel,
    acao: 'colaborador:desligar',
    entidade: `Colaborador ${colaborador.id}`,
    contexto: `data=${input.dataDesligamento}; retencaoCents=${retencaoCents}`,
  });

  return colaborador;
}
