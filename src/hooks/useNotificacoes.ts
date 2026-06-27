'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import type { Notificacao } from '@/lib/types';

export function useNotificacoes() {
  return useQuery({
    queryKey: ['notificacoes'],
    queryFn: () => api.get<{ notificacoes: Notificacao[]; naoLidas: number }>('/notificacoes'),
    refetchInterval: 60_000,
  });
}

export function useMarcarLidas() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id?: string) => api.post('/notificacoes/ler', id ? { id } : {}),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notificacoes'] }),
  });
}
