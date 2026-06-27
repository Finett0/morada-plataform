# 04 — Criar conta da empresa (signup)

**Épico:** Autenticação · **Tamanho:** M · **SPEC:** §2.2, §4.1

## Descrição
Auto-cadastro da empresa, criando a conta e o primeiro usuário Admin.

## User stories
- Como fundador/RH, quero criar a conta da minha empresa para iniciar o benefício.

## Critérios de aceite
- [ ] Página `/signup` (pública) com form: nome da empresa, CNPJ, nome do responsável, e-mail corporativo, senha.
- [ ] Checkbox de aceite dos termos (obrigatório).
- [ ] Aviso de que os próximos passos são o onboarding/convênio.
- [ ] Validação: CNPJ (formato + unicidade), e-mail corporativo, força da senha.
- [ ] Ao criar: cria empresa + usuário Admin → redireciona para `/onboarding`.
- [ ] Erro claro se CNPJ/e-mail já existir.

## Dependências
- 00, 01, 02
- Encadeia com 07 (onboarding).
