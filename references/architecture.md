# Architecture — Plataforma da Empresa (Morada)

Referência técnica de como a aplicação é estruturada. Orienta as skills em `../skills/` e as issues em `../issues/`.
Fonte de produto: `../SPEC.MD` e `../README.MD`.

> **Status da stack:** ✅ **decidida na issue 00.** Next.js 14 (App Router) + TypeScript, Prisma + PostgreSQL, Zod, TanStack Query, Vitest + Testing Library, ESLint + Prettier. CI em `.github/workflows/ci.yml` (lint + typecheck + test).

---

## 1. Visão geral

Aplicação **web B2B multi-tenant**: cada empresa é um tenant isolado; usuários pertencem a uma empresa e têm um papel (Admin, Financeiro, RH, Visualizador). A plataforma é **camada de tecnologia** — orquestra dados e fluxos, mas **não custodia recursos**: pagamentos e split passam por **PSP licenciado** (ver §6 e README §4).

```
┌──────────────────────────────────────────────────────────┐
│  Browser (UI)                                             │
│  components ── hooks ── (HTTP) ──►  API                   │
└──────────────────────────────────────────────────────────┘
                                       │
┌──────────────────────────────────────────────────────────┐
│  Backend                                                  │
│  routes ──► actions (regra de negócio) ──► models (DB)    │
│                 │                                          │
│                 ├──► integrations (PSP, e-mail, e-sign)   │
│                 └──► audit / notifications                │
└──────────────────────────────────────────────────────────┘
        │                        │
   PSP licenciado          Banco de dados
   (pagamentos/split)      (multi-tenant)
```

## 2. Camadas (mapeiam 1:1 com as skills)

| Camada | Responsabilidade | Skill |
|--------|------------------|-------|
| **models** | Estrutura de dados, relações, migrations | `model-writer` |
| **routes** | Endpoints HTTP, validação de entrada, auth, RBAC, tenant | `route-writer` |
| **actions** | Regra de negócio / casos de uso (mutações) | `action-writer` |
| **integrations** | Serviços externos (PSP, e-mail, assinatura) | `integration-writer` |
| **components** | UI visual, sem fetch | `component-writer` |
| **hooks** | Cola UI ↔ API, estado assíncrono | `hook-writer` |
| **tests** | Testes de todas as camadas | `test-writer` |

**Regra de dependência:** a UI nunca fala direto com o banco; rotas nunca contêm regra de negócio (delegam a actions); actions nunca chamam SDK de terceiro direto (passam por integrations).

## 3. Stack recomendada (a confirmar na issue 00)

- **Frontend:** React + TypeScript, roteamento SPA, biblioteca de data-fetching com cache (ex.: TanStack Query) consumida pelos hooks.
- **Backend:** TypeScript (Node) com framework HTTP enxuto **ou** monólito full-stack (ex.: Next.js) — decidir na 00. Validação de schema compartilhada front/back (ex.: Zod).
- **Banco:** PostgreSQL com ORM tipado (ex.: Prisma/Drizzle) e migrations versionadas.
- **Auth:** sessão/JWT + hashing forte de senha; 2FA opcional (SPEC §2.17).
- **Testes:** runner único (ex.: Vitest/Jest) + testes de integração de API + testes de componente.
- **CI:** lint + testes + a guarda de linguagem jurídica (ver §7) em todo PR.

> Princípio: **uma** abordagem por camada. Não misturar libs concorrentes.

## 4. Estrutura de pastas (proposta)

```
app/
├── models/            # entidades + migrations  (model-writer)
├── routes/            # endpoints HTTP          (route-writer)
├── actions/           # casos de uso            (action-writer)
├── integrations/      # adaptadores externos    (integration-writer)
├── components/        # UI                       (component-writer)
│   ├── global/        #   sidebar, topbar, banners, modal, tabela...
│   └── <feature>/
├── hooks/             # data-fetching/mutations  (hook-writer)
├── lib/               # auth, rbac, audit, money, legal-guard
└── tests/             # ou colocados ao lado de cada arquivo
```

## 5. Modelo de domínio (entidades centrais)

`Empresa` 1—N `Usuario` (papel) · `Empresa` 1—N `ColaboradorPJ` 1—1 `Contrato`/`Garantia` · `Contrato` 1—N `EtapaOriginacao` (timeline de 8 passos) · `Empresa` 1—N `Fatura` 1—N `LinhaFatura` (split por colaborador) · `Documento`, `EventoAuditoria` (append-only), `Notificacao`, `ConviteUsuario`.

**Convenções de dados:**
- Valores monetários em **inteiro de centavos** (nunca float).
- `empresa_id` em toda entidade de tenant; isolamento garantido na camada de rota/action.
- Enums de status conforme SPEC (originação, contrato, fatura).
- Nomenclatura `garantia`/`fianca` — **nunca** `seguro` (ver §7).

## 6. Pagamentos e o split (limites regulatórios)

- A plataforma **não custodia saldos** fora do PSP (risco BACEN — README §4).
- **Não adiantar aluguel** com capital próprio de forma habitual (configuraria crédito).
- **Split na fonte**, sempre nesta ordem: **aluguel → proprietário (primeiro)**, líquido → PJ, taxa → Morada, fundo de reserva.
- Pagamentos **idempotentes** (chave de idempotência); confirmação via webhook validado.
- **Fundo de reserva** modelado como **reserva do fiador** — nunca "reservas técnicas".

## 7. Cross-cutting (preocupações transversais)

| Preocupação | Onde vive | Issue |
|-------------|-----------|-------|
| **RBAC** (4 papéis) | `lib/rbac`, validado em rota **e** action | 02 |
| **Auditoria** (append-only) | `lib/audit`, chamada pelas actions sensíveis | 23 |
| **Guarda de linguagem jurídica** | `lib/legal-guard` + lint/teste no CID | 24 |
| **Notificações** (in-app + e-mail) | integração + serviço | 22 |
| **Multi-tenant** | helper de escopo por `empresa_id` | — |
| **LGPD** | base legal e mínimo necessário em dados de renda/identidade | README §6 |

**Guarda de linguagem:** lista canônica de termos proibidos (`seguro`, `seguro fiança`, `apólice`, `segurado`, `reservas técnicas`) versus permitidos (`fiança`, `garantia`, `roteamento`, `fundo de reserva`, `convênio`, `trava de rescisão`). Um teste de CI falha o build se um termo proibido aparecer em strings de UI ou templates de e-mail.

## 8. Fluxo de uma requisição (exemplo: pagar fatura)

1. Usuário (Financeiro) clica "Pagar" → modal de confirmação (component).
2. `usePagarFatura` (hook) → `POST /faturas/:id/pagar` (route).
3. Route valida auth + papel (Financeiro/Admin) + tenant → chama `pagarFatura` (action).
4. Action: revalida estado (`fatura.aberta`), transação, dispara split via integração de pagamento (idempotente), registra auditoria.
5. PSP confirma via webhook → action atualiza status para `paga`.
6. Hook invalida cache → UI mostra comprovante + toast.

## 9. Não-funcionais

Segurança (auth forte, sem segredos em log/repo, validação de entrada), acessibilidade (teclado/foco/labels), performance (paginação nas listas, índices no DB), observabilidade (logs estruturados sem dados sensíveis), e **estado honesto** na UI de originação (sem prometer instantaneidade — SPEC §1.4).
