# Technology Stack

**Analysis Date:** 2026-06-19

## Languages

**Primary:**
- TypeScript 5.x — All application code (`src/**/*.ts`, `src/**/*.tsx`)
- JavaScript (ESM) — Config files (`eslint.config.mjs`, `postcss.config.mjs`)

**Secondary:**
- CSS (Tailwind v4 syntax) — `src/app/globals.css` uses `@import` and `@theme inline` directives

## Runtime

**Environment:**
- Node.js 22 — Specified in `.github/workflows/deploy.yml` via `actions/setup-node`

**Package Manager:**
- npm (lockfile: `package-lock.json` present)

## Frameworks

**Core:**
- Next.js 16.2.9 — Static export framework (`output: "export"`), App Router structure
- React 19.2.4 — UI component library
- React DOM 19.2.4 — React DOM renderer

**Styling:**
- Tailwind CSS v4 — Utility-first CSS, configured via `@theme inline` in `src/app/globals.css`
- tw-animate-css 1.4.0 — Animation utilities imported in `globals.css`
- class-variance-authority 0.7.1 — Component variant system (used in `button.tsx`, `badge.tsx`, `navigation-menu.tsx`)
- tailwind-merge 3.6.0 — Class name deduplication in `cn()` utility

**UI Components:**
- shadcn/ui 4.11.0 — Component framework (via `shadcn` CLI, configured in `components.json`)
- @base-ui/react 1.6.0 — Headless UI primitives used by shadcn components (Avatar, Button, Dialog, NavigationMenu, Separator)

**Icons:**
- lucide-react 1.21.0 — Icon library (imported in `navigation-menu.tsx`, `sheet.tsx`)

**Fonts:**
- Geist (sans-serif) — Loaded via `next/font/google`, mapped to `--font-geist-sans`
- Geist Mono — Loaded via `next/font/google`, mapped to `--font-geist-mono`

**Linting/Formatting:**
- ESLint 9 — Configured via `eslint.config.mjs` with `eslint-config-next` (core-web-vitals + TypeScript rules)
- TypeScript strict mode — `tsconfig.json` sets `"strict": true`

**Build/Dev:**
- PostCSS — Configured via `postcss.config.mjs` with `@tailwindcss/postcss` plugin
- TypeScript incremental compilation enabled (`"incremental": true`)

## Key Dependencies

**Critical:**
- `next` 16.2.9 — Core framework; static export mode for GitHub Pages compatibility
- `react` 19.2.4 / `react-dom` 19.2.4 — Component rendering
- `tailwindcss` 4 — CSS framework with v4 configuration syntax
- `@base-ui/react` 1.6.0 — Headless component primitives that all shadcn/ui components depend on

**Infrastructure:**
- `clsx` 2.1.1 + `tailwind-merge` 3.6.0 — Class name merging via `cn()` utility in `src/lib/utils.ts`
- `class-variance-authority` 0.7.1 — Variant-driven component styling

## Configuration

**TypeScript** (`tsconfig.json`):
- Target: ES2017
- Strict mode enabled
- Module resolution: bundler
- JSX: react-jsx
- Path alias: `@/*` → `./src/*`
- Next.js plugin for type generation

**Next.js** (`next.config.ts`):
- Static export: `output: "export"`
- Images unoptimized (GitHub Pages incompatible with Next.js image optimization)
- Base path: `/Tony-portfolio` in production, empty in development
- Asset prefix: `/Tony-portfolio/` in production

**shadcn/ui** (`components.json`):
- Style: `base-nova`
- RSC enabled
- CSS variables enabled
- Base color: neutral
- Icon library: lucide
- Component aliases: `@/components`, `@/components/ui`, `@/lib`, `@/hooks`

**Tailwind CSS** (`src/app/globals.css`):
- Imported: `tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`
- Dark mode variant: `.dark` class selector
- Theme tokens defined via `@theme inline` (color, font, radius tokens)
- OKLCH color space for all color tokens
- Light and dark theme token sets defined in `:root` and `.dark` respectively

**ESLint** (`eslint.config.mjs`):
- Extends: `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`
- Ignores: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`

**PostCSS** (`postcss.config.mjs`):
- Single plugin: `@tailwindcss/postcss`

## Platform Requirements

**Development:**
- Node.js 22+ required (per CI workflow)
- npm for dependency management
- Port 3000 for dev server (`next dev`)

**Production:**
- Deploy target: GitHub Pages (`tonyhyge.github.io/Tony-portfolio`)
- Static site output (`./out/` directory)
- CI/CD: GitHub Actions workflow on push to `main` branch
- No server-side runtime — fully static

**Deploy Pipeline** (`.github/workflows/deploy.yml`):
1. Checkout → Setup Node 22 (npm cache) → `npm ci` → `npm run build`
2. Upload `./out/` as GitHub Pages artifact
3. Deploy to GitHub Pages environment

---

*Stack analysis: 2026-06-19*