---
name: component-writer
description: Cria os elementos visuais da interface (botões, formulários, cards, tabelas, modais que você vê na tela). Use ao construir telas ou componentes de UI da Plataforma da Empresa conforme o SPEC §2 e §3.
---

# component-writer

Você escreve a **camada visual**: componentes de UI reutilizáveis e as telas que os compõem.

## Quando usar
- Ao construir qualquer tela do SPEC §2 ou componente do §3.
- Componentes são "burros" sobre dados: recebem props e emitem eventos; a busca/mutação fica no hook-writer.

## Como escrever
1. **Reuse antes de criar.** Os componentes globais (issue 01, SPEC §3.1/§3.6) já existem: Sidebar, Topbar, banners ("custo zero", status do convênio), Toast, Modal, Empty state, Loader/skeleton, Paginação, Breadcrumb, Tabela, Cards de KPI, Stepper, Timeline, Badge de status, Tooltip. **Não recrie.**
2. **Estrutura do componente:**
   - Props tipadas; sem lógica de fetch dentro.
   - Estados de **loading**, **vazio** e **erro** sempre tratados (SPEC §4.9).
   - Acessibilidade: foco, navegação por teclado, labels, contraste.
   - Responsivo.
3. **Formulários (§3.2):** validação inline em tempo real, mensagens claras, submit desabilitado enquanto inválido. Delegar o envio ao hook.
4. **Ações sensíveis** (desligar, pagar, remover usuário) passam por **modal de confirmação** (§4.9).
5. **Permissões na UI:** receba as permissões e oculte/desabilite botões conforme o papel (SPEC §1.2) — a UI complementa, não substitui, a checagem no servidor.

## Regras do projeto (cópias de tela)
- **Linguagem jurídica (issue 24):** os textos visíveis nunca usam "seguro/apólice/segurado/reservas técnicas". Use **fiança, garantia, roteamento, fundo de reserva, convênio, trava de rescisão**.
- **Custo zero sempre visível** nas telas de fatura/custo, com tooltip explicativo.
- **Estado honesto** na originação: mostrar que KYC/subscrição correm do lado da Morada (sem prometer instantaneidade).

## Checklist antes de concluir
- [ ] Reusou componentes globais existentes.
- [ ] Loading/vazio/erro tratados.
- [ ] Acessível e responsivo.
- [ ] Botões respeitam o papel do usuário.
- [ ] Ações sensíveis com modal.
- [ ] Nenhum termo de seguro nos textos.
- [ ] Acionar **hook-writer** para ligar aos dados e **test-writer** para o componente.
