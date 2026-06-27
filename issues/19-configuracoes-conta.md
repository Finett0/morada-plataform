# 19 — Configurações: empresa, faturamento, notificações, segurança

**Épico:** Configurações e suporte · **Tamanho:** M · **SPEC:** §2.17, §4.8

## Descrição
Administração da conta da empresa (exceto gestão de usuários, que é a issue 20).

## User stories
- Como Admin, quero manter os dados da empresa, o faturamento e minha segurança em dia.

## Critérios de aceite
- [ ] Página `/configuracoes` com abas.
- [ ] **Empresa:** razão social, CNPJ, endereço, logo — editar e salvar (validação).
- [ ] **Faturamento:** método de pagamento, dia de vencimento, e-mail do financeiro — editar (pode exigir reconfirmação).
- [ ] **Notificações:** preferências de e-mail/alertas.
- [ ] **Segurança:** trocar senha, ativar 2FA, encerrar sessões ativas.
- [ ] Acesso restrito conforme papel (§1.2).

## Dependências
- 00, 01, 02
- 22 (preferências de notificação).
