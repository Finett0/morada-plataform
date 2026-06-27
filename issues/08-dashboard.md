# 08 — Dashboard com KPIs e pendências

**Épico:** Dashboard · **Tamanho:** M · **SPEC:** §2.6

## Descrição
Tela inicial pós-login com a visão geral da carteira de benefícios da empresa.

## User stories
- Como Admin/RH, quero ver de relance o status da carteira e o que precisa da minha ação.

## Critérios de aceite
- [ ] Página `/` com **cards de KPI:** colaboradores ativos, contratos ativos, contratos em originação, **custo incremental R$ 0** (fixo + explicado), economia total gerada aos PJs.
- [ ] **Banner de status do convênio** (ativo/pendência).
- [ ] **Lista de pendências/ações** (ex.: PJ aguardando documento, fatura a aprovar) com link para a entidade.
- [ ] **Tabela "próximos vencimentos"** (fatura do mês).
- [ ] **Atalhos:** cadastrar PJ, ver fatura.
- [ ] Estados de loading (skeleton) e vazio.
- [ ] Conteúdo respeita o papel do usuário (§1.2).

## Dependências
- 00, 01, 02
- Consome dados de 09, 13, 15.
