# External Integrations

**Analysis Date:** 2026-06-19

## APIs & External Services

**Fonts:**
- Google Fonts (via `next/font/google`) — Geist and Geist Mono font families
  - SDK/Client: Built into Next.js (auto-optimized font loading)
  - Auth: None required (public API)

**Icons:**
- Lucide Icons — Icon library imported as React components (`lucide-react`)
  - SDK/Client: `lucide-react` npm package
  - Auth: None required

## Data Storage

**Databases:**
- Not applicable — Static site with no database

**File Storage:**
- Local filesystem only — Static assets in `public/` directory
- Blog content: MDX files expected in `/content/blog/` (referenced in CLAUDE.md conventions, directory not yet created)
- Research content: MDX files expected in `/content/research/` (referenced in CLAUDE.md conventions, directory not yet created)

**Caching:**
- None — Static site served from CDN (GitHub Pages)

## Authentication & Identity

**Auth Provider:**
- None — No authentication required for this portfolio site

## Monitoring & Observability

**Error Tracking:**
- None

**Logs:**
- Not applicable — Static site with no server-side logging
- ESLint core-web-vitals rules enforced during build as static quality gate

## CI/CD & Deployment

**Hosting:**
- GitHub Pages — `https://tonyhyge.github.io/Tony-portfolio/`

**CI Pipeline:**
- GitHub Actions — `.github/workflows/deploy.yml`
  - Trigger: Push to `main` branch or manual dispatch
  - Runner: `ubuntu-latest` with Node.js 22
  - Steps: `npm ci` → `npm run build` → upload artifact → deploy pages
  - Concurrency: Single pages deployment, cancel in-progress disabled
  - Permissions: `contents: read`, `pages: write`, `id-token: write`

## Environment Configuration

**Required env vars:**
- None detected — No `.env` files present, no environment variable references in source code

**Secrets location:**
- Not applicable — No secrets required

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Content Pipeline

**MDX Content:**
- Blog posts: `content/blog/<slug>.mdx` with frontmatter (title, date, tags, excerpt)
- Research projects: `content/research/<slug>.mdx` with frontmatter + status
- Note: MDX is referenced in project conventions (CLAUDE.md) but no MDX dependencies (`@mdx-js/loader`, `next-mdx-remote`, `contentlayer`) are currently installed
- Content rendering pipeline not yet implemented in codebase

---

*Integration audit: 2026-06-19*