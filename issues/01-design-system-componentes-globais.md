# 01 — Design system e componentes globais de layout

**Épico:** Fundação · **Tamanho:** G · **SPEC:** §3.1, §3.3, §3.5, §3.6

## Descrição
Construir a biblioteca de componentes reutilizáveis e o shell de layout usados em todas as páginas autenticadas. É a base visual de todo o resto.

## User stories
- Como usuário, quero uma navegação consistente (sidebar + topbar) em todas as telas.
- Como dev, quero componentes prontos (botões, modais, tabelas, toasts) para montar páginas rápido.

## Critérios de aceite
- [ ] **Sidebar de navegação:** logo, links (Dashboard, Colaboradores, Contratos, Faturas, Relatórios, Documentos, Configurações, Ajuda), badge de pendências.
- [ ] **Topbar:** nome da empresa, seletor de usuário, sino de notificações (placeholder), menu de conta (perfil, sair).
- [ ] **Banner "custo zero"** com tooltip explicativo (reutilizável).
- [ ] **Banner de status do convênio** (ativo/pendente + CTA).
- [ ] **Toast/notificação** (sucesso/erro/info, auto-dismiss).
- [ ] **Modal de confirmação** (título, descrição, confirmar/cancelar).
- [ ] **Empty state**, **Loader/skeleton**, **Paginação**, **Breadcrumb**.
- [ ] **Botões** nas variantes primário/secundário/destrutivo (§3.3).
- [ ] **Badge de status** (ativo, em originação, thin file, desligado, atrasado).
- [ ] **Tooltip explicativo** reutilizável.
- [ ] **Componente de tabela** genérico (ordenação, paginação, estado vazio).
- [ ] **Cards de KPI** e wrapper de **gráfico** (base para dashboard/relatórios).
- [ ] **Stepper** e **Timeline** (base para onboarding e originação).
- [ ] Componentes acessíveis (foco, teclado, labels) e responsivos.

## Dependências
- 00 (setup)
