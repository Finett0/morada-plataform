# 00 — Setup do projeto e infraestrutura base

**Épico:** Fundação · **Tamanho:** M · **SPEC:** §1.3, §1.4

## Descrição
Estruturar o repositório da aplicação web (Plataforma da Empresa), com toolchain, roteamento, camada de dados/API e padrões que sustentam todas as demais issues.

## User stories
- Como dev, quero um esqueleto de projeto rodando localmente para começar a construir as telas.
- Como dev, quero uma estrutura de rotas que cubra o mapa de navegação do SPEC §2.0.

## Critérios de aceite
- [ ] Projeto inicializa e roda em ambiente local com um comando.
- [ ] Estrutura de pastas definida (páginas, componentes, serviços/API, hooks, estilos, testes).
- [ ] Roteador configurado com as rotas públicas, de onboarding e autenticadas do §2.0 (placeholders).
- [ ] Layout-shell com área para sidebar + topbar nas rotas autenticadas.
- [ ] Cliente HTTP/serviço de API central com tratamento de erro e estado de loading padronizados.
- [ ] Variáveis de ambiente e configuração separadas por ambiente.
- [ ] Lint, formatação e setup de testes configurados; CI mínimo rodando lint + testes.

## Notas
- Não implementar telas reais aqui — só placeholders e a "casca".
- Decidir e documentar stack no PR (framework, gerenciamento de estado, libs de UI).

## Dependências
Nenhuma (issue base).
