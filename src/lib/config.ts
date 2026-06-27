/**
 * Configuração da aplicação por ambiente.
 * Lê variáveis de ambiente (ver .env.example). Nunca coloque segredos aqui.
 */
export const config = {
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? 'Morada',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? '/api',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? '5511981468513',
} as const;

export type Config = typeof config;
