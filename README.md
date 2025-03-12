# Winter Arc

Este é um projeto monorepo que contém as seguintes aplicações:

- `apps/frontend`: Aplicação frontend em Next.js
- `apps/backend`: API backend em Node.js/Express
- `packages/shared`: Pacote compartilhado entre frontend e backend

## Requisitos

- Node.js >= 18.18.0
- pnpm >= 10.6.2

## Instalação

```bash
pnpm install
```

## Desenvolvimento

Para executar todos os projetos em modo de desenvolvimento:

```bash
pnpm dev
```

Para executar um projeto específico:

```bash
# Frontend
pnpm --filter @winter-arc/frontend dev

# Backend
pnpm --filter @winter-arc/backend dev
```

## Build

Para fazer o build de todos os projetos:

```bash
pnpm build
```

## Estrutura do Projeto

```
.
├── apps/
│   ├── frontend/     # Aplicação Next.js
│   └── backend/      # API Express
├── packages/
│   └── shared/       # Código compartilhado
└── pnpm-workspace.yaml
``` 