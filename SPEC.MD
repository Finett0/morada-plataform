# SPEC — Plataforma da Empresa (Morada)

> Especificação funcional do **painel B2B** da Morada: a aplicação onde a **empresa contratante** gerencia o benefício de moradia dos seus profissionais **PJ**.
> Documento escrito **antes** do código. Define o que a aplicação precisa fazer, não como será implementada.
> Contexto de produto e fundamentação: ver `README.MD`. Valores ilustrativos.

---

## Sumário

1. [Overview](#1-overview)
2. [Páginas](#2-páginas)
3. [Componentes](#3-componentes)
4. [Comportamentos](#4-comportamentos)
5. [Glossário de telas e termos](#5-glossário-de-telas-e-termos)

---

## 1. Overview

### 1.1 O que é esta aplicação

A **Plataforma da Empresa** é o painel web onde uma empresa que contrata profissionais PJ ativa e administra o **benefício de moradia da Morada**. Pelo painel, a empresa:

- assina o **convênio B2B de roteamento de pagamentos** (uma única vez);
- **cadastra e gerencia os colaboradores PJ** elegíveis ao benefício;
- acompanha o ciclo de cada contrato (garantia, locação, split mensal);
- recebe e paga **uma única fatura consolidada por mês**, que a Morada divide na fonte (aluguel → proprietário, líquido → PJ, taxa → Morada);
- executa o **desligamento** de um PJ acionando a **trava de rescisão**;
- consulta **relatórios** de custo, economia e status da carteira.

A premissa central do produto se reflete na aplicação: o **desembolso da empresa não muda** (ela continua pagando o que já pagaria ao PJ) e a empresa **nunca figura como fiadora**. O painel deve reforçar essas duas mensagens de forma persistente.

### 1.2 Quem usa (perfis / papéis)

| Papel | Quem é | O que pode fazer |
|-------|--------|------------------|
| **Admin da empresa** | RH / financeiro / fundador | Tudo: assinar convênio, convidar usuários, cadastrar PJ, aprovar faturas, desligar PJ, ver tudo. |
| **Financeiro** | Time financeiro | Ver e pagar faturas, ver relatórios. Não cadastra/desliga PJ. |
| **Operador de RH** | Pessoa de RH | Cadastrar/convidar PJ, acompanhar onboarding, iniciar desligamento. Não paga faturas. |
| **Visualizador** | Stakeholder | Somente leitura de dashboard e relatórios. |

> O **colaborador PJ** e a **imobiliária** têm jornadas próprias (apps separados) e **não** usam este painel. Aparecem aqui apenas como dados/status.

### 1.3 Escopo

**Dentro do escopo desta spec:**
- Autenticação e gestão de usuários da empresa.
- Onboarding da empresa (assinatura do convênio + KYC empresarial).
- Gestão do ciclo de vida dos colaboradores PJ e seus contratos.
- Faturamento consolidado e split (visão da empresa).
- Trava de rescisão / desligamento.
- Relatórios e documentos.

**Fora do escopo (outros produtos/superfícies):**
- App do colaborador PJ.
- Portal da imobiliária / proprietário.
- Console interno de subscrição e operação da Morada.
- Motor de pagamentos/split (é o PSP licenciado + backend; aqui só consumimos status).

### 1.4 Princípios de design (não-funcionais)

- **Custo zero, sempre visível.** Toda tela de fatura/custo deixa explícito que o gasto incremental da empresa é R$ 0.
- **Escudo trabalhista e jurídico na linguagem.** A interface nunca usa "seguro", "apólice", "segurado", "segurado", "reservas técnicas". Usa **fiança**, **garantia**, **roteamento**, **fundo de reserva**, **convênio**. (Ver §4 do README.)
- **A empresa nunca é fiadora.** Nenhum fluxo pode sugerir o contrário; textos de assinatura reforçam a cláusula de não-fiador.
- **Estado honesto.** Status de originação (lento, do lado da Morada) é mostrado de forma realista para não criar descasamento de expectativa.
- **Trilha de auditoria.** Toda ação sensível (cadastro, desligamento, pagamento) é registrada com usuário, data e hora.

---

## 2. Páginas

Lista de todas as telas da aplicação. Cada página detalha objetivo, acesso e os componentes que contém (detalhados em §3).

### 2.0 Mapa de navegação

```
Público
 ├─ /login                      Login
 ├─ /signup                     Criar conta da empresa (via convite ou auto-cadastro)
 ├─ /recuperar-senha            Recuperação de senha
 └─ /convite/:token             Aceitar convite de usuário

Onboarding (empresa ainda não ativada)
 └─ /onboarding                 Assinatura do convênio + KYC empresarial (wizard)

Autenticado (empresa ativa) — layout com sidebar
 ├─ /                           Dashboard
 ├─ /colaboradores              Lista de colaboradores PJ
 ├─ /colaboradores/novo         Cadastrar/convidar colaborador PJ
 ├─ /colaboradores/:id          Detalhe do colaborador PJ
 ├─ /colaboradores/:id/desligar Fluxo de desligamento (trava de rescisão)
 ├─ /contratos                  Lista de contratos/garantias
 ├─ /contratos/:id              Detalhe do contrato (garantia + locação + split)
 ├─ /faturas                    Lista de faturas mensais
 ├─ /faturas/:id                Detalhe da fatura (breakdown do split)
 ├─ /relatorios                 Relatórios e exportações
 ├─ /documentos                 Convênio, termos e contratos da empresa
 ├─ /configuracoes              Dados da empresa, usuários, integrações, faturamento
 └─ /ajuda                      Central de ajuda / FAQ / contato comercial
```

### 2.1 Login (`/login`)
- **Objetivo:** autenticar um usuário da empresa.
- **Acesso:** público.
- **Componentes:** logo, formulário de login (e-mail, senha), botão "Entrar", link "Esqueci minha senha", link "Criar conta da empresa", banner de erro.

### 2.2 Criar conta da empresa (`/signup`)
- **Objetivo:** criar a conta inicial da empresa e o primeiro usuário Admin.
- **Acesso:** público (auto-cadastro early stage) ou via link comercial.
- **Componentes:** formulário (nome da empresa, CNPJ, nome do responsável, e-mail corporativo, senha), checkbox de aceite dos termos, botão "Criar conta", aviso de que os próximos passos são o onboarding/convênio.

### 2.3 Recuperação de senha (`/recuperar-senha`)
- **Objetivo:** enviar link de redefinição.
- **Componentes:** campo de e-mail, botão "Enviar link", confirmação.

### 2.4 Aceitar convite (`/convite/:token`)
- **Objetivo:** um usuário convidado define senha e entra na empresa já existente.
- **Componentes:** dados pré-preenchidos (e-mail, papel), campo de senha, botão "Aceitar e entrar".

### 2.5 Onboarding da empresa (`/onboarding`)
- **Objetivo:** levar a empresa de "conta criada" a "benefício ativo". É um **wizard de etapas**.
- **Acesso:** Admin, quando a empresa ainda não está ativada.
- **Etapas (steps):**
  1. **Dados da empresa / KYC** — razão social, CNPJ, endereço, representante legal.
  2. **Configuração de faturamento** — método de pagamento da fatura consolidada, dia de vencimento, e-mail do financeiro.
  3. **Leitura e assinatura do convênio** — visualizador do convênio B2B (com **trava de rescisão** e **cláusula de não-fiador** em destaque) + assinatura eletrônica.
  4. **Confirmação** — resumo + "Benefício ativado" e CTA para cadastrar o primeiro colaborador.
- **Componentes:** stepper de progresso, formulários por etapa, visualizador de documento, bloco de assinatura eletrônica, resumo final.

### 2.6 Dashboard (`/`)
- **Objetivo:** visão geral da carteira de benefícios da empresa.
- **Componentes:**
  - **Cards de KPI:** nº de colaboradores ativos, contratos ativos, contratos em originação, custo incremental da empresa (**R$ 0**, fixo e explicado), economia total gerada para os PJs.
  - **Banner de status do convênio** (ativo / pendência).
  - **Lista de pendências/ações** (ex.: PJ aguardando documento, fatura a aprovar).
  - **Tabela "próximos vencimentos"** (fatura do mês).
  - **Atalhos** (cadastrar PJ, ver fatura).

### 2.7 Colaboradores PJ — lista (`/colaboradores`)
- **Objetivo:** ver e gerenciar todos os PJs vinculados ao benefício.
- **Componentes:** barra de busca + filtros (status, status de originação, thin file), tabela de colaboradores (nome, CNPJ/MEI, status, status do contrato, valor da fatura, ações), botão "Cadastrar colaborador", paginação, estado vazio.

### 2.8 Cadastrar/convidar colaborador (`/colaboradores/novo`)
- **Objetivo:** iniciar a inclusão de um PJ no benefício.
- **Componentes:** formulário (nome, CNPJ, e-mail, valor da nota mensal, observações), seletor "convidar por e-mail" vs "preencher dados", aviso de elegibilidade, aviso de que a **subscrição e o KYC da imobiliária ficam do lado da Morada** (originação mais lenta), botão "Enviar convite / Cadastrar".

### 2.9 Detalhe do colaborador PJ (`/colaboradores/:id`)
- **Objetivo:** tudo sobre um PJ e o estágio do seu contrato.
- **Componentes:**
  - **Cabeçalho** (nome, CNPJ, status, badge "thin file" se aplicável).
  - **Timeline de originação** (8 passos do README: elegibilidade → KYC imobiliária → subscrição → carta de garantia → assinaturas → convênio de roteamento → split → 1º ciclo).
  - **Bloco do contrato/garantia vinculado** (link para `/contratos/:id`).
  - **Bloco financeiro** (valor da nota, split: aluguel/líquido/taxa/fundo).
  - **Documentos do colaborador.**
  - **Botões de ação:** editar, reenviar convite, **iniciar desligamento**.

### 2.10 Desligamento do colaborador (`/colaboradores/:id/desligar`)
- **Objetivo:** executar o desligamento acionando a **trava de rescisão**.
- **Componentes:** explicação da trava de rescisão (retenção da última fatura para cobrir ~3 meses até a desocupação), campo de data do desligamento, resumo do valor retido, checkbox de confirmação (com aviso de que a empresa não é fiadora), botão "Confirmar desligamento", aviso do que acontece em seguida.

### 2.11 Contratos / garantias — lista (`/contratos`)
- **Objetivo:** ver todos os contratos de garantia/locação.
- **Componentes:** filtros (status, em originação, ativos, encerrados), tabela (colaborador, imóvel, valor aluguel, status, vigência), busca, paginação.

### 2.12 Detalhe do contrato (`/contratos/:id`)
- **Objetivo:** o contrato completo: garantia, locação e split.
- **Componentes:** resumo do contrato, dados do imóvel/proprietário/imobiliária, **breakdown do split**, escopo da garantia (cobre só inadimplência? danos?), documentos (carta de garantia, contrato de locação, termo de aceite), histórico de eventos (renovação, portabilidade, reajuste).

### 2.13 Faturas — lista (`/faturas`)
- **Objetivo:** ver e pagar as faturas mensais consolidadas.
- **Componentes:** tabela de faturas (mês de referência, valor total, status: aberta/paga/atrasada, vencimento), filtros por período/status, botão de exportar, indicador de próxima fatura.

### 2.14 Detalhe da fatura (`/faturas/:id`)
- **Objetivo:** entender exatamente o que compõe a fatura e pagá-la.
- **Componentes:**
  - **Resumo** (mês, total, vencimento, status).
  - **Tabela linha-a-linha por colaborador** com o split (aluguel → proprietário, líquido → PJ, taxa Morada, fundo de reserva).
  - **Bloco "custo incremental da empresa: R$ 0"** com explicação.
  - **Linhas especiais:** valores retidos por trava de rescisão.
  - **Botão "Pagar / confirmar pagamento"**, botão "Baixar comprovante/boleto/PDF".

### 2.15 Relatórios (`/relatorios`)
- **Objetivo:** análises e exportações.
- **Componentes:** seletor de período, gráficos (evolução da carteira, economia gerada aos PJs, custo da empresa), tabela exportável (CSV/PDF), botão de exportar.

### 2.16 Documentos (`/documentos`)
- **Objetivo:** repositório dos documentos da empresa.
- **Componentes:** lista de documentos (convênio B2B assinado, termos, contratos), visualizador, botão de download, status de assinatura.

### 2.17 Configurações (`/configuracoes`)
- **Objetivo:** administrar a conta da empresa.
- **Abas/seções:**
  - **Empresa:** razão social, CNPJ, endereço, logo.
  - **Usuários e papéis:** lista de usuários, convidar usuário, alterar papel, remover.
  - **Faturamento:** método de pagamento, dia de vencimento, e-mail do financeiro.
  - **Notificações:** preferências de e-mail/alertas.
  - **Segurança:** trocar senha, 2FA, sessões.
- **Componentes:** formulários por aba, tabela de usuários, modais de convite/edição.

### 2.18 Ajuda (`/ajuda`)
- **Objetivo:** suporte e FAQ.
- **Componentes:** lista de perguntas frequentes (espelhando as objeções do §5 do README: "se é de graça, quem paga?", "vira vínculo?", etc.), **canal comercial via WhatsApp (11) 98146-8513**, formulário de contato.

---

## 3. Componentes

Catálogo dos elementos reutilizáveis e os específicos por página. Cada componente lista seus elementos e (em §4) seus comportamentos.

### 3.1 Componentes globais / layout

| Componente | Elementos | Onde aparece |
|------------|-----------|--------------|
| **Sidebar de navegação** | Logo, links (Dashboard, Colaboradores, Contratos, Faturas, Relatórios, Documentos, Configurações, Ajuda), badge de pendências | Todas as páginas autenticadas |
| **Topbar** | Nome da empresa, seletor de usuário, sino de notificações, menu de conta (perfil, sair) | Todas as autenticadas |
| **Banner "custo zero"** | Texto fixo: "Custo incremental para a empresa: R$ 0" + tooltip explicativo | Dashboard, faturas |
| **Banner de status do convênio** | Estado (ativo/pendente), CTA de resolução | Dashboard, topo das páginas |
| **Toast / notificação** | Mensagem de sucesso/erro/info, auto-dismiss | Global |
| **Modal de confirmação** | Título, descrição, botões confirmar/cancelar | Global (ações sensíveis) |
| **Estado vazio (empty state)** | Ilustração, texto, CTA | Listas sem dados |
| **Loader / skeleton** | Placeholder de carregamento | Global |
| **Paginação** | Anterior/próximo, números, itens por página | Todas as listas |
| **Breadcrumb** | Trilha de navegação | Páginas de detalhe |

### 3.2 Formulários

| Formulário | Campos | Página |
|------------|--------|--------|
| **Form de login** | E-mail, senha | `/login` |
| **Form de criar conta** | Nome empresa, CNPJ, responsável, e-mail, senha, aceite de termos | `/signup` |
| **Form de recuperação** | E-mail | `/recuperar-senha` |
| **Form de aceite de convite** | Senha (e-mail/papel pré-preenchidos) | `/convite/:token` |
| **Form de KYC empresarial** | Razão social, CNPJ, endereço, representante legal, documentos | `/onboarding` |
| **Form de faturamento** | Método de pagamento, dia de vencimento, e-mail financeiro | `/onboarding`, `/configuracoes` |
| **Form de cadastro de PJ** | Nome, CNPJ, e-mail, valor da nota, observações, modo (convite/dados) | `/colaboradores/novo` |
| **Form de edição de PJ** | Mesmos campos editáveis | `/colaboradores/:id` |
| **Form de desligamento** | Data de desligamento, confirmação | `/colaboradores/:id/desligar` |
| **Form de convite de usuário** | E-mail, papel | `/configuracoes` |
| **Form de dados da empresa** | Razão social, endereço, logo | `/configuracoes` |
| **Form de contato/suporte** | Assunto, mensagem | `/ajuda` |

### 3.3 Botões e ações (CTAs)

- **Primários:** Entrar, Criar conta, Assinar convênio, Cadastrar colaborador, Pagar fatura, Confirmar desligamento, Convidar usuário, Salvar.
- **Secundários:** Cancelar, Voltar, Editar, Reenviar convite, Exportar, Baixar PDF/comprovante.
- **Destrutivos/sensíveis:** Confirmar desligamento, Remover usuário (sempre com modal de confirmação).

### 3.4 Tabelas e listas

| Tabela | Colunas | Página |
|--------|---------|--------|
| **Colaboradores** | Nome, CNPJ, status, status de originação, valor, ações | `/colaboradores` |
| **Contratos** | Colaborador, imóvel, aluguel, status, vigência | `/contratos` |
| **Faturas** | Mês ref., valor total, status, vencimento, ações | `/faturas` |
| **Split da fatura** | Colaborador, aluguel, líquido PJ, taxa, fundo | `/faturas/:id` |
| **Usuários** | Nome, e-mail, papel, status, ações | `/configuracoes` |
| **Documentos** | Nome, tipo, status de assinatura, data, download | `/documentos` |
| **Pendências** | Descrição, entidade relacionada, ação | Dashboard |

### 3.5 Cards e indicadores

- **Cards de KPI** (dashboard): colaboradores ativos, contratos ativos, em originação, custo da empresa (R$ 0), economia gerada.
- **Card de status do contrato** (detalhe do PJ).
- **Card de breakdown do split.**
- **Gráficos** (relatórios): linha de evolução, barras de economia/custo.

### 3.6 Componentes especializados

- **Stepper de onboarding** — progresso por etapas.
- **Timeline de originação** — 8 passos com status (concluído/atual/pendente/bloqueado).
- **Visualizador de documento + bloco de assinatura eletrônica.**
- **Badge de status** — ativo, em originação, thin file, desligado, atrasado.
- **Tooltip explicativo** — usado nos pontos de "custo zero", "não-fiador", "fundo de reserva", "trava de rescisão".

---

## 4. Comportamentos

O que o usuário pode fazer ao interagir com cada componente, com validações e o resultado esperado.

### 4.1 Autenticação

- **Submeter login:** valida e-mail/senha → sucesso redireciona para `/` (ou `/onboarding` se a empresa não estiver ativa); erro mostra banner "credenciais inválidas". Bloqueio temporário após N tentativas.
- **Criar conta:** valida CNPJ (formato + unicidade), e-mail corporativo e força da senha → cria empresa + usuário Admin → redireciona para `/onboarding`.
- **Recuperar senha:** envia link por e-mail (sempre mostra confirmação genérica, sem revelar se o e-mail existe).
- **Aceitar convite:** define senha → entra na empresa com o papel atribuído.
- **Sair:** encerra sessão e volta ao `/login`.

### 4.2 Onboarding (wizard)

- **Avançar etapa:** valida campos da etapa atual antes de liberar a próxima; permite voltar sem perder dados.
- **Enviar KYC:** valida documentos obrigatórios; salva em rascunho se incompleto.
- **Assinar convênio:** exige rolar/visualizar o documento completo e marcar aceite antes de habilitar "Assinar"; ao assinar, registra assinatura eletrônica (usuário, data/hora, IP) e marca o convênio como ativo. Reforça em tela a **cláusula de não-fiador** e a **trava de rescisão**.
- **Concluir:** ativa o benefício, libera o painel completo e oferece CTA "Cadastrar primeiro colaborador".

### 4.3 Gestão de colaboradores PJ

- **Cadastrar colaborador:** valida CNPJ e valor da nota; no modo "convite", dispara e-mail ao PJ; no modo "dados", cria o registro direto. Cria o PJ com status **"em originação"** e inicia a **timeline de 8 passos**. Exibe aviso de que KYC/subscrição correm do lado da Morada.
- **Reenviar convite:** reenvia e-mail; mostra toast de confirmação.
- **Editar colaborador:** salva alterações; campos críticos (CNPJ) podem exigir reabrir subscrição.
- **Marcar "thin file":** badge automático quando vínculo é novo/curto; afeta exibição de política de preço/reforço (informativo para a empresa).
- **Acompanhar originação:** a timeline atualiza conforme o backend avança os passos; passos bloqueados mostram o motivo e quem precisa agir.

### 4.4 Desligamento (trava de rescisão)

- **Iniciar desligamento:** abre o fluxo, exibe o cálculo do valor retido (~até 3 meses de aluguel) e a data de desocupação prevista.
- **Confirmar desligamento:** exige checkbox confirmando o entendimento (empresa não é fiadora; última fatura será retida). Ao confirmar:
  - marca o PJ como **"em desligamento"**;
  - aciona a retenção na próxima fatura (linha especial);
  - registra evento na trilha de auditoria;
  - notifica a Morada e as partes.
- **Cancelar desligamento:** possível enquanto não efetivado; reverte o status.

### 4.5 Faturas e pagamento

- **Visualizar fatura:** mostra total + breakdown por colaborador (split) + linhas de retenção; reforça **"custo incremental: R$ 0"**.
- **Pagar/confirmar pagamento:** dispara o pagamento da fatura consolidada via método configurado; ao confirmar, status vira "paga" e o split é executado na fonte (aluguel primeiro). Mostra comprovante.
- **Fatura atrasada:** badge "atrasada", alerta no dashboard, lembrete por e-mail.
- **Exportar/baixar:** gera PDF/boleto/comprovante.

### 4.6 Contratos

- **Abrir contrato:** mostra garantia + locação + split + escopo da garantia (cobre só inadimplência? danos? — definido na originação, exibido de forma cristalina).
- **Ver eventos do contrato:** renovação (reajuste anual entra na fatura sem papelada nova), portabilidade (troca de imóvel mantendo o benefício), saída organizada.
- **Baixar documentos:** carta de garantia, contrato de locação, termo de aceite da imobiliária.

### 4.7 Relatórios

- **Selecionar período:** atualiza gráficos e tabelas.
- **Exportar:** gera CSV/PDF do recorte atual.

### 4.8 Configurações

- **Editar dados da empresa:** valida e salva.
- **Convidar usuário:** valida e-mail + papel → envia convite → aparece como "pendente" até aceite.
- **Alterar papel / remover usuário:** modal de confirmação; não permite remover o último Admin.
- **Editar faturamento:** altera método/vencimento (pode exigir reconfirmação).
- **Segurança:** trocar senha, ativar 2FA, encerrar sessões ativas.

### 4.9 Comportamentos transversais

- **Permissões por papel:** botões/ações ficam ocultos ou desabilitados conforme o papel (§1.2). Tentativas não autorizadas retornam erro/redirecionamento.
- **Validação de formulários:** inline, em tempo real, com mensagens claras; submit desabilitado enquanto inválido.
- **Confirmação de ações sensíveis:** desligamento, pagamento, remoção de usuário sempre via modal.
- **Feedback:** toda ação assíncrona mostra loader e depois toast de sucesso/erro.
- **Notificações:** sino na topbar + e-mail para eventos-chave (PJ aprovado, fatura disponível, fatura vencendo, desligamento processado).
- **Auditoria:** ações sensíveis gravam usuário, data/hora e contexto.
- **Linguagem jurídica segura:** a UI nunca usa "seguro/apólice/segurado/reservas técnicas"; usa fiança, garantia, roteamento, fundo de reserva, convênio.

---

## 5. Glossário de telas e termos

- **Convênio B2B:** contrato único assinado pela empresa no onboarding; habilita o benefício, com trava de rescisão e cláusula de não-fiador.
- **Originação:** processo de nascimento do contrato de um PJ (8 passos); a parte mais lenta, conduzida pela Morada.
- **Split na fonte:** divisão automática da fatura (aluguel → proprietário primeiro, líquido → PJ, taxa → Morada, fundo de reserva).
- **Trava de rescisão:** retenção da última fatura no desligamento para cobrir até ~3 meses de aluguel.
- **Fundo de reserva:** parcela da taxa que vira colchão de risco (enquadrado como reserva do fiador — nunca "reservas técnicas").
- **Thin file:** PJ com vínculo novo/curto → risco maior, sinalizado por badge.
- **Status de originação:** estágio do PJ na timeline de 8 passos.
- **Custo incremental R$ 0:** mensagem persistente — o desembolso da empresa não muda.

---

*Documento-fonte de produto: `README.MD`. Esta spec cobre exclusivamente a Plataforma da Empresa. Apps do PJ, portal da imobiliária e console interno da Morada terão specs próprias.*
