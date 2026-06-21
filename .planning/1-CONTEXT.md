# Phase 1 Context — Project Scaffold & Design System

> Locked decisions, code context, and domain context for Phase 1.1 implementer.

## Team
- **Owner:** solo developer (AI student / AI Engineer)
- **Domain:** Static portfolio site, single developer, no backend

## Locked Decisions

### Design System
- **Fonts:** Inter (body) + JetBrains Mono (code) — loaded via next/font/google
- **Accent palette:** Cyan/teal/violet gradient tones (AI + modern research feel)
  - Primary accent: `oklch(0.65 0.18 210)` (cyan-teal)
  - Secondary: `oklch(0.55 0.15 280)` (violet)
  - Gradient hero: cyan → violet diagonal
- **Dark mode:** Default, `.dark` class toggle with localStorage persistence + system preference respect
- **Border radius:** Keep shadcn default `0.625rem` — consistent with existing components

### Typography System
- **Headings:** Font heading → Inter (weight 600/700)
- **Body:** Inter (weight 400/500)
- **Code/mono:** JetBrains Mono (weight 400)
- **Scale:** `text-xs` (12px) → `text-5xl` (48px) via Tailwind defaults

### Color Tokens (added to globals.css)
```
:root {
  --accent: oklch(0.65 0.18 210);
  --accent-foreground: oklch(0.98 0 0);
  --accent-secondary: oklch(0.55 0.15 280);
  --gradient-1: linear-gradient(135deg, oklch(0.65 0.18 210), oklch(0.55 0.15 280));
}
.dark {
  /* Dark mode accent stays the same but appears more vibrant */
}
```

### Layout Architecture
- **Hybrid layout:**
  - Home page (single-page scroll): Hero → About → Experience → Skills → Contact
  - Research page: `/research` — dedicated page for lab projects
  - Blog: `/blog` — dedicated page (Milestone 2)
- **Navigation:** Sticky header with smooth-scroll anchor links for home sections + page links for Research/Blog

### Hero Section (MVP)
- **Background:** CSS gradient mesh animation (no Three.js for MVP)
  - Animated using Tailwind's `animate-` utilities or CSS `@keyframes`
  - Gradient mesh: cyan → violet → deep blue, slow pan/rotate
  - ~5KB, no extra dependency, performant
- **Content:** Name, title, tagline, avatar placeholder, CTAs
- **Avatar:** Circular, placeholder silhouette (user will add photo later)
- **Interactive Terminal Widget:** Mini terminal nhúng trong hero
  - Commands: help, about, projects, skills, contact
  - CSS + JS thuần (no library)
  - Typewriter effect output, blinking cursor
  - Sẽ toggle/auto-show khi scroll

### Content & Data
- **Display name:** Phạm Quang Minh (Tony) — full name + nickname
- **Hero tagline:** "Engineering AI, Advancing Research"
- **University:** Van Lang University — AI major, 4th year
- **Language:** English throughout (for international academic/recruiter audience)
- **Section order (home page):** Hero → About → Experience → Research → Skills → Contact
- **About section:** Include personal interests (Music, knowledge-seeking, deep talks, science talks, gaming)
- **CV button:** Yes, include "Download CV" button with placeholder link — user will provide PDF later
- **Experience data:** Hardcoded TypeScript objects in `src/app/data/experience.ts`
  - **AILOGY — AI Engineer:**
    - Intern: June 2025 → September 2025
    - Probation → Full-time: September 2025 → Present
    - Scope: OCR fine-tuning, MLOPs, LLM, chatbot, E2E pipelines, production E2E
  - **VLU — CSaC Lab — Research Member**
- **Research data:** `src/app/data/research.ts`
  - **1. Wood-Leaf Segmentation** — Point cloud segmentation (in-progress)
  - **2. DRL for RIS-aided mmWave MIMO** — Wireless + RL (in-progress)
  - **3. (Published — first author):** "Fruit Ripeness Detection: A Comparative Analysis of State-of-the-Art YOLO Models" — Authors: Pham Quang Minh, Lang Nhat Tan, Ngo Hoang Tu, Nguyen Thai Anh — IEEE Dec 2025, Xplore Feb 2026 — https://ieeexplore.ieee.org/abstract/document/11365044/
  - **4. OCR at AILOGY** — fine-tuning, MLOPs, optimization
- **Skills data:** `src/app/data/skills.ts` — simple tags format
  - AI/ML: Python, PyTorch, TensorFlow, YOLO, OpenCV, Scikit-learn, LangChain, Transformers
  - DevOps: Docker, Linux Admin, Nginx, AWS, Cloudflare DNS, Tailscale, CI/CD, Self-hosting
  - Backend/Tools: FastAPI, PostgreSQL, MongoDB, Git, MLflow, GitHub Actions
  - ERP: Odoo (self-hosted E2E production for company)
  - Languages: Python, TypeScript/JavaScript
- **Social links:**
  - GitHub: github.com/tonyhyge
  - LinkedIn: linkedin.com/in/minhtony/
  - Google Scholar: scholar.google.com/citations?user=U81x5SoAAAAJ
  - Email: minhphamtony@gmail.com

### AI-Ready Features (Phase 1)
- **JSON-LD structured data:** Schema.org Person + ScholarlyArticle + SoftwareSourceCode
- **llms.txt:** Auto-generated manifest for AI crawlers (GPTBot, ClaudeBot, PerplexityBot)
- **Meta tags:** Open Graph + Twitter Card optimized per page
- **Sitemap:** next-sitemap with proper lastmod

