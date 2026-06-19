# Codebase Structure

**Analysis Date:** 2026-06-19

## Directory Layout

```
/Users/minhpham/Claude/Projects/personal portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions → GitHub Pages
├── .planning/                      # GSD project management
│   ├── codebase/                   # Codebase analysis docs
│   ├── config.json                 # GSD configuration
│   ├── 1-CONTEXT.md                # Project context
│   └── STATE.md                    # Project state
├── public/                         # Static assets
│   ├── file.svg                    # Default starter assets
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/
│   │   ├── globals.css             # Tailwind v4 + theme tokens
│   │   ├── layout.tsx              # Root layout (fonts, metadata)
│   │   └── page.tsx                # Home page (single-page portfolio)
│   ├── components/
│   │   └── ui/                     # shadcn/ui components
│   │       ├── avatar.tsx          # Avatar compound component
│   │       ├── badge.tsx           # Badge component
│   │       ├── button.tsx          # Button component
│   │       ├── card.tsx            # Card compound component
│   │       ├── navigation-menu.tsx # Navigation menu
│   │       ├── separator.tsx       # Separator component
│   │       └── sheet.tsx           # Sheet/drawer component
│   └── lib/
│       └── utils.ts                # cn() class merging utility
├── content/                        # MDX content (to be created)
├── next.config.ts                  # Next.js config (static export)
├── next-env.d.ts                   # Next.js type declarations
├── tailwind.config.ts              # Tailwind theme customization
├── tsconfig.json                   # TypeScript strict mode config
├── eslint.config.mjs               # ESLint configuration
├── postcss.config.mjs              # PostCSS configuration
├── components.json                 # shadcn/ui component registry config
├── package.json                    # Dependencies and scripts
├── CLAUDE.md                       # Project instructions
├── PROJECT.md                      # Project documentation
├── README.md                       # Project readme
├── REQUIREMENTS.md                 # Requirements doc
└── ROADMAP.md                      # Project roadmap
```

## Directory Purposes

**`src/app/`:**
- Purpose: Next.js App Router pages and layouts
- Contains: Route definitions, global styles, root layout
- Key files: `layout.tsx` (root layout), `page.tsx` (home page), `globals.css` (styles)

**`src/components/ui/`:**
- Purpose: Reusable UI primitives (shadcn/ui)
- Contains: Compound components built from base-ui primitives
- Key files: `card.tsx`, `button.tsx`, `navigation-menu.tsx`
- Convention: Each component in its own file, exported individually

**`src/lib/`:**
- Purpose: Shared utilities and helpers
- Contains: `cn()` for class name merging
- Key files: `utils.ts`

**`public/`:**
- Purpose: Static assets served as-is
- Contains: Images, icons, fonts (to be replaced with portfolio assets)

**`content/`:**
- Purpose: MDX content files (to be created)
- Contains: Blog posts (`content/blog/`), research projects (`content/research/`)

**`.github/workflows/`:**
- Purpose: CI/CD pipelines
- Contains: `deploy.yml` for GitHub Pages deployment

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: Root layout with font loading and metadata
- `src/app/page.tsx`: Home page route (currently Next.js starter template)

**Configuration:**
- `next.config.ts`: Static export config, GitHub Pages base path
- `tailwind.config.ts`: Theme tokens and customization
- `tsconfig.json`: TypeScript strict mode with `@/*` path alias
- `eslint.config.mjs`: ESLint rules
- `postcss.config.mjs`: PostCSS pipeline
- `components.json`: shadcn/ui registry configuration

**Core Logic:**
- `src/lib/utils.ts`: `cn()` utility for Tailwind class merging (clsx + tailwind-merge)

**Deployment:**
- `.github/workflows/deploy.yml`: GitHub Actions workflow for Pages deployment
- `package.json`: Scripts (`dev`, `build`, `start`, `lint`)

## Naming Conventions

**Files:**
- Components: PascalCase (`Card.tsx`, `NavigationMenu.tsx`)
- Utilities: camelCase (`utils.ts`)
- Config files: kebab-case (`next.config.ts`, `tailwind.config.ts`)
- Styles: kebab-case (`globals.css`)

**Directories:**
- Feature directories: kebab-case (`ui/`, `components/`)
- Route directories: kebab-case (Next.js App Router convention)

**Components:**
- Compound components use sub-components within same file (`Card`, `CardHeader`, `CardTitle`, etc.)
- Export individual components, not barrel exports from index files (currently)
- Use `"use client"` directive for client-side components (e.g., `avatar.tsx`)

**CSS:**
- CSS custom properties for theme tokens (`--font-geist-sans`, etc.)
- Tailwind utility classes with custom property references (`bg-(--color-surface)`)
- Data attributes for component state (`data-slot`, `data-size`)

## Where to Add New Code

**New Portfolio Section Component:**
- Implementation: `src/components/hero/Hero.tsx` (or similar feature directory)
- Styles: Co-located CSS or Tailwind classes
- Tests: Co-located or `src/__tests__/`

**New shadcn/ui Component:**
- Implementation: `src/components/ui/<component>.tsx`
- Run: `npx shadcn@latest add <component>`

**New Route/Page:**
- Implementation: `src/app/<route>/page.tsx`
- Layout: `src/app/<route>/layout.tsx` (optional)

**New Utility:**
- Shared helpers: `src/lib/<helper>.ts`
- Import via: `@/lib/<helper>`

**New Blog Post:**
- Location: `content/blog/<slug>.mdx`
- Requires: Frontmatter (title, date, tags, excerpt)

**New Research Project:**
- Location: `content/research/<slug>.mdx`
- Requires: Frontmatter with status field

**Static Assets:**
- Images: `public/images/`
- Icons: `public/icons/`

## Special Directories

**`.next/`:**
- Purpose: Next.js build cache and dev server output
- Generated: Yes (on `npm run dev` or `npm run build`)
- Committed: No (in `.gitignore`)

**`out/`:**
- Purpose: Static export output for deployment
- Generated: Yes (on `npm run build`)
- Committed: No (in `.gitignore`)

**`node_modules/`:**
- Purpose: Installed dependencies
- Generated: Yes (on `npm install`)
- Committed: No (in `.gitignore`)

**`.planning/`:**
- Purpose: GSD project management artifacts
- Generated: Yes (by GSD commands)
- Committed: Yes

---

*Structure analysis: 2026-06-19*
