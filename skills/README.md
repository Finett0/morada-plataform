# Skills — Plataforma da Empresa (Morada)

Coleção de skills que padronizam como cada camada do código é escrita neste projeto.
Cada pasta contém um `SKILL.md` com instruções para gerar aquele tipo de artefato.

Fonte de verdade do produto: `../SPEC.MD`, `../README.MD` e o backlog em `../issues/`.

## Skills disponíveis

| Skill | Faz | Camada |
|-------|-----|--------|
| [model-writer](./model-writer/SKILL.md) | Define como os dados são organizados no banco | Dados |
| [route-writer](./route-writer/SKILL.md) | Cria endpoints de API (frontend ↔ backend) | API |
| [action-writer](./action-writer/SKILL.md) | Processa ações do usuário no servidor (salvar ao "Enviar") | Servidor |
| [component-writer](./component-writer/SKILL.md) | Cria os elementos visuais da interface | UI |
| [hook-writer](./hook-writer/SKILL.md) | Liga a interface às ações do servidor (o "fio") | UI ↔ Servidor |
| [integration-writer](./integration-writer/SKILL.md) | Conecta a serviços externos (e-mail, pagamentos, APIs) | Integrações |
| [test-writer](./test-writer/SKILL.md) | Escreve testes automatizados | Qualidade |

## Ordem típica ao implementar uma feature
`model-writer` → `route-writer`/`action-writer` → `integration-writer` (se houver serviço externo) → `component-writer` → `hook-writer` → `test-writer`.

## Regras do projeto que TODA skill respeita
1. **Guarda de linguagem jurídica** (SPEC §1.4, issue 24): nunca usar "seguro", "apólice", "segurado", "reservas técnicas" em código, strings, nomes ou comentários. Usar **fiança**, **garantia**, **roteamento**, **fundo de reserva**, **convênio**, **trava de rescisão**.
2. **RBAC** (SPEC §1.2, issue 02): toda ação/endpoint valida o papel do usuário (Admin, Financeiro, RH, Visualizador).
3. **Auditoria** (SPEC §1.4, issue 23): ações sensíveis (assinatura, pagamento, desligamento, gestão de usuários) registram usuário, data/hora e contexto.
4. **Custo zero**: a UI nunca sugere que a empresa tem custo incremental; a empresa nunca é fiadora.
