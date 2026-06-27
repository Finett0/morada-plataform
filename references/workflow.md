# Workflow — Plataforma da Empresa (Morada)

Como o trabalho flui: da issue ao merge. Orienta humanos e agentes que usam as skills em `../skills/`.

---

## 1. Documentos e suas funções

| Documento | Papel |
|-----------|-------|
| `../README.MD` | Tese de produto e fundamentação jurídica (o porquê). |
| `../SPEC.MD` | O que a aplicação faz (páginas, componentes, comportamentos). |
| `../issues/` | Backlog: o trabalho fatiado, com critérios de aceite. |
| `../skills/` | Como cada camada do código é escrita. |
| `references/architecture.md` | Estrutura técnica. |
| `references/design.md` | Linguagem visual e de cópia. |
| `references/workflow.md` | Este documento. |

## 2. Ciclo de vida de uma feature

```
Escolher issue ──► Branch ──► Implementar por camadas ──► Testar
      ──► Self-review ──► PR ──► Review ──► Merge
```

### 2.1 Escolher a issue
Pegue uma issue de `../issues/` respeitando dependências (fundação → auth → onboarding → features). Releia os critérios de aceite e as seções do SPEC referenciadas.

### 2.2 Branch
Nunca trabalhar direto na `main`. Padrão de nome:
```
<tipo>/<nº-issue>-<slug-curto>
ex.: feat/16-faturas-detalhe-pagamento
```
Tipos: `feat`, `fix`, `chore`, `refactor`, `test`, `docs`.

### 2.3 Implementar por camadas (ordem das skills)
Para uma feature de ponta a ponta:
```
model-writer ─► route-writer / action-writer ─► integration-writer (se houver externo)
            ─► component-writer ─► hook-writer ─► test-writer
```
Cada skill tem seu próprio checklist — siga-o. Reuse o que já existe (componentes globais, lib de rbac/audit/money) antes de criar.

### 2.4 Definition of Done (DoD)
Uma issue só fecha quando:
- [ ] Todos os critérios de aceite da issue marcados.
- [ ] **RBAC** aplicado (rota + action) e testado, incluindo o caso negado (403).
- [ ] **Isolamento por tenant** garantido.
- [ ] **Auditoria** registrada se a ação for sensível.
- [ ] **Guarda de linguagem jurídica** passa (sem termos de seguro).
- [ ] Estados de loading/vazio/erro tratados na UI.
- [ ] Testes (unit/integração/componente conforme a camada) passando.
- [ ] Lint e CI verdes.
- [ ] Cópia revisada contra `design.md`.

## 3. Commits

- Mensagens no imperativo, curtas e descritivas; uma mudança lógica por commit.
- Sugestão de prefixo Conventional Commits: `feat:`, `fix:`, `test:`, `refactor:`, `docs:`, `chore:`.
- Referencie a issue: `feat: detalhe da fatura com split (#16)`.
- **Commitar/empurrar apenas quando solicitado.**

## 4. Pull Request

- PR pequeno e focado em uma issue.
- Descrição com: o que muda, qual issue fecha, como testar, e a stack/decisão se for a issue 00.
- Checklist do DoD no corpo do PR.
- CI obrigatório verde: lint + testes + guarda de linguagem.
- Pelo menos uma revisão antes do merge.

## 5. Code review (o que olhar)

1. **Regulatório/jurídico primeiro:** linguagem (sem "seguro"), empresa nunca como fiadora, sem custódia de saldo, sem adiantamento de crédito habitual.
2. **Segurança/permissões:** RBAC, tenant, validação de entrada, nada de segredo em log/código.
3. **Correção financeira:** dinheiro em centavos, split na ordem certa, idempotência de pagamento, cálculo da trava de rescisão.
4. **Aderência ao SPEC e ao design.**
5. **Testes cobrindo bordas.**

> Ferramentas úteis: `/code-review` para revisar o diff; `/security-review` para revisão de segurança do branch.

## 6. Testes e CI

- Todo código nasce com teste (`test-writer`).
- CI roda em cada PR: **lint → testes → guarda de linguagem jurídica**.
- Testes determinísticos: integrações externas mockadas, datas fixas, sem rede real.

## 7. Ambientes e segredos

- Configuração por ambiente via variáveis; **nunca** commitar segredos.
- PSP, e-mail e assinatura sempre via camada de integração (`integration-writer`), nunca SDK direto na regra de negócio.

## 8. Quando algo não está no SPEC

Não improvise regra de produto ou jurídica. Levante a dúvida (atualizar o SPEC/issue) antes de codar — especialmente em pontos sensíveis: escopo da garantia, política do mês 1, teto de cobertura, tratamento de dados de renda (LGPD). Ver pontos em aberto no README §6.
