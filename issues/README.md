# Issues — Plataforma da Empresa (Morada)

Backlog derivado do `SPEC.MD`. Cada issue é uma fatia de trabalho com critérios de aceite próprios.
Fonte de verdade do produto: `../SPEC.MD` e `../README.MD`.

## Convenções

- **Épicos** agrupam issues por área funcional.
- Cada issue referencia a(s) seção(ões) correspondente(s) do SPEC.
- Estimativa em tamanho relativo: `P` (pequena), `M` (média), `G` (grande).
- Ordem sugerida segue dependências (fundação → auth → onboarding → features).

## Índice

### Épico 0 — Fundação
| # | Issue | Tam | SPEC |
|---|-------|-----|------|
| 00 | [Setup do projeto e infraestrutura base](./00-setup-projeto-infra.md) | M | §1.3, §1.4 |
| 01 | [Design system e componentes globais de layout](./01-design-system-componentes-globais.md) | G | §3.1, §3.3 |
| 02 | [Modelo de papéis, permissões e controle de acesso](./02-papeis-permissoes-rbac.md) | M | §1.2, §4.9 |

### Épico 1 — Autenticação
| # | Issue | Tam | SPEC |
|---|-------|-----|------|
| 03 | [Login](./03-login.md) | M | §2.1, §4.1 |
| 04 | [Criar conta da empresa (signup)](./04-signup-conta-empresa.md) | M | §2.2, §4.1 |
| 05 | [Recuperação de senha](./05-recuperacao-senha.md) | P | §2.3, §4.1 |
| 06 | [Aceitar convite de usuário](./06-aceitar-convite.md) | P | §2.4, §4.1 |

### Épico 2 — Onboarding da empresa
| # | Issue | Tam | SPEC |
|---|-------|-----|------|
| 07 | [Wizard de onboarding (KYC + faturamento + convênio)](./07-onboarding-wizard.md) | G | §2.5, §4.2 |

### Épico 3 — Dashboard
| # | Issue | Tam | SPEC |
|---|-------|-----|------|
| 08 | [Dashboard com KPIs e pendências](./08-dashboard.md) | M | §2.6 |

### Épico 4 — Colaboradores PJ
| # | Issue | Tam | SPEC |
|---|-------|-----|------|
| 09 | [Lista de colaboradores PJ](./09-colaboradores-lista.md) | M | §2.7, §4.3 |
| 10 | [Cadastrar/convidar colaborador PJ](./10-colaboradores-cadastro.md) | M | §2.8, §4.3 |
| 11 | [Detalhe do colaborador + timeline de originação](./11-colaboradores-detalhe.md) | G | §2.9, §4.3 |
| 12 | [Desligamento com trava de rescisão](./12-desligamento-trava-rescisao.md) | M | §2.10, §4.4 |

### Épico 5 — Contratos / garantias
| # | Issue | Tam | SPEC |
|---|-------|-----|------|
| 13 | [Lista de contratos/garantias](./13-contratos-lista.md) | P | §2.11, §4.6 |
| 14 | [Detalhe do contrato (garantia + locação + split)](./14-contratos-detalhe.md) | M | §2.12, §4.6 |

### Épico 6 — Faturas e pagamento
| # | Issue | Tam | SPEC |
|---|-------|-----|------|
| 15 | [Lista de faturas](./15-faturas-lista.md) | P | §2.13, §4.5 |
| 16 | [Detalhe da fatura + pagamento + split](./16-faturas-detalhe-pagamento.md) | G | §2.14, §4.5 |

### Épico 7 — Relatórios e documentos
| # | Issue | Tam | SPEC |
|---|-------|-----|------|
| 17 | [Relatórios e exportações](./17-relatorios.md) | M | §2.15, §4.7 |
| 18 | [Documentos da empresa](./18-documentos.md) | P | §2.16, §4.6 |

### Épico 8 — Configurações e suporte
| # | Issue | Tam | SPEC |
|---|-------|-----|------|
| 19 | [Configurações: empresa, faturamento, segurança](./19-configuracoes-conta.md) | M | §2.17, §4.8 |
| 20 | [Configurações: gestão de usuários e papéis](./20-configuracoes-usuarios.md) | M | §2.17, §4.8 |
| 21 | [Central de ajuda / FAQ / contato comercial](./21-ajuda-faq.md) | P | §2.18 |

### Épico 9 — Transversais
| # | Issue | Tam | SPEC |
|---|-------|-----|------|
| 22 | [Sistema de notificações (in-app + e-mail)](./22-notificacoes.md) | M | §4.9 |
| 23 | [Trilha de auditoria](./23-trilha-auditoria.md) | M | §1.4, §4.9 |
| 24 | [Guarda de linguagem jurídica segura](./24-guarda-linguagem-juridica.md) | P | §1.4, §4.9 |

---

**Total: 25 issues** (00–24).
