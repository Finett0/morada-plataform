/**
 * Tipos do domínio Morada (Plataforma da Empresa).
 * Reflete o modelo de architecture.md §5. Valores monetários SEMPRE em centavos.
 */

export type Papel = 'admin' | 'financeiro' | 'rh' | 'visualizador';

export const PAPEL_LABEL: Record<Papel, string> = {
  admin: 'Admin',
  financeiro: 'Financeiro',
  rh: 'RH',
  visualizador: 'Visualizador',
};

export interface Empresa {
  id: string;
  razaoSocial: string;
  cnpj: string;
  endereco?: string;
  /** Benefício ativado (onboarding concluído + convênio assinado). */
  beneficioAtivo: boolean;
  convenioAssinado: boolean;
  createdAt: string;
}

export type UsuarioStatus = 'ativo' | 'pendente';

export interface Usuario {
  id: string;
  empresaId: string;
  nome: string;
  email: string;
  papel: Papel;
  status: UsuarioStatus;
  createdAt: string;
}

export type ColaboradorStatus = 'em_originacao' | 'ativo' | 'em_desligamento' | 'desligado';

export type EtapaStatus = 'done' | 'current' | 'pending' | 'blocked';

/** Timeline de originação (8 passos — SPEC §2.9). */
export interface EtapaOriginacao {
  nome: string;
  status: EtapaStatus;
  motivo?: string;
}

export interface ColaboradorPJ {
  id: string;
  empresaId: string;
  nome: string;
  cnpj: string;
  email: string;
  valorNotaCents: number;
  status: ColaboradorStatus;
  thinFile: boolean;
  contratoId?: string;
  etapas: EtapaOriginacao[];
  createdAt: string;
}

export type ContratoStatus = 'em_originacao' | 'ativo' | 'encerrado';
export type EscopoGarantia = 'inadimplencia' | 'inadimplencia_danos';

export interface DocumentoRef {
  nome: string;
  tipo: string;
}

export interface Contrato {
  id: string;
  empresaId: string;
  colaboradorId: string;
  colaboradorNome: string;
  imovel: string;
  proprietario: string;
  imobiliaria: string;
  aluguelCents: number;
  liquidoCents: number;
  taxaCents: number;
  fundoCents: number;
  escopo: EscopoGarantia;
  status: ContratoStatus;
  vigenciaInicio: string;
  vigenciaFim?: string;
  documentos: DocumentoRef[];
  eventos: { data: string; descricao: string }[];
}

export type FaturaStatus = 'aberta' | 'paga' | 'atrasada';

/** Split por colaborador dentro da fatura consolidada. */
export interface LinhaFatura {
  colaboradorId: string;
  colaboradorNome: string;
  aluguelCents: number;
  liquidoCents: number;
  taxaCents: number;
  fundoCents: number;
  /** Retenção por trava de rescisão, quando aplicável. */
  retencaoCents?: number;
}

export interface Fatura {
  id: string;
  empresaId: string;
  mesRef: string;
  vencimento: string;
  status: FaturaStatus;
  totalCents: number;
  linhas: LinhaFatura[];
}

export type DocumentoStatus = 'assinado' | 'pendente';

export interface Documento {
  id: string;
  empresaId: string;
  nome: string;
  tipo: string;
  status: DocumentoStatus;
  data: string;
}

export interface EventoAuditoria {
  id: string;
  empresaId: string;
  usuario: string;
  papel: Papel;
  acao: string;
  entidade: string;
  contexto?: string;
  timestamp: string;
}

export interface Notificacao {
  id: string;
  empresaId: string;
  titulo: string;
  lida: boolean;
  timestamp: string;
}
