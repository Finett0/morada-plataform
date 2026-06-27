# 07 — Wizard de onboarding (KYC + faturamento + convênio)

**Épico:** Onboarding · **Tamanho:** G · **SPEC:** §2.5, §4.2

## Descrição
Wizard que leva a empresa de "conta criada" a "benefício ativo". É o gargalo de ativação e o ponto onde o escudo jurídico aparece (cláusula de não-fiador, trava de rescisão).

## User stories
- Como Admin, quero completar o onboarding e ativar o benefício para começar a cadastrar PJs.

## Critérios de aceite
- [ ] Página `/onboarding` (acesso Admin, enquanto empresa não ativada) com **stepper** de progresso.
- [ ] **Etapa 1 — KYC:** razão social, CNPJ, endereço, representante legal, upload de documentos.
- [ ] **Etapa 2 — Faturamento:** método de pagamento da fatura consolidada, dia de vencimento, e-mail do financeiro.
- [ ] **Etapa 3 — Convênio:** visualizador do convênio B2B com **trava de rescisão** e **cláusula de não-fiador** em destaque + assinatura eletrônica.
- [ ] **Etapa 4 — Confirmação:** resumo + "Benefício ativado" + CTA "Cadastrar primeiro colaborador".
- [ ] Avançar valida a etapa atual; voltar não perde dados; rascunho salvo se incompleto.
- [ ] "Assinar" só habilita após visualizar o documento completo e marcar aceite.
- [ ] Assinatura registra usuário, data/hora e IP; convênio marcado como ativo.
- [ ] Concluir libera o painel completo (rotas autenticadas).

## Dependências
- 00, 01, 02, 04
- 23 (auditoria) para o registro da assinatura.
