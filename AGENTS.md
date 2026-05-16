# AGENTS.md — web-pf-ts

Vue 3 + Vite 8 SPA with TypeScript, Pinia, and Vue Router. Student/final project.

## Commands

| Command | What it does |
|---------|-------------|
| `pnpm dev` | Vite dev server (HMR) |
| `pnpm build` | `vue-tsc --build` → `vite build` (type errors block build) |
| `pnpm type-check` | `vue-tsc --build` only (incremental, uses `tsBuildInfoFile`) |
| `pnpm lint` | `oxlint . --fix` then `eslint . --fix --cache` (in order) |
| `pnpm format` | `prettier --write --experimental-cli src/` |

- **pnpm only.** No npm/yarn. Lockfile is `pnpm-lock.yaml`.
- **No test command exists.** No vitest, jest, or other test runner. The `CLAUDE.md` references `npm test` but it doesn't exist in `package.json`.
- **Node.js**: `^20.19.0 || >=22.12.0`

## Toolchain quirks

- **Prettier requires `--experimental-cli` flag.** Standard `prettier --write` won't work; use `pnpm format`.
- **Type-check uses build mode** (`vue-tsc --build`), not `--noEmit`. Uses project references from root `tsconfig.json`. Incremental cache in `node_modules/.tmp/`.
- **Three tsconfig files**: root (`tsconfig.json`) with references to `tsconfig.app.json` (app code) and `tsconfig.node.json` (build/config code like `vite.config.ts`, `eslint.config.ts`).
- **Lint order matters**: oxlint runs first (`--fix`), then eslint. ESLint config pulls oxlint rules via `buildFromOxlintConfigFile('.oxlintrc.json')`.
- **ESLint uses flat config** (`eslint.config.ts` with `jiti` for TypeScript config loading).
- **ESLint cache** is at `.eslintcache` (gitignored).
- **VSCode**: format on save via Prettier. Fix-all on save. Extensions: Volar, ESLint, EditorConfig, oxc, Prettier.

## Architecture

```
src/
├── main.ts          # createApp → Pinia → Router → mount('#app')
├── App.vue          # Root: header nav (RouterLink) + RouterView
├── router/index.ts  # createRouter, lazy-loads /about route
├── stores/          # Pinia stores (Composition API: defineStore('name', () => {…}))
├── views/           # Route-level components (HomeView, AboutView)
├── components/      # Shared components
│   └── icons/       # SVG icon components
└── assets/
    ├── base.css     # Design tokens (Vue theme), dark mode via prefers-color-scheme
    └── main.css     # App layout, #app grid at >=1024px
```

- **Path alias**: `@/` → `./src/` (configured in both `vite.config.ts` and `tsconfig.app.json`)
- **Router uses code splitting**: only HomeView is eagerly loaded. All others use dynamic `() => import()`.
- **Pinia stores follow Composition API pattern**: `export const useXStore = defineStore('x', () => { … return { state, getters, actions } })`
- **CSS**: scoped styles in SFCs (`<style scoped>`). Global styles in `src/assets/`.

## TypeScript

- **Strict indexed access**: `noUncheckedIndexedAccess: true` in `tsconfig.app.json`. Array/object indexing returns `T | undefined`. Always handle the undefined case.
- **Vue SFC types**: handled by `vue-tsc` + Volar extension. Standard `tsc` can't parse `.vue` files.
- **env.d.ts**: only `/// <reference types="vite/client" />` — no custom type declarations yet.

## Style conventions

- 2-space indent, LF line endings, UTF-8, trailing whitespace trimmed (EditorConfig)
- No semicolons, single quotes, 100 char print width (Prettier)
- Vue SFCs use `<script setup lang="ts">` with Composition API
- Max file length: 500 lines (from CLAUDE.md rule)

## Not in this repo

- **No testing framework.** Add vitest if testing is needed.
- **No CI/CD.** No GitHub Actions, no workflows.
- **No SSR.** Client-side SPA only.
- **No env files.** No `.env` or environment variable loading.
