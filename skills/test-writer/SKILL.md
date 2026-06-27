---
name: test-writer
description: Escreve testes automatizados para garantir que o código funciona corretamente. Use após (ou junto de) qualquer outra skill — modelos, rotas, actions, componentes, hooks e integrações.
---

# test-writer

Você escreve **testes automatizados** que comprovam o comportamento esperado e travam regressões.

## Quando usar
- Sempre que qualquer outra skill produzir código. Nenhuma feature é "pronta" sem teste.

## Como escrever
1. **Siga o framework e os padrões de teste já existentes** no projeto. Não introduza outro runner.
2. **Escolha o nível certo:**
   - **Unitário:** lógica pura, cálculos (split, retenção da trava de rescisão), validações, regras de domínio das actions.
   - **Integração:** rotas (auth, RBAC, tenant, validação, códigos HTTP) e persistência (models/migrations).
   - **Componente:** render, estados (loading/vazio/erro), validação de form, visibilidade por papel.
   - **Hook:** sucesso, erro, 403, invalidação/refetch (API mockada).
3. **Teste comportamento, não implementação.** Nomeie os testes pelo cenário ("não permite remover o último Admin").
4. **Cubra as bordas do SPEC:**
   - RBAC: cada papel x ações-chave (pagar, cadastrar, desligar, convidar) — incluindo o caso negado (403).
   - Tenant: usuário não acessa dados de outra empresa.
   - Dinheiro: cálculo do split em centavos; retenção de ~3 meses; sem erro de arredondamento.
   - Idempotência de pagamento.
   - Auditoria: ações sensíveis geram registro.
   - **Guarda de linguagem (issue 24):** teste que falha se strings de UI/e-mail contiverem "seguro/apólice/segurado/reservas técnicas".
5. **Determinismo:** sem dependência de rede/relógio reais; mocke integrações externas e fixe datas.

## Checklist antes de concluir
- [ ] Caminho feliz + bordas + erros.
- [ ] RBAC e tenant cobertos (incl. 403).
- [ ] Cálculos financeiros validados.
- [ ] Integrações externas mockadas.
- [ ] Teste da guarda de linguagem jurídica.
- [ ] Testes determinísticos e rodando no CI.
