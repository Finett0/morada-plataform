# Morada — Benefício de moradia para times PJ

> Documento-âncora do projeto. Compila a tese, o modelo, a fundamentação jurídica e o mapa de objeções.
> Valores ilustrativos. Não constitui parecer jurídico — ver §4 (Status regulatório).

**O que é, em uma frase:** a Morada é uma plataforma de **fiança locatícia onerosa com roteamento de recebíveis**, vendida às empresas como um **benefício de moradia de custo zero** para seus profissionais PJ.

**Contato comercial atual:** WhatsApp (11) 98146-8513 · canal único de conversão (estágio early / venda na mão).

---

## Sumário

1. [A tese](#1-a-tese)
2. [Como funciona (mecânica)](#2-como-funciona-mecânica)
3. [Como monetizamos](#3-como-monetizamos)
4. [Questões jurídicas](#4-questões-jurídicas)
5. [Possíveis objeções (e respostas)](#5-possíveis-objeções-e-respostas)
6. [Riscos e pontos em aberto](#6-riscos-e-pontos-em-aberto)
7. [ICP e go-to-market](#7-icp-e-go-to-market)
8. [Conjunto documental mínimo](#8-conjunto-documental-mínimo)
9. [Glossário](#9-glossário)
10. [O repositório e o código](#10-o-repositório-e-o-código)

---

## 1. A tese

**O problema.** O profissional PJ ganha bem, mas é mal avaliado pelas seguradoras, que usam algoritmos pensados para CLT/IRPF. Resultado: aprovação difícil e seguro fiança caro — o PJ chega a pagar ~12% do aluguel/mês, a fundo perdido. Do outro lado, a empresa perde talento porque não consegue oferecer um benefício que pese no bolso da família **sem virar custo de folha nem criar vínculo empregatício**. A moradia é a maior despesa de quase todo mundo, e ninguém havia desenhado um benefício de moradia para quem é PJ.

**O insight central.** O ativo de verdade não é o colaborador nem a empresa — é a **nota fiscal mensal do PJ contra a empresa** (o recebível). Se a plataforma se coloca como **domicílio bancário dessa nota**, ela controla o dinheiro na origem e pode (a) pagar o aluguel antes de qualquer outra coisa e (b) prestar a garantia da locação a partir do próprio fluxo do inquilino.

**O produto.** Um benefício B2B2C em que a empresa paga **uma fatura por mês** e a plataforma divide na fonte (split): aluguel ao proprietário, líquido ao PJ, taxa à Morada. A Morada figura como **garantidora** da locação (modalidade fiança), substituindo o seguro fiança / fiador.

**Três ganhos, ninguém perde:**

| Lado | Ganho |
|------|-------|
| **Empresa** | Retém talento sem custo de folha, sem mexer na folha e sem criar vínculo. Custo direto: R$0. |
| **Colaborador PJ** | Aluga sem fiador/caução, paga ~metade de um seguro fiança e recebe mais no fim do mês. |
| **Proprietário** | Aluguel cai direto na conta, antes de tudo. A inadimplência ativa deixa de existir. |

**O wedge.** Zero benefícios de moradia desenhados para PJ. É o espaço que a Morada ocupa.

---

## 2. Como funciona (mecânica)

### O split (exemplo ilustrativo — fatura de R$ 15.000)

| Destino | Valor | Observação |
|---------|-------|------------|
| Aluguel → proprietário | R$ 5.000 | Pago **primeiro**, sempre em dia |
| Líquido → colaborador PJ | R$ 9.700 | A renda dele |
| Taxa da plataforma (garantia) | R$ 300 | Receita da Morada |
| └ Fundo de reserva | R$ 90 | 30% da taxa; colchão de risco |

A empresa paga **um único valor**; a divisão é automática e instantânea. Ninguém transfere nada à mão.

### A dupla camada (o coração jurídico-econômico)

- **Camada primária — roteamento / cessão de recebíveis.** Na maioria dos meses, o aluguel é quitado com a *própria renda do inquilino*, direcionada pela domiciliação da nota. Isso não é garantia; é pagamento.
- **Camada residual — fiança.** A Morada, como fiadora, só é acionada quando o recebível falha (desligamento/calote). O fundo é a reserva do fiador, com direito de regresso contra o PJ.

### Rede de segurança

- **Trava de rescisão:** no desligamento, a empresa segura a última fatura para cobrir até **~3 meses** de aluguel até a desocupação/novo contrato. A empresa **nunca** assina como fiadora.
- **Fundo de reserva:** **30%** de cada garantia vira reserva.

### Ciclo de vida do contrato

Renovação (reajuste anual entra na fatura, sem papelada nova), portabilidade (troca de imóvel mantendo o benefício, sem pagar garantia de novo) e saída organizada (aviso prévio, desocupação, acerto final com aluguel garantido até o último dia).

### A originação é a parte difícil (o risco mora aqui)

O ciclo mensal é trivial. O risco está no **nascimento** do contrato, quando três "relógios" precisam sincronizar: o contrato de locação (Lei do Inquilinato), o vínculo PJ–empresa (a nota) e o roteamento financeiro.

> **Regra de ouro:** a garantia é emitida **antes** da assinatura da locação, mas o dinheiro só flui **depois** da entrada no imóvel. A janela entre os dois — garantia comprometida, nada recebido — é a operação inteira.

Caminho crítico (8 passos): pedido/elegibilidade → onboarding+KYC da imobiliária (gargalo mais lento) → subscrição do PJ+imóvel → carta de garantia → assinaturas → convênio de roteamento com a empresa → configuração do split → entrada e primeiro ciclo.

---

## 3. Como monetizamos

**Receita.** Taxa de garantia cobrada por contrato/mês. No exemplo, **R$ 300 ≈ 2% do bruto** (R$ 15.000).

**De onde vem o dinheiro (importante).** A taxa **não** sai do bolso da empresa — sai do lado do PJ. O desembolso da empresa não muda; ela continua pagando o que já pagaria ao PJ. Tanto a economia quanto a taxa vivem no lado do colaborador:

- Antes: PJ pagava ~12% do aluguel em seguro fiança (≈ R$ 600 sobre aluguel de R$ 5.000), a fundo perdido.
- Depois: PJ paga R$ 300 de garantia → **economiza ~R$ 300/mês** e ainda tem moradia garantida.
- Empresa: gasta **R$ 0** a mais e ganha retenção. → Por isso o "custo zero pra empresa" é uma afirmação honesta, não malabarismo. Mas a pergunta *"se é de graça, quem paga?"* tem que estar respondida no funil (ver §5).

**Margem líquida por contrato.** ≈ **R$ 210/mês** (R$ 300 de taxa − R$ 90 destinados ao fundo).

**Acumulação do fundo.** R$ 90/contrato/mês. Um sinistro de 3 meses de aluguel (~R$ 15.000) consome o equivalente a **~167 contrato-meses** de reserva. Tradução: o modelo só fecha com **carteira grande e inadimplência muito baixa** (ordem de bem menos de 0,5%/mês). O **cold start** é o ponto de maior fragilidade — fundo pequeno, um único sinistro pesa demais sobre carteira enxuta.

**Implicações de pricing / produto:**
- Subscrição mais conservadora, reforços e margem maior no início, afinando conforme o fundo capitaliza.
- **PJ "thin file"** (vínculo novo/curto) → preço mais alto, reforço (caução, co-garantia ou limite reduzido) ou liberação do limite cheio só após meses de roteamento bem-sucedido. Política explícita, não exceção caso a caso.
- Encargos variáveis (condomínio/IPTU) → o split precisa suportar ajuste de valor sem reabrir contrato; o escopo da garantia precisa dizer se cobre encargos ou só aluguel.
- **Não adiantar o aluguel do mês 1 com capital próprio** de forma habitual (vira operação de crédito — ver §4). Resolver o gap de caixa alinhando datas de vencimento.

**Linha de produto futura — PJ-direto.** Quando a empresa do PJ ainda não é conveniada, há bifurcação: *company-backed* (mais seguro, preserva a trava de rescisão) vs *PJ-direto* (destrava mais rápido, mas perde a trava → subscrição mais conservadora e preço diferente). Recomendação: tratar PJ-direto como **produto distinto** e usar a originação como gancho para puxar a empresa ao convênio depois.

---

## 4. Questões jurídicas

> **Status:** memorando interno preliminar. Não é parecer. Recomenda-se contratar especialista em direito regulatório (SUSEP e BACEN) **antes de qualquer escala**.

### A jogada central: fiança ≠ seguro

O art. 37 da **Lei do Inquilinato (8.245/1991)** traz uma lista fechada de garantias, admitindo apenas **uma** por contrato (vedada a cumulação): caução, **fiança (II)**, **seguro de fiança locatícia (III)** e cessão fiduciária de quotas de fundo. "Fiança" e "seguro de fiança" são itens **distintos** da mesma lista.

A Morada segue o caminho da **fiança**, não do seguro:
- Fiança é contrato civil (**CC, art. 818**) e **não depende de autorização de nenhum regulador**. Quem precisa de licença é a seguradora.
- Uma PJ solvente pode ser fiadora e **cobrar por isso** — a **fiança onerosa**, já praticada no mercado (CredPago, Garantti).
- A "substituição do seguro fiança" não é a Morada virando seguradora: é o inquilino **escolhendo outra modalidade** da mesma lei.

### Por que a dupla camada reforça a tese

Como, na maior parte do tempo, a plataforma apenas movimenta dinheiro do próprio inquilino (roteamento) — e não pulveriza risco para indenizar sinistros —, a **substância econômica se afasta da lógica securitária** (mutualismo, reservas técnicas). A fiança é backstop residual. Essa caracterização deve estar explícita nos contratos.

### O tripé regulatório (+ a 4ª frente)

| Frente | Regulador | Enquadramento pretendido | Risco |
|--------|-----------|--------------------------|-------|
| Garantia | **SUSEP** | Fiança onerosa (não seguro) | **Risco nº 1:** recaracterização como atividade securitária irregular (multa, comunicação ao MPF, medidas judiciais). Fiscalização ativa sobre fiança onerosa. |
| Pagamentos | **BACEN** | Camada de tecnologia sobre **PSP licenciado**, sem custodiar recursos | Muda se passar a custodiar saldos/gerir contas/subadquirir acima de limites. Avaliar **dispensa de programa de benefícios**. |
| Crédito | **BACEN** | **Não** ser instituição de crédito | Adiantar o mês 1 com capital próprio de forma habitual pode configurar crédito (exigiria SCD/parceria). **Evitar.** |
| **Trabalhista** ⚠️ | **Justiça do Trabalho** | Relação PJ legítima | **4ª frente (não estava no memo original):** se a relação PJ for reclassificada como vínculo (pejotização), o recebível pode virar salário (impenhorável, cessão limitada) e a empresa pode ser arrastada. Existencial no ICP (dev shops, agências, BPOs). |

### Diretrizes de estruturação

**Fazer:** nomear a operação como **fiança** em todos os instrumentos; documentar o roteamento como camada primária e a fiança como backstop; tratar o fundo como **reserva do fiador** (governança, segregação, regresso contra o PJ); operar sobre PSP licenciado; avaliar formalmente a dispensa de programa de benefícios.

**Evitar:** os termos **"seguro", "seguro fiança", "apólice", "segurado", "reservas técnicas"** em contratos, site e materiais; adiantar aluguel com capital próprio sem estrutura de crédito; cumular a fiança com outra garantia no mesmo contrato; custodiar saldos fora do PSP.

---

## 5. Possíveis objeções (e respostas)

### Da empresa / financeiro
- **"Se é de graça, quem paga?"** → O desembolso da empresa não muda; a taxa sai da economia do PJ (R$ 300 no lugar de ~R$ 600 de seguro fiança). A empresa só ganha retenção. *Antecipar essa resposta no funil — ela vem na 1ª call.*
- **"Ativa mesmo em minutos?"** → Para a empresa, ativar o benefício é rápido (assinar o convênio). A originação per-PJ (KYC de imobiliária, carta de garantia) é mais lenta e fica do lado da Morada. **Calibrar a promessa** para não gerar descasamento de expectativa.
- **"Vira vínculo empregatício?"** → Não. A empresa nunca assina como fiadora; o convênio tem escudo trabalhista. (Mas ver risco de pejotização em §4 e §6.)

### Da imobiliária
- **"Por que confiar na Morada e não na Porto/CredPago?"** → Três alavancas: **split na fonte** (o aluguel cai na conta dela na frente de todos, até do PJ); **transparência do fundo de reserva** como prova de lastro; e, nas primeiras parcerias, **reforço** (caução retida ou backstop) até a relação amadurecer. Depois de 2–3 ciclos pontuais, o split se prova sozinho.
- **"A garantia cobre danos?"** → Definir o escopo **na originação**, nunca depois. Se cobre só inadimplência, isso tem que estar cristalino no aceite, para não virar disputa na saída.
- **"Aceito substituir a caução?"** → A garantia pode substituir a caução integralmente (valor pro PJ, que não imobiliza 3 aluguéis), mas precisa de aceite em termo. Em risco alto, manter caução parcial retida pela plataforma.

### Do proprietário / colaborador
- **"E se o colaborador sair da empresa?"** → A trava de rescisão segura a última fatura para cobrir até ~3 meses até a desocupação. O proprietário nunca fica no prejuízo.

### Do regulador (SUSEP) — as mais perigosas
- **"Isso não é seguro disfarçado?"** → Não: é fiança (art. 37, II), contrato civil sem exigência de autorização; o roteamento é a mecânica primária e afasta a lógica securitária. *Mas atenção (ver §6): a taxa é precificada contra o seguro que substitui, e o site descreve o fundo como colchão coletivo — isso entrega munição. Corrigir antes de escalar.*
- **"O regresso contra o PJ é real?"** → No papel sim; na prática é frágil, porque o sinistro acontece justamente quando o PJ perde a renda. Reconhecer a limitação em vez de apresentá-la como blindagem.

---

## 6. Riscos e pontos em aberto

**Tensões internas a resolver antes do parecer especializado:**

1. **O fundo se contradiz entre as peças.** O memo manda tratá-lo como *reserva individual do fiador com regresso*; o site o vende como "colchão que protege **todos os contratos**" — isso é **mutualismo**, a marca do seguro que se quer evitar. **A cópia do site precisa mudar** para não entregar a prova contra a própria tese.
2. **Regresso ilusório.** O regresso contra o PJ é o que distingue fiança de seguro, mas o PJ é o inquilino e o sinistro coincide com a perda de renda dele. Tratar com honestidade.
3. **Dispensa BACEN × dualidade PF/PJ.** A dispensa de "programa de benefícios" é para **pessoa natural**; o modelo preserva a separação locatário PF / recebível PJ. Essa dualidade ajuda numa frente e atrapalha na outra — a resposta depende de quem é tratado como beneficiário.

**Decisões a fechar com jurídico + atuária:**
- Teto de cobertura.
- Cobertura (ou não) de danos.
- Política do mês 1 (gap de caixa) — sem adiantamento habitual com capital próprio.
- Governança e regulamento do fundo de reserva (reserva de fiador, não reservas técnicas, inclusive sob ótica contábil).
- Exposição a CDC e LGPD na originação e no tratamento de dados de renda.

**Cold start:** as primeiras safras são as mais arriscadas (fundo pequeno, sinistro único pesa muito). Subscrição conservadora, reforços e margem maior no início.

**Tabelas pendentes no memo:** o tripé regulatório (§3 do memo) e o comparativo fiança × seguro (§4.2) estão **em branco** — preencher antes de entregar ao parecerista.

---

## 7. ICP e go-to-market

**Para quem:** empresas que rodam com times PJ e disputam talento.
- Fábricas de software (dev shops com exércitos de devs PJ)
- Agências de growth (performance/mídia, margens apertadas)
- BPOs e consultorias
- Startups com times PJ

**Provas de valor (headline):** R$ 0 de custo pra empresa · −50% do que o PJ pagaria em seguro fiança · 0 fiador/caução/burocracia · 100% sem mexer na folha.

**Estágio:** early / venda na mão. Conversão única por WhatsApp, sem produto self-service nem provas de lastro na página pública ainda — gap a fechar conforme a imobiliária entra na conversa.

---

## 8. Conjunto documental mínimo

- Convênio B2B de roteamento de pagamentos com a empresa (trava de rescisão + cláusula de não-fiador).
- Contrato de fiança / termo de garantia (Morada como fiadora, com teto de cobertura).
- Contrato de cessão/roteamento de recebíveis entre PJ e Morada (direito de regresso + gatilhos de notificação: mudança, renovação, desligamento).
- Termo de aceite da garantia pela imobiliária + registro/aditivo no contrato de locação (com exoneração de garantia anterior, se houver).
- Política de governança e regulamento do fundo de reserva.
- Política de privacidade e bases legais de tratamento de dados (LGPD).

---

## 9. Glossário

- **Split na fonte:** divisão automática do pagamento no instante em que entra, via domiciliação bancária da nota. Garante que o aluguel cai primeiro.
- **Dupla camada:** roteamento de recebíveis (primária, "é pagamento") + fiança (residual, "é garantia").
- **Fiança onerosa:** fiança prestada por PJ mediante remuneração — contrato civil, sem necessidade de licença de seguradora.
- **Trava de rescisão:** retenção da última fatura no desligamento para cobrir o aluguel durante a transição.
- **Fundo de reserva:** 30% de cada garantia; colchão de risco. *(Enquadrar como reserva de fiador, não reservas técnicas.)*
- **Thin file:** PJ com vínculo novo/curto com a empresa → recebível menos provado, risco maior.
- **Company-backed × PJ-direto:** com convênio da empresa (preserva trava de rescisão) vs cessão direta do PJ (destrava rápido, perde a trava).
- **Pejotização:** contratação via PJ de quem, na prática, seria empregado — risco de reclassificação trabalhista que ameaça o lastro do modelo.

---

## 10. O repositório e o código

Este repositório guarda **a documentação do produto** e **o código da aplicação** (a *Plataforma da Empresa* — o painel B2B onde a empresa gerencia o benefício). Tudo nasce do documento para o código, nesta ordem: tese → spec → backlog → padrões → implementação.

### Como o repositório está organizado

| Pasta / arquivo | O que é |
|-----------------|---------|
| `README.MD` | Este documento-âncora: o **porquê** do produto (tese, modelo, jurídico). |
| `SPEC.MD` | A especificação funcional do painel: **o que** a aplicação faz (páginas, componentes, comportamentos). |
| `issues/` | O backlog fatiado em **25 issues (00–24)**, com critérios de aceite. `issues/README.md` indexa. |
| `skills/` | Guias de **como** escrever cada camada (model/route/action/component/hook/integration/test-writer). |
| `references/` | Padrões transversais: `architecture.md` (técnico), `design.md` (visual + cópia), `workflow.md` (processo). |
| `assets/` | Arquivos estáticos do front (logo, imagens). |
| `src/` | **O código da aplicação** (ver abaixo). |
| `prisma/` | `schema.prisma` — modelo de dados canônico (alvo de produção). |

### A aplicação (`src/`)

Stack: **Next.js 14 (App Router) + TypeScript**, Prisma/PostgreSQL (alvo), Zod (validação), TanStack Query (dados), Vitest + Testing Library (testes), ESLint + Prettier.

```
src/
├── app/                 rotas (App Router) + API
│   ├── (auth)/          telas públicas: login, signup, recuperar, convite
│   ├── (app)/           telas autenticadas (app shell): dashboard, colaboradores,
│   │                    contratos, faturas, relatórios, documentos, configurações, ajuda
│   ├── onboarding/      wizard de ativação do benefício
│   └── api/             route handlers (sessão, auth, colaboradores, faturas, …)
├── components/
│   ├── ui/              design system (Button, Card, Table, Modal, Toast, Timeline, …)
│   └── global/          shell: Sidebar, Topbar, NotificationBell
├── hooks/               data-fetching e mutações (TanStack Query)
├── lib/                 rbac, types, validação (Zod), format, status, legal-guard, config
├── server/             regra de negócio (actions), store de dados, sessão, auditoria
└── styles/             tokens da marca (globals.css) + componentes (ui.css)
```

As camadas mapeiam **1:1 com as skills** (`skills/`): `model → route → action → component → hook`, com `integration` e `test` ao lado. Regra de dependência: a UI nunca fala com o banco direto; rotas não contêm regra de negócio (delegam às *actions*); *actions* não chamam serviços externos direto (passam por *integrations*).

### Como rodar localmente

```bash
npm install            # instala dependências
cp .env.example .env.local   # configura variáveis (opcional no estágio atual)
npm run dev            # sobe a aplicação em http://localhost:3000
```

Outros scripts: `npm run build` (produção), `npm test` (Vitest), `npm run lint`, `npm run typecheck`, `npm run format`.

> **Login de demonstração:** a tela `/login` traz botões para entrar como cada papel (Admin, Financeiro, RH, Visualizador) e ver o RBAC na prática.

### Estado atual do código (importante)

Para a aplicação rodar **sem infraestrutura externa**, alguns pontos estão **simulados** — não são bugs, são os próximos passos de produção (marcados no código):

- **Banco de dados:** hoje é um **store em memória com seed** (`src/server/db.ts`). O `prisma/schema.prisma` já é a estrutura-alvo; migrar troca só os acessores, sem mexer em rotas/UI.
- **Autenticação:** senha é **mock** (a sessão é resolvida por e-mail). Falta hashing/verificação real.
- **Integrações:** pagamento/split (PSP licenciado), e-mail e assinatura eletrônica estão **simulados** (trabalho do `integration-writer`).

### Invariantes do produto aplicados no código

Estes não são opcionais — atravessam todas as camadas:

- **RBAC** validado na rota **e** na action (defesa em profundidade) e refletido na UI (esconder/desabilitar).
- **Auditoria** (append-only) em toda ação sensível: assinatura, pagamento, desligamento, gestão de usuários.
- **Dinheiro em centavos** (inteiro), formatado para BRL só na borda de exibição.
- **Multi-tenant:** todo dado é escopado por `empresaId`.
- **Guarda de linguagem jurídica:** um teste de CI **quebra o build** se aparecer "seguro/apólice/segurado/reservas técnicas" no código (ver §4 e §6) — `src/lib/legal-guard.ts`.

### Fluxo de trabalho

Uma issue por vez: branch (`feat/<nº>-<slug>`) → implementar pelas camadas → testes/lint/typecheck verdes → **um commit por issue** (mensagem detalhada em inglês). Detalhes em `references/workflow.md`. CI (`.github/workflows/ci.yml`) roda lint + typecheck + testes (inclui a guarda de linguagem) a cada push/PR.

---

*Peças-fonte: documento interno de mecânica/originação, landing page comercial (Morada) e memorando jurídico interno. Valores ilustrativos; fundamentação jurídica preliminar, pendente de parecer especializado.*