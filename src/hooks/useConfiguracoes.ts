'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { useToast } from '@/components/ui';
import type { Empresa, Papel, Usuario } from '@/lib/types';

export function useUsuarios() {
  return useQuery({
    queryKey: ['usuarios'],
    queryFn: () => api.get<{ usuarios: Usuario[] }>('/usuarios'),
  });
}

export function useConvidarUsuario() {
  const qc = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (input: { email: string; papel: Papel }) =>
      api.post<{ usuario: Usuario }>('/usuarios', input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['usuarios'] });
      toast.success('Convite enviado.');
    },
  });
}

export function useAlterarPapel() {
  const qc = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: ({ id, papel }: { id: string; papel: Papel }) =>
      api.patch<{ usuario: Usuario }>(`/usuarios/${id}`, { papel }),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['usuarios'] });
      toast.success('Papel atualizado.');
    },
  });
}

export function useRemoverUsuario() {
  const qc = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/usuarios/${id}`),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['usuarios'] });
      toast.success('Usuário removido.');
    },
  });
}

export function useEmpresa() {
  return useQuery({
    queryKey: ['empresa'],
    queryFn: () => api.get<{ empresa: Empresa }>('/empresa'),
  });
}

export function useAtualizarEmpresa() {
  const qc = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (input: { razaoSocial?: string; endereco?: string }) =>
      api.patch<{ empresa: Empresa }>('/empresa', input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['empresa'] });
      await qc.invalidateQueries({ queryKey: ['session'] });
      toast.success('Dados salvos.');
    },
  });
}
