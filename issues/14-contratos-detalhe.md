# 14 — Detalhe do contrato (garantia + locação + split)

**Épico:** Contratos · **Tamanho:** M · **SPEC:** §2.12, §4.6

## Descrição
Visão completa de um contrato: garantia, locação, split e escopo da cobertura. Clareza sobre escopo evita disputa na saída.

## User stories
- Como Admin, quero ver exatamente o que a garantia cobre e como o aluguel é dividido.

## Critérios de aceite
- [ ] Página `/contratos/:id` com resumo do contrato.
- [ ] Dados do imóvel, proprietário e imobiliária.
- [ ] **Breakdown do split** (aluguel → proprietário primeiro, líquido → PJ, taxa, fundo).
- [ ] **Escopo da garantia** exibido de forma cristalina (cobre só inadimplência? danos?).
- [ ] Documentos: carta de garantia, contrato de locação, termo de aceite da imobiliária (download).
- [ ] Histórico de eventos: renovação (reajuste anual na fatura, sem papelada nova), portabilidade, saída organizada.

## Dependências
- 00, 01, 02, 13
- 18 (documentos), 24 (linguagem jurídica).
