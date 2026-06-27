# 22 — Sistema de notificações (in-app + e-mail)

**Épico:** Transversais · **Tamanho:** M · **SPEC:** §4.9

## Descrição
Infraestrutura de notificações consumida por várias telas: sino na topbar + e-mails transacionais.

## User stories
- Como usuário, quero ser avisado de eventos-chave por e-mail e no painel.

## Critérios de aceite
- [ ] Sino na topbar com lista de notificações e contador de não-lidas.
- [ ] E-mails para eventos-chave: PJ aprovado, fatura disponível, fatura vencendo, desligamento processado.
- [ ] Suporta também: convite de usuário (06/20), convite de PJ (10), recuperação de senha (05), contato/suporte (21).
- [ ] Respeita preferências de notificação (issue 19).
- [ ] Templates de e-mail seguem a guarda de linguagem jurídica (§1.4).
- [ ] Marcar como lida / marcar todas como lidas.

## Dependências
- 00, 01
- Consumido por 05, 06, 10, 12, 16, 19, 20, 21.
