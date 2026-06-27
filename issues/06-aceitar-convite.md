# 06 — Aceitar convite de usuário

**Épico:** Autenticação · **Tamanho:** P · **SPEC:** §2.4, §4.1

## Descrição
Permitir que um usuário convidado defina senha e entre na empresa já existente com o papel atribuído.

## User stories
- Como pessoa convidada, quero aceitar o convite e acessar o painel da empresa.

## Critérios de aceite
- [ ] Página `/convite/:token` com e-mail e papel pré-preenchidos (read-only).
- [ ] Campo de senha + botão "Aceitar e entrar".
- [ ] Token inválido/expirado tratado com mensagem clara.
- [ ] Ao aceitar: cria/ativa o usuário com o papel definido e autentica.
- [ ] Usuário passa de "pendente" para "ativo" na lista de usuários (issue 20).

## Dependências
- 00, 01, 02
- Pareia com 20 (convite parte da tela de configurações).
