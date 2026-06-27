'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import type { EventoAuditoria } from '@/lib/types';

export function useAuditoria() {
  return useQuery({
    queryKey: ['auditoria'],
    queryFn: () => api.get<{ eventos: EventoAuditoria[] }>('/auditoria'),
  });
}
