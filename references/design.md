# Design — Plataforma da Empresa (Morada)

Referência de design e linguagem de interface. Orienta o `component-writer` e toda cópia de tela.
Fonte de produto: `../SPEC.MD` (§3 componentes, §4 comportamentos) e `../README.MD`.

---

## 1. Princípios

1. **Confiança acima de tudo.** É um produto financeiro/jurídico B2B. Visual sóbrio, limpo, previsível — nada "fintech barulhenta".
2. **Custo zero, sempre visível.** Telas de fatura/custo deixam explícito: *custo incremental da empresa = R$ 0*, com tooltip que explica que a taxa sai do lado do PJ.
3. **Estado honesto.** A originação é lenta e fica do lado da Morada — a UI mostra isso com clareza, sem prometer instantaneidade.
4. **A empresa nunca é fiadora.** Nenhum texto, ícone ou fluxo sugere o contrário.
5. **Clareza > densidade.** Tabelas e breakdowns (split, fatura) priorizam legibilidade.
6. **Acessível por padrão.** Contraste, foco visível, navegação por teclado, labels.

## 2. Linguagem (a regra mais importante)

A cópia é uma questão **jurídica**, não só de tom (README §4 e §6). A interface protege a tese fiança ≠ seguro.

| Nunca usar ❌ | Usar ✅ |
|---------------|---------|
| seguro, seguro fiança | **fiança**, **garantia** |
| apólice | termo / carta de garantia |
| segurado | inquilino / colaborador PJ |
| reservas técnicas | **fundo de reserva** (reserva do fiador) |
| — | **roteamento**, **convênio**, **trava de rescisão**, **split na fonte** |

- **Tom:** direto, adulto, transparente. Reconhece limitações em vez de mascarar (espelha a honestidade do README).
- **Voz:** segunda pessoa para o usuário da empresa ("seus colaboradores", "sua fatura").
- Validação automatizada no CI bloqueia termos proibidos (issue 24).

## 3. Fundações visuais

> Tokens extraídos da landing page da Morada (linguagem de marca oficial). Estética **orgânica e editorial**: verdes profundos sobre off-white quente, accent coral, serifa de display contrastando com mono técnica. O painel B2B reusa esta paleta, porém mais sóbria (mais superfícies claras, accent usado com parcimônia).

### 3.1 Cores (tokens canônicos)

```css
:root {
  /* Verdes — marca */
  --pine:        #15392B;  /* verde escuro — seções/headers escuros */
  --pine-deep:   #0E2A1F;  /* pine mais profundo */
  --moss:        #2F6B4F;  /* verde médio — PRIMÁRIO (ações, links) */
  --cream-muted: #9FB1A4;  /* verde acinzentado suave */
  --soft-green:  #CDE3D3;  /* verde claro — fundos sutis/realce */

  /* Neutros quentes — base */
  --porcelain:   #F5F1E8;  /* fundo claro principal (off-white quente) */
  --cream:       #EDE7D7;  /* superfície creme */
  --ink:         #172019;  /* texto principal */
  --muted:       #5C6A60;  /* texto secundário */
  --line:        rgba(23,32,25,.12);    /* divisórias sobre claro */
  --line-d:      rgba(237,231,215,.14); /* divisórias sobre escuro */

  /* Accents */
  --coral:       #E9744B;  /* accent PRIMÁRIO — CTA, destaque */
  --gold:        #E3AE4F;  /* accent secundário — dados/realce */

  /* Tipografia */
  --serif: 'Instrument Serif', Georgia, serif;   /* display */
  --sans:  'Inter', system-ui, sans-serif;        /* texto */
  --mono:  'JetBrains Mono', ui-monospace, monospace; /* labels/dados */
}
```

**Mapeamento semântico no painel:**
- **Primário (ações, links, foco):** `--moss`. Botão primário pode usar `--coral` em CTAs de alta prioridade — com parcimônia (1 por tela).
- **Superfícies:** fundo `--porcelain`; cards `#FFF` ou `--cream`; seções de destaque/header escuro `--pine`.
- **Texto:** `--ink` (principal), `--muted` (secundário); sobre escuro, `--porcelain`/`--cream`.
- **Status** (ver §4): sucesso `--moss`/`#5BD06B`, alerta `--gold`, erro `--coral`, info/neutro `--cream-muted`.

