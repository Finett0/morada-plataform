# 15 — Lista de faturas

**Épico:** Faturas · **Tamanho:** P · **SPEC:** §2.13, §4.5

## Descrição
Listagem das faturas mensais consolidadas da empresa.

## User stories
- Como Financeiro, quero ver todas as faturas e seus status de pagamento.

## Critérios de aceite
- [ ] Página `/faturas` com tabela: mês de referência, valor total, status (aberta/paga/atrasada), vencimento, ações.
- [ ] Filtros por período e status.
- [ ] Indicador da próxima fatura.
- [ ] Botão de exportar.
- [ ] Badge "atrasada" destacado.
- [ ] Linha clicável → `/faturas/:id`.

## Dependências
- 00, 01, 02
- Pareia com 16.
