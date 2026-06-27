# 05 — Recuperação de senha

**Épico:** Autenticação · **Tamanho:** P · **SPEC:** §2.3, §4.1

## Descrição
Fluxo de redefinição de senha por e-mail.

## User stories
- Como usuário, quero redefinir minha senha quando esquecê-la.

## Critérios de aceite
- [ ] Página `/recuperar-senha` com campo de e-mail e botão "Enviar link".
- [ ] Confirmação genérica sempre exibida (não revela se o e-mail existe).
- [ ] E-mail com link de redefinição com token expirável.
- [ ] Tela de definição de nova senha (validação de força + confirmação).
- [ ] Link inválido/expirado tratado com mensagem clara.

## Dependências
- 00, 01
- 22 (notificações/e-mail) para o envio.