### 3.2 Tipografia

- **Display (`--serif`, Instrument Serif):** títulos grandes e números-herói. Tracking negativo (`-.02em` a `-.025em`). Usar com elegância, não em excesso.
- **Texto (`--sans`, Inter):** pesos 400/450/500/600. Corpo e UI geral.
- **Labels/dados (`--mono`, JetBrains Mono 500):** rótulos pequenos em CAIXA ALTA com tracking largo (`.14em`–`.2em`) — eyebrows, tags, códigos, valores tabulares.
- **Escala fluida:** heading `clamp(32px,4.4vw,54px)`, subtítulo `clamp(28px,3.8vw,46px)`, corpo `clamp(16px,1.5vw,18.5px)`.
- **Números monetários:** mono, tabulares, alinhados à direita em tabelas (split/fatura).

### 3.3 Forma e elevação

- **Raios:** botões/badges em pílula `100px`; cards `16–22px`; chips/inputs `6–13px`; avatares `50%`.
- **Sombras (suaves, só para elevar):**
  - card/elevação leve: `0 16px 30px -18px rgba(23,32,25,.4)`
  - destaque sobre escuro: `0 40px 80px -30px rgba(15,42,31,.6)`
- **Bordas:** `1px` com `--line` (claro) ou `--line-d` (escuro) em vez de sombra quando possível.
- **Espaçamento:** escala consistente, respiro generoso; tabelas densas podem ter modo compacto.

## 4. Status e badges (vocabulário visual)

Cores semânticas consistentes em todo o produto:

| Status | Onde | Tom |
|--------|------|-----|
| `em originação` | colaborador, contrato | info/neutro (em progresso) |
| `ativo` | colaborador, contrato, convênio | sucesso |
| `thin file` | colaborador | atenção (informativo) |
| `em desligamento` | colaborador | atenção |
| `desligado` | colaborador | neutro |
| `aberta` | fatura | neutro |
| `paga` | fatura | sucesso |
| `atrasada` | fatura | erro |
| `pendente` | usuário/convite | atenção |

## 5. Padrões de componente (SPEC §3)

- **Reuso primeiro:** sidebar, topbar, banners ("custo zero", convênio), toast, modal, empty state, loader/skeleton, paginação, breadcrumb, tabela, cards de KPI, stepper, timeline, badge, tooltip já existem (issue 01).
- **Formulários:** validação inline em tempo real, mensagens claras, submit desabilitado enquanto inválido, estados de erro por campo.
- **Tabelas:** cabeçalho fixo, ordenação, paginação, estado vazio com CTA, ações por linha conforme papel.
- **Modais de confirmação:** obrigatórios em ações sensíveis (pagar, desligar, remover usuário).
- **Tooltips explicativos:** padronizados para "custo zero", "não-fiador", "fundo de reserva", "trava de rescisão".

## 6. Estados (sempre tratar os três)

Todo componente que carrega dados trata **loading** (skeleton), **vazio** (empty state com CTA) e **erro** (mensagem clara + ação de retry). Ações assíncronas mostram loader e depois toast de sucesso/erro.

## 7. Telas de alto cuidado

- **Onboarding (§2.5):** stepper claro; o convênio exibe **trava de rescisão** e **cláusula de não-fiador** em destaque; "Assinar" só habilita após ler o documento.
- **Timeline de originação (§2.9):** 8 passos com status; passos bloqueados mostram o motivo e quem precisa agir — gerenciar expectativa.
- **Detalhe da fatura (§2.14):** breakdown do split linha-a-linha + bloco "custo R$ 0" + linhas de retenção da trava de rescisão, tudo legível.
- **Desligamento (§2.10):** explica a trava, mostra valor retido, reforça "empresa não é fiadora", exige confirmação.

## 8. Acessibilidade (mínimos)

Contraste AA, foco visível, navegação por teclado em forms/modais/tabelas, labels e descrições em campos, `aria` em componentes interativos, mensagens de erro associadas ao campo, alvos de toque adequados, responsivo.

## 9. Responsividade

Desktop-first (uso primário em RH/financeiro), mas funcional em tablet/mobile: sidebar colapsável, tabelas com scroll horizontal ou cards em telas estreitas.
