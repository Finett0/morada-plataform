'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { can, type Permission } from '@/lib/rbac';
import type { Usuario } from '@/lib/types';

export interface SessionData {
  authenticated: boolean;
  user?: Usuario;
  permissions?: Permission[];
  empresa?: { id: string; razaoSocial: string; beneficioAtivo: boolean };
}

export function useSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: () => api.get<SessionData>('/session'),
  });
}

/** Helper de permissão para a UI (esconder/desabilitar). */
export function usePermissions() {
  const { data } = useSession();
  const papel = data?.user?.papel;
  return {
    papel,
    can: (permission: Permission) => (papel ? can(papel, permission) : false),
  };
}
