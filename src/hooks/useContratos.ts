'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import type { Contrato } from '@/lib/types';

export function useContratos(filtros: { status?: string } = {}) {
  const params: Record<string, string> = {};
  if (filtros.status) params.status = filtros.status;
  return useQuery({
    queryKey: ['contratos', filtros],
    queryFn: () => api.get<{ contratos: Contrato[] }>('/contratos', { params }),
  });
}

export function useContrato(id: string) {
  return useQuery({
    queryKey: ['contrato', id],
    queryFn: () => api.get<{ contrato: Contrato }>(`/contratos/${id}`),
  });
}
