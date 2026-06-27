# 09 — Lista de colaboradores PJ

**Épico:** Colaboradores PJ · **Tamanho:** M · **SPEC:** §2.7, §4.3

## Descrição
Listagem e gerenciamento de todos os PJs vinculados ao benefício.

## User stories
- Como RH, quero ver todos os colaboradores e o estágio de cada contrato.

## Critérios de aceite
- [ ] Página `/colaboradores` com barra de busca + filtros (status, status de originação, thin file).
- [ ] Tabela: nome, CNPJ/MEI, status, status do contrato, valor da fatura, ações.
- [ ] Badge "thin file" quando aplicável.
- [ ] Botão "Cadastrar colaborador" (visível só a quem tem permissão).
- [ ] Paginação e estado vazio com CTA.
- [ ] Linha clicável → detalhe (`/colaboradores/:id`).

## Dependências
- 00, 01, 02
- Pareia com 10, 11.
