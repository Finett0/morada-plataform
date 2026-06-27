/**
 * Schemas de validação compartilhados (front e back) — Zod.
 * Usados nos forms (validação inline) e nas rotas (validação de entrada).
 */
import { z } from 'zod';

const cnpj = z
  .string()
  .transform((s) => s.replace(/\D/g, ''))
  .refine((s) => s.length === 14, 'CNPJ deve ter 14 dígitos');

const senha = z.string().min(8, 'A senha deve ter ao menos 8 caracteres');

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Informe a senha'),
});

export const signupSchema = z.object({
  razaoSocial: z.string().min(2, 'Informe o nome da empresa'),
  cnpj,
  nome: z.string().min(2, 'Informe o nome do responsável'),
  email: z.string().email('E-mail inválido'),
  password: senha,
  aceiteTermos: z.literal(true, { errorMap: () => ({ message: 'É preciso aceitar os termos' }) }),
});

export const recuperarSchema = z.object({
  email: z.string().email('E-mail inválido'),
});

export const conviteSchema = z.object({
  token: z.string().min(1),
  password: senha,
});

export const colaboradorSchema = z.object({
  nome: z.string().min(2, 'Informe o nome'),
  cnpj,
  email: z.string().email('E-mail inválido'),
  valorNotaCents: z.number().int().positive('Valor da nota inválido'),
  observacoes: z.string().optional(),
  modo: z.enum(['convite', 'dados']),
});

export const desligamentoSchema = z.object({
  dataDesligamento: z.string().min(1, 'Informe a data'),
  confirmado: z.literal(true, {
    errorMap: () => ({ message: 'Confirme o entendimento' }),
  }),
});

export const conviteUsuarioSchema = z.object({
  email: z.string().email('E-mail inválido'),
  papel: z.enum(['admin', 'financeiro', 'rh', 'visualizador']),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ColaboradorInput = z.infer<typeof colaboradorSchema>;
