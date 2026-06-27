# 24 — Guarda de linguagem jurídica segura

**Épico:** Transversais · **Tamanho:** P · **SPEC:** §1.4, §4.9

## Descrição
Garantir que a UI e os textos nunca usem termos securitários proibidos. É um requisito jurídico do produto (ver README §4 e §6: a cópia "entrega munição" contra a tese se usar linguagem de seguro).

## Termos proibidos
"seguro", "seguro fiança", "apólice", "segurado", "reservas técnicas".

## Termos corretos
**fiança**, **garantia**, **roteamento**, **fundo de reserva** (como reserva do fiador), **convênio**, **trava de rescisão**.

## User stories
- Como responsável jurídico, quero certeza de que nenhuma tela ou e-mail usa vocabulário de seguro.

## Critérios de aceite
- [ ] Glossário/lista canônica de termos permitidos e proibidos no repositório.
- [ ] Lint/teste automatizado que falha o build se um termo proibido aparecer em strings de UI ou templates de e-mail.
- [ ] Tooltips explicativos padronizados para "custo zero", "não-fiador", "fundo de reserva", "trava de rescisão".
- [ ] Revisão das cópias das telas-chave (onboarding, contrato, fatura, ajuda).
- [ ] Documentação para devs sobre a regra.

## Dependências
- 00, 01
- Aplica-se a 07, 14, 16, 21, 22.
