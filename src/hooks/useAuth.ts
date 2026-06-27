'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api/client';
import { useToast } from '@/components/ui';
import type { Usuario } from '@/lib/types';
import type { LoginInput, SignupInput } from '@/lib/validation';

export function useLogin() {
  const qc = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (input: LoginInput) => api.post<{ user: Usuario }>('/auth/login', input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['session'] });
      router.push('/');
    },
  });
}

export function useSignup() {
  const qc = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (input: SignupInput) => api.post<{ user: Usuario }>('/auth/signup', input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['session'] });
      router.push('/onboarding');
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => api.post('/auth/logout'),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['session'] });
      router.push('/login');
    },
  });
}

export function useRecuperarSenha() {
  const toast = useToast();
  return useMutation({
    mutationFn: (email: string) => api.post('/auth/recuperar', { email }),
    onSuccess: () => toast.success('Se o e-mail existir, enviamos um link de redefinição.'),
  });
}

export function useAceitarConvite() {
  const qc = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (input: { token: string; password: string }) =>
      api.post<{ user: Usuario }>('/auth/convite', input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['session'] });
      router.push('/');
    },
  });
}
