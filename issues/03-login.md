# 03 — Login

**Épico:** Autenticação · **Tamanho:** M · **SPEC:** §2.1, §4.1

## Descrição
Tela e fluxo de autenticação do usuário da empresa.

## User stories
- Como usuário, quero entrar com e-mail e senha para acessar o painel.

## Critérios de aceite
- [ ] Página `/login` (pública) com logo, form (e-mail, senha), botão "Entrar".
- [ ] Links "Esqueci minha senha" e "Criar conta da empresa".
- [ ] Banner de erro para credenciais inválidas.
- [ ] Validação inline de e-mail/senha; submit desabilitado se inválido.
- [ ] Sucesso redireciona para `/` (ou `/onboarding` se a empresa não estiver ativa).
- [ ] Bloqueio temporário após N tentativas falhas.
- [ ] Sessão persistida; "Sair" encerra e volta ao `/login`.

## Dependências
- 00, 01, 02
