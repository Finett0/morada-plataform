# 02 — Modelo de papéis, permissões e controle de acesso

**Épico:** Fundação · **Tamanho:** M · **SPEC:** §1.2, §4.9

## Descrição
Implementar o controle de acesso por papel (RBAC) que rege o que cada usuário pode ver e fazer em toda a aplicação.

## Papéis (SPEC §1.2)
- **Admin da empresa:** tudo.
- **Financeiro:** ver/pagar faturas, ver relatórios. Não cadastra/desliga PJ.
- **Operador de RH:** cadastrar/convidar PJ, acompanhar onboarding, iniciar desligamento. Não paga faturas.
- **Visualizador:** somente leitura de dashboard e relatórios.

## User stories
- Como Admin, quero que cada usuário só acesse o que seu papel permite.
- Como Financeiro, não quero ver botões de cadastrar/desligar PJ.

## Critérios de aceite
- [ ] Definição central de permissões por papel.
- [ ] Guarda de rotas: acesso negado redireciona/mostra erro conforme papel.
- [ ] Componentes/ações sensíveis ficam ocultos ou desabilitados conforme papel.
- [ ] Tentativa de ação não autorizada via API retorna erro tratado.
- [ ] Helper/hook reutilizável `can(action)` para uso nas telas.
- [ ] Testes cobrindo cada papel x ações-chave (pagar fatura, cadastrar PJ, desligar, convidar usuário).

## Dependências
- 00 (setup)
- Consumido por praticamente todas as issues de feature.
