/**
 * Store de dados em memória com seed (issue 02).
 *
 * Substitui temporariamente o Prisma/Postgres para o scaffold rodar sem um
 * banco provisionado. As mesmas entidades (src/lib/types.ts) e o mesmo schema
 * (prisma/schema.prisma) valem para a migração de produção; ao trocar, apenas
 * a implementação destes acessores muda — actions, rotas e UI permanecem.
 *
 * Nota: o estado é por processo (não persiste reinício / não compartilha entre
 * instâncias serverless). Adequado a desenvolvimento e demonstração.
 */
import type {
  ColaboradorPJ,
  Contrato,
  Documento,
  Empresa,
  EtapaOriginacao,
  EtapaStatus,
  EventoAuditoria,
  Fatura,
  Notificacao,
  Usuario,
} from '@/lib/types';

export const ETAPAS_ORIGINACAO = [
  'Elegibilidade',
  'KYC da imobiliária',
  'Subscrição do PJ + imóvel',
  'Carta de garantia',
  'Assinaturas',
  'Convênio de roteamento',
  'Configuração do split',
  'Entrada e 1º ciclo',
] as const;

function buildEtapas(states: EtapaStatus[], motivos: Record<number, string> = {}): EtapaOriginacao[] {
  return ETAPAS_ORIGINACAO.map((nome, i) => ({
    nome,
    status: states[i] ?? 'pending',
    motivo: motivos[i],
  }));
}

const EMPRESA_ID = 'emp_1';

const empresa: Empresa = {
  id: EMPRESA_ID,
  razaoSocial: 'Acme Tecnologia Ltda.',
  cnpj: '11222333000181',
  endereco: 'Av. Paulista, 1000 — São Paulo/SP',
  beneficioAtivo: true,
  convenioAssinado: true,
  createdAt: '2026-01-10T12:00:00.000Z',
};

const usuarios: Usuario[] = [
  { id: 'usr_1', empresaId: EMPRESA_ID, nome: 'Admin', email: 'admin@morada.com', papel: 'admin', status: 'ativo', createdAt: '2026-01-10T12:00:00.000Z' },
];

/**
 * Credenciais (e-mail -> senha). Mock do scaffold: senha em texto puro.
 * Em produção, vira hash verificado no login (substitui esta camada).
 */
const credenciais: Record<string, string> = {
  'admin@morada.com': '!morada123',
};

const colaboradores: ColaboradorPJ[] = [
  {
    id: 'col_1', empresaId: EMPRESA_ID, nome: 'João Pereira', cnpj: '22333444000155',
    email: 'joao@dev.com', valorNotaCents: 1_500_000, status: 'ativo', thinFile: false,
    contratoId: 'ct_1', etapas: buildEtapas(['done', 'done', 'done', 'done', 'done', 'done', 'done', 'done']),
    createdAt: '2026-02-15T12:00:00.000Z',
  },
  {
    id: 'col_2', empresaId: EMPRESA_ID, nome: 'Maria Fernandes', cnpj: '33444555000166',
    email: 'maria@design.com', valorNotaCents: 1_184_000, status: 'em_originacao', thinFile: true,
    contratoId: 'ct_2',
    etapas: buildEtapas(
      ['done', 'done', 'current', 'pending', 'pending', 'pending', 'pending', 'pending'],
      { 2: 'Aguardando documentação de renda do PJ (thin file).' },
    ),
    createdAt: '2026-06-10T12:00:00.000Z',
  },
  {
    id: 'col_3', empresaId: EMPRESA_ID, nome: 'Pedro Alves', cnpj: '44555666000177',
    email: 'pedro@growth.com', valorNotaCents: 1_776_000, status: 'em_desligamento', thinFile: false,
    contratoId: 'ct_3', etapas: buildEtapas(['done', 'done', 'done', 'done', 'done', 'done', 'done', 'done']),
    createdAt: '2026-03-01T12:00:00.000Z',
  },
  {
    id: 'col_4', empresaId: EMPRESA_ID, nome: 'Sofia Ramos', cnpj: '55666777000188',
    email: 'sofia@bpo.com', valorNotaCents: 980_000, status: 'em_originacao', thinFile: false,
    contratoId: 'ct_4',
    etapas: buildEtapas(['done', 'current', 'pending', 'pending', 'pending', 'pending', 'pending', 'pending'], {
      1: 'KYC da imobiliária em andamento (gargalo mais lento).',
    }),
    createdAt: '2026-06-22T12:00:00.000Z',
  },
];

