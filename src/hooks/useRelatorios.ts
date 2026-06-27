'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import type { Relatorio } from '@/server/relatorios';
import type { Documento } from '@/lib/types';

export function useRelatorio() {
  return useQuery({
    queryKey: ['relatorio'],
    queryFn: () => api.get<Relatorio>('/relatorios'),
  });
}

export function useDocumentos() {
  return useQuery({
    queryKey: ['documentos'],
    queryFn: () => api.get<{ documentos: Documento[] }>('/documentos'),
  });
}
