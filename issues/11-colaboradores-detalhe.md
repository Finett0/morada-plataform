# 11 — Detalhe do colaborador + timeline de originação

**Épico:** Colaboradores PJ · **Tamanho:** G · **SPEC:** §2.9, §4.3

## Descrição
Visão completa de um PJ: dados, estágio do contrato e a timeline de originação (8 passos), o coração da expectativa do cliente.

## User stories
- Como RH, quero acompanhar em que passo a originação de cada PJ está e o que está bloqueando.

## Critérios de aceite
- [ ] Página `/colaboradores/:id` com cabeçalho (nome, CNPJ, status, badge "thin file").
- [ ] **Timeline de originação (8 passos):** elegibilidade → KYC imobiliária → subscrição → carta de garantia → assinaturas → convênio de roteamento → split → 1º ciclo.
- [ ] Cada passo mostra status (concluído/atual/pendente/bloqueado); passos bloqueados mostram motivo e quem precisa agir.
- [ ] **Bloco do contrato/garantia** vinculado com link para `/contratos/:id`.
- [ ] **Bloco financeiro:** valor da nota + split (aluguel/líquido/taxa/fundo).
- [ ] **Documentos do colaborador.**
- [ ] Ações: editar, reenviar convite, **iniciar desligamento** (conforme papel).
- [ ] Editar PJ valida campos; CNPJ pode exigir reabrir subscrição (aviso).

## Dependências
- 00, 01, 02, 09, 10
- Linka 12 (desligamento), 14 (contrato).
