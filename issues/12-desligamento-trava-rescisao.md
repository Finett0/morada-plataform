# 12 — Desligamento com trava de rescisão

**Épico:** Colaboradores PJ · **Tamanho:** M · **SPEC:** §2.10, §4.4

## Descrição
Fluxo de desligamento de um PJ acionando a trava de rescisão (retenção da última fatura para cobrir ~3 meses). Ponto sensível: reforçar que a empresa não é fiadora.

## User stories
- Como RH, quero desligar um PJ com segurança jurídica e ver o impacto na fatura.

## Critérios de aceite
- [ ] Página `/colaboradores/:id/desligar` com explicação da trava de rescisão (retém última fatura, cobre ~3 meses até a desocupação).
- [ ] Campo de data de desligamento.
- [ ] Resumo do valor retido e data de desocupação prevista (calculado).
- [ ] Checkbox de confirmação com aviso de que **a empresa não é fiadora**.
- [ ] Botão "Confirmar desligamento" (modal de confirmação).
- [ ] Ao confirmar: marca PJ como **"em desligamento"**, aciona retenção na próxima fatura (linha especial), registra na auditoria, notifica Morada e partes.
- [ ] "Cancelar desligamento" possível enquanto não efetivado (reverte status).
- [ ] Restrito a Admin/RH (§1.2).

## Dependências
- 00, 01, 02, 11
- 16 (linha de retenção na fatura), 22 (notificação), 23 (auditoria).