const contratos: Contrato[] = [
  {
    id: 'ct_1', empresaId: EMPRESA_ID, colaboradorId: 'col_1', colaboradorNome: 'João Pereira',
    imovel: 'Rua das Flores, 123 — ap. 52, São Paulo/SP', proprietario: 'Imobiliária Vista Ltda. (proprietário: R. Gomes)',
    imobiliaria: 'Vista Imóveis', aluguelCents: 500_000, liquidoCents: 970_000, taxaCents: 30_000, fundoCents: 9_000,
    escopo: 'inadimplencia', status: 'ativo', vigenciaInicio: '2026-03-01T00:00:00.000Z', vigenciaFim: '2027-03-01T00:00:00.000Z',
    documentos: [
      { nome: 'Carta de garantia', tipo: 'garantia' },
      { nome: 'Contrato de locação', tipo: 'locacao' },
      { nome: 'Termo de aceite da imobiliária', tipo: 'aceite' },
    ],
    eventos: [{ data: '2026-03-01T00:00:00.000Z', descricao: 'Entrada no imóvel e início do 1º ciclo.' }],
  },
  {
    id: 'ct_2', empresaId: EMPRESA_ID, colaboradorId: 'col_2', colaboradorNome: 'Maria Fernandes',
    imovel: 'A definir', proprietario: 'A definir', imobiliaria: 'Lar Imóveis',
    aluguelCents: 320_000, liquidoCents: 840_000, taxaCents: 24_000, fundoCents: 7_200,
    escopo: 'inadimplencia', status: 'em_originacao', vigenciaInicio: '2026-07-01T00:00:00.000Z',
    documentos: [], eventos: [],
  },
  {
    id: 'ct_3', empresaId: EMPRESA_ID, colaboradorId: 'col_3', colaboradorNome: 'Pedro Alves',
    imovel: 'Av. Brasil, 900 — casa 2, Rio de Janeiro/RJ', proprietario: 'M. Castro',
    imobiliaria: 'Costa Imóveis', aluguelCents: 600_000, liquidoCents: 1_140_000, taxaCents: 36_000, fundoCents: 10_800,
    escopo: 'inadimplencia_danos', status: 'ativo', vigenciaInicio: '2026-03-15T00:00:00.000Z', vigenciaFim: '2027-03-15T00:00:00.000Z',
    documentos: [
      { nome: 'Carta de garantia', tipo: 'garantia' },
      { nome: 'Contrato de locação', tipo: 'locacao' },
    ],
    eventos: [{ data: '2026-03-15T00:00:00.000Z', descricao: 'Entrada no imóvel e início do 1º ciclo.' }],
  },
  {
    id: 'ct_4', empresaId: EMPRESA_ID, colaboradorId: 'col_4', colaboradorNome: 'Sofia Ramos',
    imovel: 'A definir', proprietario: 'A definir', imobiliaria: 'Bela Imóveis',
    aluguelCents: 280_000, liquidoCents: 680_000, taxaCents: 20_000, fundoCents: 6_000,
    escopo: 'inadimplencia', status: 'em_originacao', vigenciaInicio: '2026-08-01T00:00:00.000Z',
    documentos: [], eventos: [],
  },
];

const faturas: Fatura[] = [
  {
    id: 'fat_1', empresaId: EMPRESA_ID, mesRef: '2026-06-01T00:00:00.000Z', vencimento: '2026-06-10T00:00:00.000Z',
    status: 'aberta', totalCents: 1_500_000 + 1_776_000,
    linhas: [
      { colaboradorId: 'col_1', colaboradorNome: 'João Pereira', aluguelCents: 500_000, liquidoCents: 970_000, taxaCents: 30_000, fundoCents: 9_000 },
      { colaboradorId: 'col_3', colaboradorNome: 'Pedro Alves', aluguelCents: 600_000, liquidoCents: 1_140_000, taxaCents: 36_000, fundoCents: 10_800, retencaoCents: 1_800_000 },
    ],
  },
  {
    id: 'fat_2', empresaId: EMPRESA_ID, mesRef: '2026-05-01T00:00:00.000Z', vencimento: '2026-05-10T00:00:00.000Z',
    status: 'paga', totalCents: 1_500_000 + 1_776_000,
    linhas: [
      { colaboradorId: 'col_1', colaboradorNome: 'João Pereira', aluguelCents: 500_000, liquidoCents: 970_000, taxaCents: 30_000, fundoCents: 9_000 },
      { colaboradorId: 'col_3', colaboradorNome: 'Pedro Alves', aluguelCents: 600_000, liquidoCents: 1_140_000, taxaCents: 36_000, fundoCents: 10_800 },
    ],
  },
];

const documentos: Documento[] = [
  { id: 'doc_1', empresaId: EMPRESA_ID, nome: 'Convênio B2B de roteamento', tipo: 'convênio', status: 'assinado', data: '2026-01-15T12:00:00.000Z' },
  { id: 'doc_2', empresaId: EMPRESA_ID, nome: 'Termos de uso', tipo: 'termos', status: 'assinado', data: '2026-01-15T12:00:00.000Z' },
  { id: 'doc_3', empresaId: EMPRESA_ID, nome: 'Política de privacidade (LGPD)', tipo: 'privacidade', status: 'assinado', data: '2026-01-15T12:00:00.000Z' },
];

const notificacoes: Notificacao[] = [
  { id: 'ntf_1', empresaId: EMPRESA_ID, titulo: 'Fatura de junho disponível.', lida: false, timestamp: '2026-06-01T09:00:00.000Z' },
  { id: 'ntf_2', empresaId: EMPRESA_ID, titulo: 'João Pereira: contrato ativado.', lida: true, timestamp: '2026-03-01T09:00:00.000Z' },
];

const eventos: EventoAuditoria[] = [
  { id: 'evt_1', empresaId: EMPRESA_ID, usuario: 'Admin', papel: 'admin', acao: 'convenio:assinar', entidade: 'Empresa', timestamp: '2026-01-15T12:00:00.000Z' },
  { id: 'evt_2', empresaId: EMPRESA_ID, usuario: 'Admin', papel: 'admin', acao: 'fatura:pagar', entidade: 'Fatura fat_2', timestamp: '2026-05-10T12:00:00.000Z' },
];

export const db = {
  empresas: [empresa],
  usuarios,
  credenciais,
  colaboradores,
  contratos,
  faturas,
  documentos,
  notificacoes,
  eventos,
};

export const CURRENT_EMPRESA_ID = EMPRESA_ID;
