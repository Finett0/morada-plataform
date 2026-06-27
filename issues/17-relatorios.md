# 17 — Relatórios e exportações

**Épico:** Relatórios e documentos · **Tamanho:** M · **SPEC:** §2.15, §4.7

## Descrição
Análises da carteira e exportação de dados.

## User stories
- Como Admin, quero visualizar a evolução da carteira e a economia gerada, e exportar os dados.

## Critérios de aceite
- [ ] Página `/relatorios` com seletor de período (atualiza tudo).
- [ ] Gráficos: evolução da carteira, economia gerada aos PJs, custo da empresa.
- [ ] Tabela exportável.
- [ ] Exportar em CSV e PDF do recorte atual.
- [ ] Estados de loading e vazio.
- [ ] Acesso de leitura inclui Visualizador (§1.2).

## Dependências
- 00, 01, 02
- Reusa wrapper de gráfico de 01.
