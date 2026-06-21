# Requirements — Personal Portfolio

## Functional Requirements

### F1. Hero Section
- [ ] Display name, professional title tagline, and a short intro
- [ ] Include professional photo/avatar (placeholder ready for later)
- [ ] Animated background or particles representing AI/tech theme
- [ ] CTA buttons: View Projects, Contact Me, Download CV

### F2. About Section
- [ ] Personal narrative: AI student → AI Engineer → Researcher
- [ ] Key highlights (years of experience, lab affiliation, focus areas)
- [ ] Optional: personal interests outside of work/study

### F3. Experience Timeline
- [ ] Timeline view of professional experience
- [ ] Each entry: company/lab, role, duration, description, tech tags
- [ ] AI Engineer role (~1 year)
- [ ] Research lab position with current projects
- [ ] Any previous internships or relevant roles

### F4. Research Projects Showcase
- [ ] Grid or card layout for research projects
- [ ] Each project: title, abstract/summary, status badge (in-progress / submitted / published), tech/tags
- [ ] Link to paper (PDF or arXiv) when available
- [ ] Filter by status

### F5. Skills Section
- [ ] Categorized skills: ML/DL, Programming Languages, Tools & Frameworks, Research Methods
- [ ] Visual indicators for proficiency or experience level
- [ ] Tags/chips style for easy scanning

### F6. Blog Engine
- [ ] List of blog posts with title, date, excerpt, tags
- [ ] Individual post pages with markdown rendering
- [ ] Code syntax highlighting (for technical tutorials)
- [ ] Tag/category filtering
- [ ] RSS feed support

### F7. Contact Section
- [ ] Contact form (name, email, message)
- [ ] Social links: GitHub, LinkedIn, Google Scholar, Email
- [ ] Optionally: X/Twitter, ORCID

### F8. Theme Toggle
- [ ] Dark/Light mode toggle
- [ ] Persist preference via localStorage
- [ ] Respect system preference on first visit

### F9. Navigation
- [ ] Sticky header with navigation links
- [ ] Mobile hamburger menu
- [ ] Smooth scroll to sections
- [ ] Active section highlighting on scroll

### F10. Footer
- [ ] Copyright notice
- [ ] Quick navigation links
- [ ] Social links
- [ ] "Last updated" date

## Non-Functional Requirements

### NFR1. Performance
- [ ] Lighthouse Performance score ≥ 90
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Total bundle size < 200KB (gzipped)
- [ ] Optimized images (WebP, lazy loading)

### NFR2. Accessibility
- [ ] WCAG AA compliance
- [ ] Keyboard navigable
- [ ] Screen reader friendly (ARIA labels, semantic HTML)
- [ ] Focus indicators visible
- [ ] Color contrast ratios ≥ 4.5:1

### NFR3. Responsiveness
- [ ] Mobile-first responsive design
- [ ] Breakpoints: 640px, 768px, 1024px, 1280px
- [ ] Touch-friendly interactive elements
- [ ] No horizontal scroll on any viewport

### NFR4. SEO
- [ ] Semantic HTML structure
- [ ] Meta tags (title, description, Open Graph, Twitter Card)
- [ ] Structured data (JSON-LD for Person and CreativeWork)
- [ ] Sitemap.xml generation
- [ ] robots.txt

### NFR5. Maintainability
- [ ] MDX-based content (blog posts, research projects)
- [ ] Component-based architecture
- [ ] Consistent code style (ESLint, Prettier)
- [ ] TypeScript strict mode
- [ ] Documented component API

### NFR6. Reliability
- [ ] 404 page
- [ ] Loading states for dynamic content
- [ ] Graceful fallbacks for missing images/content
- [ ] Error boundaries

## Priority Labels
- **P0**: Must have for MVP launch
- **P1**: Important but can follow in v1.1
- **P2: Nice to have, future milestone
- **P3**: Stretch goal

## Requirement Priority Map

| ID | Description | Priority | Phase |
|----|-------------|----------|-------|
| F1 | Hero Section | P0 | M1 |
| F2 | About Section | P0 | M1 |
| F3 | Experience Timeline | P0 | M1 |
| F4 | Research Projects | P0 | M1 |
| F5 | Skills Section | P0 | M1 |
| F7 | Contact Section | P0 | M1 |
| F8 | Theme Toggle | P0 | M1 |
| F9 | Navigation | P0 | M1 |
| F10 | Footer | P0 | M1 |
| F6 | Blog Engine | P1 | M2 |
| NFR1 | Performance | P0 | All |
| NFR2 | Accessibility | P0 | All |
| NFR3 | Responsiveness | P0 | All |
| NFR4 | SEO | P1 | M3 |
| NFR5 | Maintainability | P0 | M1 |
| NFR6 | Reliability | P0 | M1 |
