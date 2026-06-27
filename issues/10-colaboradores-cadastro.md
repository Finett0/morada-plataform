# 10 — Cadastrar/convidar colaborador PJ

**Épico:** Colaboradores PJ · **Tamanho:** M · **SPEC:** §2.8, §4.3

## Descrição
Fluxo para iniciar a inclusão de um PJ no benefício, disparando a originação.

## User stories
- Como RH, quero cadastrar ou convidar um PJ para que a originação comece.

## Critérios de aceite
- [ ] Página `/colaboradores/novo` com form: nome, CNPJ, e-mail, valor da nota mensal, observações.
- [ ] Seletor de modo: "convidar por e-mail" vs "preencher dados".
- [ ] Aviso de elegibilidade.
- [ ] Aviso de que a **subscrição e o KYC da imobiliária ficam do lado da Morada** (originação mais lenta) — expectativa honesta.
- [ ] Validação de CNPJ e valor da nota.
- [ ] Ao cadastrar: cria PJ com status **"em originação"** e inicia a **timeline de 8 passos**.
- [ ] Modo "convite" dispara e-mail ao PJ; modo "dados" cria o registro direto.
- [ ] Botão "Reenviar convite" disponível (toast de confirmação).
- [ ] Restrito a Admin/RH (§1.2).

## Dependências
- 00, 01, 02
- 22 (e-mail de convite), 23 (auditoria).
