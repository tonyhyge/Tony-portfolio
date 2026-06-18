# Minh's Personal Portfolio

## Project Overview

A personal portfolio website for a 4th-year AI student who works as an AI Engineer/Researcher (~1 year experience) and is part of a research lab working toward publications. The portfolio bridges the gap between industry AI engineering work and academic research, presenting both sides cohesively.

## Vision

A living portfolio that grows with the user's career — not just a static showcase but a regularly updated hub for:
- Research progress, ongoing experiments, and published papers
- Engineering projects, open-source contributions
- Technical blog posts and write-ups
- Professional experience and skills

The design blends **modern tech aesthetics (60-70%)** with **academic professionalism (30-40%)** — clean, dark-mode-first, with subtle interactive elements that reflect an AI engineer's craft.

## Target Audience

- **Academic peers & professors** — research lab collaborators, conference reviewers
- **Tech recruiters & hiring managers** — AI/ML engineering roles
- **Research community** — readers of published papers and blog posts
- **Fellow developers** — open-source contributors, collaborators

## User Profile

| Attribute | Detail |
|-----------|--------|
| Role | AI Engineer / Researcher |
| Experience | ~1 year as AI Engineer |
| Education | 4th-year student, AI major |
| Research | Working in a lab on projects targeting paper publication |
| Identity | Bridges industry engineering with academic research |

## Design Direction

### Visual Style
- **Theme**: Dark mode default with graceful light mode toggle
- **Colors**: Dark backgrounds with accent colors (cyan/teal/violet gradients reflecting AI + research)
- **Typography**: Clean sans-serif for body (Inter or similar), monospace for code snippets
- **Layout**: Spacious, well-paced — journal-like reading experience meets modern portfolio
- **Interactions**: Subtle micro-interactions (scroll animations, hover effects, particle/network background) without overwhelming content

### Key Sections
1. **Hero** — Name, title, tagline, professional photo/avatar
2. **About** — Background, journey from student → AI engineer → researcher
3. **Experience** — AI Engineer role, lab positions, internships
4. **Research Projects** — Lab projects with paper status (in-progress, submitted, published), abstracts, links
5. **Skills** — Technical skills (ML/DL frameworks, programming languages, tools)
6. **Blog** — Technical articles, research notes, tutorials
7. **Contact** — Email, GitHub, LinkedIn, Google Scholar, etc.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (static export) |
| UI Library | shadcn/ui (base components) |
| Styling | Tailwind CSS v4 |
| Language | TypeScript (strict) |
| Icons | lucide-react |
| Font | Inter (body) + JetBrains Mono (code) |
| Animation | Framer Motion or CSS animations |
| Deployment | GitHub Pages via GitHub Actions |
| Blog | MDX-based or local markdown with next-mdx-remote |
| Forms | Formspree or Netlify Forms for Contact |

## Architecture Principles

- **Static-first** — Generate all pages at build time for fast loads
- **Content as data** — Blog posts and research entries as local MDX files, easy to add/edit
- **Component-driven** — Reusable section components, consistent spacing and theming
- **Accessible** — WCAG AA compliance, keyboard navigable, screen-reader friendly
- **Fast** — Lighthouse scores >90 for all metrics
- **Updatable** — Add new projects/posts by dropping in a markdown file

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Hosting | GitHub Pages (static export) | Free, simple CI/CD, no server maintenance |
| Blog format | Local MDX files | Easy to add/edit, version-controlled, no CMS dependency |
| Research updates | Manual MDX entries | Reflects real publication cadence; no need for live database |
| Dark mode first | Built-in toggle via Tailwind | ~70% of dev audience prefers dark mode; academic readers can switch to light |
| Static vs SSR | Static export | Portfolio content doesn't change per user; faster builds, simpler deploy |
| Design system | shadcn/ui + custom tokens | Consistent components that look bespoke; easy to customize |

## Future Considerations

- Add i18n (Vietnamese/English bilingual)
- Integrate Google Scholar API for auto-updating publication list
- Add project showcase with interactive demos (Three.js, ML demos)
- RSS feed for blog
- Reading time estimates and blog analytics
