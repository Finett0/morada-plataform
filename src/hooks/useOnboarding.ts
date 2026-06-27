'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api/client';

export function useAtivarBeneficio() {
  const qc = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (input: { endereco?: string }) => api.post('/onboarding/ativar', input),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['session'] });
      router.push('/');
    },
  });
}
