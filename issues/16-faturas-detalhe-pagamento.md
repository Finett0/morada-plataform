# 16 — Detalhe da fatura + pagamento + split

**Épico:** Faturas · **Tamanho:** G · **SPEC:** §2.14, §4.5

## Descrição
Detalhe da fatura consolidada com breakdown do split por colaborador e o fluxo de pagamento. Reforça a mensagem "custo incremental R$ 0".

## User stories
- Como Financeiro, quero entender o que compõe a fatura e pagá-la em um clique.

## Critérios de aceite
- [ ] Página `/faturas/:id` com **resumo** (mês, total, vencimento, status).
- [ ] **Tabela linha-a-linha por colaborador** com o split (aluguel → proprietário, líquido → PJ, taxa Morada, fundo de reserva).
- [ ] **Bloco "custo incremental da empresa: R$ 0"** com explicação.
- [ ] **Linhas especiais** de valores retidos por trava de rescisão.
- [ ] Botão "Pagar / confirmar pagamento" (modal de confirmação) — ao confirmar, status vira "paga"; o split é executado na fonte (aluguel primeiro).
- [ ] Mostra comprovante após pagamento.
- [ ] Botão "Baixar comprovante/boleto/PDF".
- [ ] Fatura atrasada gera alerta no dashboard e lembrete por e-mail.
- [ ] Pagamento restrito a Admin/Financeiro (§1.2).

## Dependências
- 00, 01, 02, 15
- 12 (linhas de retenção), 22 (lembretes), 23 (auditoria do pagamento), 24 (linguagem).
