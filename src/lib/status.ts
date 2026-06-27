/**
 * Mapeamento de status do domínio para rótulo + tom de badge (design.md §4).
 */
import type { BadgeTone } from '@/components/ui/Badge';
import type { ColaboradorStatus, ContratoStatus, FaturaStatus, UsuarioStatus } from './types';

export const colaboradorStatus: Record<ColaboradorStatus, { label: string; tone: BadgeTone }> = {
  em_originacao: { label: 'Em originação', tone: 'info' },
  ativo: { label: 'Ativo', tone: 'success' },
  em_desligamento: { label: 'Em desligamento', tone: 'warning' },
  desligado: { label: 'Desligado', tone: 'neutral' },
};

export const contratoStatus: Record<ContratoStatus, { label: string; tone: BadgeTone }> = {
  em_originacao: { label: 'Em originação', tone: 'info' },
  ativo: { label: 'Ativo', tone: 'success' },
  encerrado: { label: 'Encerrado', tone: 'neutral' },
};

export const faturaStatus: Record<FaturaStatus, { label: string; tone: BadgeTone }> = {
  aberta: { label: 'Aberta', tone: 'neutral' },
  paga: { label: 'Paga', tone: 'success' },
  atrasada: { label: 'Atrasada', tone: 'danger' },
};

export const usuarioStatus: Record<UsuarioStatus, { label: string; tone: BadgeTone }> = {
  ativo: { label: 'Ativo', tone: 'success' },
  pendente: { label: 'Pendente', tone: 'warning' },
};
