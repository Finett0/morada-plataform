# 23 — Trilha de auditoria

**Épico:** Transversais · **Tamanho:** M · **SPEC:** §1.4, §4.9

## Descrição
Registro de ações sensíveis com usuário, data/hora e contexto — exigência não-funcional do SPEC.

## User stories
- Como Admin, quero um histórico confiável de quem fez o quê (assinaturas, pagamentos, desligamentos).

## Critérios de aceite
- [ ] Serviço central de auditoria que grava: usuário, papel, ação, entidade, data/hora, contexto (e IP quando aplicável).
- [ ] Eventos auditados no mínimo: assinatura do convênio (07), cadastro/edição de PJ (10/11), desligamento (12), pagamento de fatura (16), convite/alteração/remoção de usuário (20).
- [ ] Registros imutáveis (append-only).
- [ ] Visualização de histórico por entidade (ex.: aba/seção no detalhe do PJ e do contrato).
- [ ] Exportável para conformidade.

## Dependências
- 00
- Consumido por 07, 10, 11, 12, 16, 20.
