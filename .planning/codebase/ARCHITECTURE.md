# Architecture

**Analysis Date:** 2026-06-19

## Pattern Overview

**Overall:** Static Site Generation (SSG) with Next.js App Router

**Key Characteristics:**
- Static export (`output: "export"`) producing a fully static HTML/CSS/JS bundle
- Single-page portfolio with MDX-based content sections (blog, research)
- Dark mode via `.dark` class on `<html>`
- Zero external API dependencies — no backend, no serverless functions
- Deployed to GitHub Pages

## Layers

**Presentation (UI Components):**
- Purpose: Reusable UI primitives and portfolio-specific components
- Location: `src/components/`
- Contains: shadcn/ui base components (`src/components/ui/`), portfolio feature components (to be added)
- Depends on: Tailwind CSS, `@/lib/utils` (cn helper)
- Used by: Page templates in `src/app/`

**App (Pages/Routes):**
- Purpose: Route definitions and page composition
- Location: `src/app/`
- Contains: `layout.tsx` (root layout), `page.tsx` (home page), `globals.css` (styles)
- Depends on: UI components, fonts via `next/font`
- Used by: Next.js router

**Styles:**
- Purpose: Global CSS tokens, theme configuration
- Location: `src/app/globals.css`
- Contains: Tailwind v4 directives, CSS custom properties for theme tokens
- Depends on: Tailwind CSS v4

**Content (Data):**
- Purpose: MDX content files (blog posts, research projects)
- Location: `content/blog/`, `content/research/` (directories to be created)
- Contains: `.mdx` files with frontmatter metadata
- Used by: Page components at build time via `next-mdx-remote`

**Build/Deploy:**
- Purpose: Static export and GitHub Pages deployment
- Location: `next.config.ts`, `.github/workflows/deploy.yml`
- Contains: Next.js config with static export, GitHub Actions workflow

## Data Flow

**Page Render (Static Build):**

1. Next.js reads `src/app/layout.tsx` and `src/app/page.tsx`
2. MDX content files are imported and parsed at build time
3. Components compose MDX content with UI primitives
4. `npm run build` produces static HTML/CSS/JS in `./out/`
5. GitHub Actions uploads `./out/` to GitHub Pages

**State Management:**
- No client-side state management library
- Theme toggling via `.dark` class on `<html>`
- URL-based state for filters/navigation (to be added)
- Server state: MDX files parsed at build time

## Key Abstractions

**Component Pattern:**
- Function components with explicit prop interfaces
- No `React.FC` usage
- Props typed via `interface` or `type`
- Example: `src/components/ui/card.tsx` — compound component pattern with `Card`, `CardHeader`, `CardTitle`, etc.

**Class Merging:**
- Utility: `src/lib/utils.ts` provides `cn()` for Tailwind class merging
- Uses `clsx` and `tailwind-merge`

**Font System:**
- Google Fonts via `next/font` (Geist Sans, Geist Mono)
- Assigned to CSS variables (`--font-geist-sans`, `--font-geist-mono`)
- Applied via `className` on `<html>` in `src/app/layout.tsx`

## Entry Points

**Root Layout (`src/app/layout.tsx`):**
- Triggers: All page renders
- Responsibilities: Font loading, metadata, dark mode class, global CSS import, body wrapper

**Home Page (`src/app/page.tsx`):**
- Triggers: Route `/`
- Responsibilities: Currently default Next.js starter (to be replaced with portfolio sections)

**Build Config (`next.config.ts`):**
- Triggers: `npm run build`
- Responsibilities: Static export, GitHub Pages base path configuration, image optimization disable

## Error Handling

**Strategy:** Minimal — static site with no runtime data fetching

**Patterns:**
- No API routes (static export)
- No error boundaries currently implemented
- No 404/not-found page currently implemented
- Build-time errors surface via TypeScript/ESLint

## Cross-Cutting Concerns

**Logging:** None required (static site)

**Validation:** None required (no user input, no API routes)

**Authentication:** Not applicable (public portfolio site)

**Accessibility:** shadcn/ui components include ARIA attributes. Additional a11y requirements per user rules (keyboard navigation, reduced-motion behavior, color contrast).

---

*Architecture analysis: 2026-06-19*
