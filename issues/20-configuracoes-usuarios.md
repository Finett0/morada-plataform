# 20 — Configurações: gestão de usuários e papéis

**Épico:** Configurações e suporte · **Tamanho:** M · **SPEC:** §2.17, §4.8

## Descrição
Gestão dos usuários da empresa e seus papéis dentro do painel de configurações.

## User stories
- Como Admin, quero convidar colegas e definir o que cada um pode fazer.

## Critérios de aceite
- [ ] Aba "Usuários e papéis" em `/configuracoes` com tabela: nome, e-mail, papel, status, ações.
- [ ] **Convidar usuário:** form (e-mail, papel) → envia convite → aparece como "pendente" até aceite.
- [ ] **Alterar papel** de um usuário (modal de confirmação).
- [ ] **Remover usuário** (modal); **não permite remover o último Admin**.
- [ ] Reenviar/cancelar convite pendente.
- [ ] Restrito a Admin (§1.2).

## Dependências
- 00, 01, 02
- Pareia com 06 (aceite de convite), 22 (e-mail), 23 (auditoria).
