# Assets — Plataforma da Empresa (Morada)

Arquivos estáticos do front-end (imagens, ícones, logos, fontes locais).
Diretrizes de uso visual: `../references/design.md`.

## Estrutura

```
assets/
├── images/      imagens e logos
│   └── logo.png   símbolo da Morada (casa + brilho), branco sobre coral
├── icons/        ícones de UI (a adicionar)
└── fonts/        fontes self-hosted, se necessário (a adicionar)
```

## Logo

- `images/logo.png` — marca/símbolo principal. Casa com "brilho" em branco sobre fundo **coral `#E9744B`** (token `--coral`, ver `../references/design.md` §3.1).

### Pendências de logo (sugestão)
Para uso flexível no painel, vale adicionar depois:
- Versão **monocromática** (símbolo em `--pine`/`--ink` para fundos claros, e em branco para fundos escuros).
- Versão **transparente** (PNG/SVG sem o fundo coral).
- **SVG** do símbolo (escalável, ideal para sidebar/topbar e favicon).
- **Favicon** e ícones de app.

## Convenções
- Prefira **SVG** para logos e ícones (escalável, leve).
- Nomes em kebab-case e descritivos (`logo-mono-pine.svg`).
- Otimize imagens (sem metadados desnecessários) antes de commitar.