### Content Philosophy
- Experience section: quantify results where possible (% optimization, metrics) — details to be discussed when coding Phase 1.4
- Research section: each project has title, venue, status, abstract, link (paper/code)
- Research projects have dedicated pages (`/research/<slug>`) with abstract, BibTeX, figures, and links
- BibTeX citation button on each research page
- All content in English — serves both international recruiters and academic audiences
- Portfolio goal: balanced between industry (job applications) and academic (PhD/research) — equally important in the next 1 year

### Personal Branding
- **Monogram:** "T" (Tony) favicon/logo for brand identity
- **Profile photo:** User has one ready, will provide when Hero section is built
- **Footer:** Auto-generated "Last updated: <date>" from git commit history

### Deferred Features (recorded from discussion)
- Testimonials section → when user has recommendations/references to share
- Umami analytics → Phase 4 (after MVP launched)

### Component Structure
- Uses existing shadcn/ui components (Button, Card, Badge, Sheet, Avatar, Separator)
- @base-ui/react already installed as dependency — use it where shadcn wraps it
- **Additional libraries for MVP:**
  - **Motion** (formerly Framer Motion) — scroll-reveal animations, page transitions, hover effects
  - **Lenis v2** — smooth scrolling for native-app feel
- No additional UI library needed — shadcn/ui is sufficient

### Deployment
- GitHub Pages via Next.js static export (already configured)
- `basePath: "/Tony-portfolio"` (matches repo name)
- Image optimization disabled (unoptimized: true)

## Deferred Ideas (not in Phase 1)
- Three.js particle system → Phase 4.1
- Blog engine → Milestone 2
- MDX content pipeline → Milestone 2
- i18n (Vietnamese/English) → Future milestone
- Google Scholar API integration → Future milestone
- Contact form (Web3Forms or Formspree) → Phase 1.6
- Interactive terminal widget → Phase 1.3 (Hero)
- GitHub activity embed → Deferred (post-MVP)
- Custom domain (tonypham.dev) → Deferred (post-MVP)
- Umami analytics → Phase 4 (post-MVP)
- Testimonials section → When user has recommendations
- Blog posts → Mixed: paper reviews + technical tutorials

## Code Context

### Existing shadcn Components Ready to Use
| Component | File | Notes |
|-----------|------|-------|
| Button | `src/components/ui/button.tsx` | Has 5 variants, 8 sizes — more than enough |
| Card | `src/components/ui/card.tsx` | Card + Header + Title + Description + Content + Footer + Action |
| Badge | `src/components/ui/badge.tsx` | 5 variants — perfect for research status tags |
| Sheet | `src/components/ui/sheet.tsx` | Mobile nav menu (slide from right) |
| Avatar | `src/components/ui/avatar.tsx` | Profile photo with fallback |
| Separator | `src/components/ui/separator.tsx` | Section dividers |
| NavigationMenu | `src/components/ui/navigation-menu.tsx` | Desktop nav — but may be overkill for single-page; custom simple nav may be better |

### Tech Versions
- Next.js 16.2.9 (static export)
- React 19.2.4
- Tailwind CSS v4 (PostCSS variant)
- Base UI React ^1.6.0
- TypeScript strict mode
- lucide-react for icons

### Key Files
- `next.config.ts` — static export, basePath set, image optimization off
- `src/app/globals.css` — Tailwind v4 theme, shadcn CSS vars, dark/light mode
- `components.json` — shadcn config

## Specifics to Build (Phase 1.1)

### 1. Theme Toggle Component
- `src/components/theme-toggle.tsx`
- "use client" component
- Toggle button (Sun/Moon icons from lucide-react)
- `localStorage` key: `theme`
- Respect `prefers-color-scheme` on first load
- Toggle `.dark` class on `<html>` element

### 2. Container & Section Layout Components
- `src/components/section.tsx` — reusable section wrapper with id, title, spacing
- `src/components/container.tsx` — max-width container (1280px default)

### 3. Font Configuration
- Update `src/app/layout.tsx`:
  - Replace Geist with Inter (body) + JetBrains Mono (code)
  - Add font heading CSS variable
  - Update metadata: title = "Phạm Quang Minh (Tony) — AI Engineer & Researcher"

### 4. CSS Custom Properties for Accent
- Add accent colors, gradient tokens to `globals.css`
- Add font heading variable

### 5. Data Files (skeleton with placeholder content)
- `src/app/data/experience.ts` — AILOGY + CSaC Lab
- `src/app/data/research.ts` — 3-4 projects with titles, statuses, links
- `src/app/data/skills.ts` — categorized tags format

### 6. Directory Structure for Content (placeholder for M2)
- `content/blog/` — empty, ready for Milestone 2
- `content/research/` — empty, ready for Milestone 2

### 7. SEO & AI-Ready Setup
- `src/app/robots.ts` — allow GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot
- `src/app/sitemap.ts` — dynamic sitemap generation
- JSON-LD schema in layout (Person) and per-section (ScholarlyArticle for research)
- `public/llms.txt` — AI crawler manifest (regenerated on build)
- Open Graph + Twitter Card meta tags in layout.tsx

### 8. 404 Page
- `src/app/not-found.tsx` — custom 404 with link back to home
