'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api/client';
import { useToast } from '@/components/ui';
import type { ColaboradorPJ, Contrato } from '@/lib/types';
import type { ColaboradorInput } from '@/lib/validation';

export function useColaboradores(filtros: { busca?: string; status?: string } = {}) {
  const params: Record<string, string> = {};
  if (filtros.busca) params.busca = filtros.busca;
  if (filtros.status) params.status = filtros.status;
  return useQuery({
    queryKey: ['colaboradores', filtros],
    queryFn: () => api.get<{ colaboradores: ColaboradorPJ[] }>('/colaboradores', { params }),
  });
}

export interface ColaboradorDetalhe {
  colaborador: ColaboradorPJ;
  contrato?: Contrato;
  desligamento: { retencaoCents: number; aluguelCents: number };
}

export function useColaborador(id: string) {
  return useQuery({
    queryKey: ['colaborador', id],
    queryFn: () => api.get<ColaboradorDetalhe>(`/colaboradores/${id}`),
  });
}

export function useCriarColaborador() {
  const qc = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  return useMutation({
    mutationFn: (input: ColaboradorInput) =>
      api.post<{ colaborador: ColaboradorPJ }>('/colaboradores', input),
    onSuccess: async ({ colaborador }) => {
      await qc.invalidateQueries({ queryKey: ['colaboradores'] });
      toast.success('Colaborador cadastrado. Originação iniciada.');
      router.push(`/colaboradores/${colaborador.id}`);
    },
  });
}

export function useDesligarColaborador(id: string) {
  const qc = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  return useMutation({
    mutationFn: (input: { dataDesligamento: string; confirmado: true }) =>
      api.post(`/colaboradores/${id}/desligar`, input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['colaborador', id] });
      await qc.invalidateQueries({ queryKey: ['colaboradores'] });
      await qc.invalidateQueries({ queryKey: ['faturas'] });
      toast.success('Desligamento iniciado. Trava de rescisão acionada.');
      router.push(`/colaboradores/${id}`);
    },
  });
}
