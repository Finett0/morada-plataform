---
name: model-writer
description: Define como os dados são organizados no banco de dados (entidades, campos, relações, migrations). Use ao criar ou alterar a estrutura de dados de uma entidade do domínio Morada (empresa, usuário, colaborador PJ, contrato/garantia, fatura, documento, evento de auditoria).
---

# model-writer

Você escreve a **camada de dados**: as entidades persistidas, seus campos, tipos, relações, índices e migrations.

## Quando usar
- Ao iniciar uma feature que precisa guardar algo novo.
- Ao adicionar campos/relações a uma entidade existente.
- Sempre **antes** de route-writer e action-writer (eles dependem do modelo).

## Entidades do domínio (SPEC §1, §2)
`Empresa`, `Usuario` (com `papel`), `ConviteUsuario`, `ColaboradorPJ`, `Contrato`/`Garantia`, `EtapaOriginacao` (timeline de 8 passos), `Fatura`, `LinhaFatura` (split por colaborador), `Documento`, `EventoAuditoria`, `Notificacao`.

## Como escrever
1. **Localize o padrão existente.** Leia models já criados e siga o mesmo ORM, naming e estilo de migration. Não introduza uma nova abordagem sem necessidade.
2. **Modele a entidade:**
   - Chave primária, timestamps (`created_at`/`updated_at`).
   - Campos com tipos precisos. Valores monetários em **inteiro de centavos** (nunca float).
   - Enums para status (`em_originacao`, `ativo`, `em_desligamento`, `desligado`; fatura: `aberta`, `paga`, `atrasada`).
   - Relações explícitas (FK) com `on delete` pensado.
   - Índices nos campos de busca/filtro do SPEC (status, CNPJ, mês de referência).
3. **Escreva a migration** correspondente (up e down).
4. **Multi-tenant:** quase tudo pertence a uma `Empresa` — inclua `empresa_id` e garanta isolamento por tenant.
5. **Soft delete / append-only** onde fizer sentido: `EventoAuditoria` é **append-only** (issue 23).

## Regras do projeto
- **Linguagem jurídica:** nomeie como `garantia`/`fianca`, **nunca** `seguro`/`apolice`/`segurado` (issue 24).
- **Papel** do usuário é um enum: `admin`, `financeiro`, `rh`, `visualizador` (SPEC §1.2).
- **Split** é dado derivado/registrado em `LinhaFatura`: aluguel (ao proprietário), líquido (ao PJ), taxa (Morada), fundo de reserva.
- Marque `thin_file` em `ColaboradorPJ`.

## Checklist antes de concluir
- [ ] Tipos corretos; dinheiro em centavos.
- [ ] `empresa_id` e isolamento por tenant.
- [ ] Enums de status conforme SPEC.
- [ ] Índices para os filtros/buscas das telas.
- [ ] Migration up/down testada.
- [ ] Nenhum termo de seguro nos nomes.
- [ ] Acionar **test-writer** para o modelo.
