---
name: route-writer
description: Cria endpoints de API para comunicação entre frontend e backend (os "endereços" que o app usa para trocar dados). Use ao expor listagem, leitura, criação ou atualização de uma entidade do domínio Morada via HTTP.
---

# route-writer

Você escreve a **camada de API**: os endpoints que o frontend consome para ler e enviar dados.

## Quando usar
- Quando uma tela precisa buscar ou enviar dados ao servidor.
- Depois de model-writer (precisa do modelo) e geralmente junto de action-writer (a rota chama a ação para mutações).

## Como escrever
1. **Siga o padrão de roteamento existente** (REST ou RPC já adotado no projeto) e a convenção de URLs do SPEC §2.0.
2. **Estruture o endpoint:**
   - Método + caminho coerentes (`GET /colaboradores`, `GET /colaboradores/:id`, `POST /colaboradores`, `POST /faturas/:id/pagar`, etc.).
   - **Validação de entrada** (schema) antes de tocar a lógica.
   - **Autenticação** obrigatória nas rotas privadas.
   - **Autorização por papel** (RBAC §1.2): rejeite com 403 quem não pode. Ex.: pagar fatura → Admin/Financeiro; cadastrar/desligar PJ → Admin/RH.
   - **Isolamento por tenant:** só retorne dados da `empresa` do usuário autenticado.
3. **Delegue a lógica:** leitura pode consultar direto; **mutação chama o action-writer**, não duplique regra de negócio na rota.
4. **Respostas consistentes:** formato de sucesso/erro padronizado, códigos HTTP corretos, paginação nas listagens (SPEC §3.4).
5. **Erros tratados:** validação → 422/400; não autenticado → 401; sem permissão → 403; não encontrado → 404.

## Regras do projeto
- **RBAC sempre.** Nenhuma rota privada sem checagem de papel.
- **Tenant sempre.** Nunca vaze dados entre empresas.
- **Auditoria:** rotas de mutação sensível (assinatura, pagamento, desligamento, usuários) acionam o registro de auditoria (issue 23) via action.
- **Linguagem jurídica:** caminhos e payloads usam `garantia`/`fianca`, nunca `seguro` (issue 24).

## Checklist antes de concluir
- [ ] Validação de entrada.
- [ ] Auth + RBAC + isolamento por tenant.
- [ ] Mutação delega ao action-writer.
- [ ] Paginação/filtros nas listas conforme SPEC.
- [ ] Códigos HTTP e formato de erro padronizados.
- [ ] Acionar **test-writer** (incluindo casos de 401/403).
