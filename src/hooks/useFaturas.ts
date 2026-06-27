'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { useToast } from '@/components/ui';
import type { Fatura } from '@/lib/types';

export function useFaturas(filtros: { status?: string } = {}) {
  const params: Record<string, string> = {};
  if (filtros.status) params.status = filtros.status;
  return useQuery({
    queryKey: ['faturas', filtros],
    queryFn: () => api.get<{ faturas: Fatura[] }>('/faturas', { params }),
  });
}

export function useFatura(id: string) {
  return useQuery({
    queryKey: ['fatura', id],
    queryFn: () => api.get<{ fatura: Fatura }>(`/faturas/${id}`),
  });
}

export function usePagarFatura(id: string) {
  const qc = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: () => api.post<{ fatura: Fatura }>(`/faturas/${id}/pagar`),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['fatura', id] });
      await qc.invalidateQueries({ queryKey: ['faturas'] });
      await qc.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('Fatura paga. Split executado na fonte.');
    },
  });
}
