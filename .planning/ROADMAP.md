# Roadmap — Personal Portfolio

## Milestone 1: MVP Portfolio (Foundation)

**Goal:** Functional, responsive portfolio with all core sections and deployable to GitHub Pages

### Phase 1.1: Project Scaffold & Design System

**Plans:** 3 plans

Plans:

- [x] 11-01-PLAN.md — Design tokens, fonts, boilerplate cleanup
- [x] 11-02-PLAN.md — Layout components, theme toggle, navigation shell
- [x] 11-03-PLAN.md — TypeScript data files, content directory placeholders

### Phase 1.2: Navigation & Shell

**Plans:** 3 plans

Plans:

- [x] 12-01-PLAN.md — Foundation: nav data, scroll hooks, NavLinks extension, SiteFooter
- [x] 12-02-PLAN.md — UI components: LenisProvider, MobileNav, SiteHeader
- [x] 12-03-PLAN.md — Layout integration: wire header/footer/Lenis into layout, section placeholders

### Phase 1.3: Hero Section

**Plans:** 4 plans

Plans:

- [x] 01.3-01-PLAN.md — HexagonBadge component (decorative hexagon with gradient border/glow)
- [x] 01.3-02-PLAN.md — HeroCtas component ("View Projects" + "Contact Me" buttons + "Download CV" link)
- [x] 01.3-03-PLAN.md — ScrollIndicator component with fade-on-scroll + CSS bounce-subtle animation
- [x] 01.3-04-PLAN.md — Hero composition + page.tsx integration (gradient name, tagline, split layout)

### Phase 1.4: About & Experience

**Plans:** 3/3 plans complete

Plans:

- [x] 01.4-01-PLAN.md — Data model update + About section components (narrative, stats, composition)
- [x] 01.4-02-PLAN.md — Experience timeline (entry component, timeline container, date formatting)
- [x] 01.4-03-PLAN.md — Page integration (wire About and Experience sections into page.tsx)

### Phase 1.5: Research Projects

**Plans:** 3 plans

Plans:
- [ ] 01.5-01-PLAN.md — Data model (Zod schema + typed projects) + Badge CVA extension (status colors)
- [ ] 01.5-02-PLAN.md — Core components: PaperLinkChip, FilterTabs, ResearchCard
- [ ] 01.5-03-PLAN.md — ResearchGrid composition (Suspense, crossfade, empty state) + page.tsx integration

### Phase 1.6: Skills & Contact

- [ ] Skills section with categorized tech tags
- [ ] Contact form component (using Formspree or Netlify Forms)
- [ ] Social links row (GitHub, LinkedIn, Google Scholar, Email)
- [ ] International format for form validation

### Phase 1.7: Polish & Deploy

- [ ] Responsive testing across breakpoints
- [ ] Performance audit (Lighthouse)
- [ ] Accessibility check (keyboard nav, screen reader, contrast)
- [ ] GitHub Actions workflow for static export + deploy to Pages
- [ ] Custom 404 page
- [ ] robots.txt and sitemap placeholder
- [ ] Go live

---

## Milestone 2: Blog Engine

**Goal:** Full blog system with markdown posts, tagging, and RSS

### Phase 2.1: Blog Infrastructure

- [ ] MDX integration (next-mdx-remote)
- [ ] Blog post data schema (frontmatter: title, date, tags, excerpt, cover)
- [ ] Blog directory structure (/content/blog/*.mdx)
- [ ] Syntax highlighting for code blocks
- [ ] Reading time estimation

### Phase 2.2: Blog UI

- [ ] Blog list page (cards with title, date, excerpt, tags)
- [ ] Individual post page with MDX rendering
- [ ] Tag filter / category pages
- [ ] Previous/Next post navigation
- [ ] Table of contents for long posts

### Phase 2.3: Blog Features

- [ ] RSS feed generation
- [ ] SEO per post (meta tags, Open Graph)
- [ ] Share buttons
- [ ] Blog archive / pagination

---

## Milestone 3: Research Lab Deep-Dive

**Goal:** Enhanced research section with lab context, publication tracking, and visual appeal

### Phase 3.1: Lab Profile

- [ ] Lab overview page
- [ ] Research areas and focus description
- [ ] Collaborator mentions
- [ ] Timeline of research journey

### Phase 3.2: Publication List

- [ ] Enhanced publication cards with citation info
- [ ] Links to arXiv, DOI, PDF
- [ ] Publication year filter
- [ ] "Latest publication" highlight

### Phase 3.3: Project Demonstrations

- [ ] Interactive demos for select ML projects
- [ ] Embeddable models/visualizations
- [ ] Code repository links

---

## Milestone 4: Polish & Advanced Features

**Goal:** Premium feel, performance optimization, internationalization

### Phase 4.1: Animations & Interactions

- [ ] Scroll-triggered animations (fade, slide-up for sections)
- [ ] Page transition animations
- [ ] 3D/WebGL elements (Three.js for hero or background)
- [ ] Hover effects on cards and links

### Phase 4.2: Performance & SEO

- [ ] Image optimization pipeline
- [ ] Lazy loading for below-fold content
- [ ] Structured data (JSON-LD Person, CreativeWork)
- [ ] Google Analytics or Plausible integration
- [ ] Lighthouse score optimization

### Phase 4.3: i18n (Future)

- [ ] Vietnamese/English bilingual support
- [ ] Locale detection and switcher
- [ ] Translated content management
- [ ] Localized SEO tags

---

## Current Focus

**Milestone 1, Phase 1.4** — About & Experience — 3 plans: data model + About components, Experience timeline, page integration.
<br>
*Phase 1.3 complete (2026-06-19): 4 plans, Hero composition, HexagonBadge, Ctas, ScrollIndicator.*
*Phase 1.2 complete (2026-06-19): 3 plans, nav/shell/layout integrated.*
*Phase 1.1 complete (2026-06-19): 3 plans, 12 files created, 21/21 must-haves verified.*
