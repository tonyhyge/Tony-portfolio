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

### Content & Data
- **Experience data:** Hardcoded TypeScript objects in `src/app/data/experience.ts` for now (will be MDX in later phase)
- **Research data:** Same pattern — `src/app/data/research.ts`
- **Skills data:** `src/app/data/skills.ts`
- **Language:** English throughout (for international academic/recruiter audience)
- **Section order (home page):** Hero → About → Experience → Research → Skills → Contact (story-first: student → engineer → researcher)
- **CV button:** Yes, include "Download CV" button with placeholder link — user will provide PDF later

### Component Structure
- Uses existing shadcn/ui components (Button, Card, Badge, Sheet, Avatar, Separator)
- @base-ui/react already installed as dependency — use it where shadcn wraps it
- No additional UI library needed for MVP

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
- Form backend (Formspree/Netlify Forms) → Phase 1.6 when Contact form is built

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
  - Update CSS variables accordingly

### 4. CSS Custom Properties for Accent
- Add accent colors, gradient tokens to `globals.css`
- Add font heading variable

### 5. Data Files
- `src/app/data/experience.ts`
- `src/app/data/research.ts`
- `src/app/data/skills.ts`

### 6. Directory Structure for Content (placeholder for M2)
- `content/blog/` — empty, ready for Milestone 2
- `content/research/` — empty, ready for Milestone 2
