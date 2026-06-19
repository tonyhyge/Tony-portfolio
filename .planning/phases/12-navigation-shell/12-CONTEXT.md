# Phase 1.2: Navigation & Shell — Context

**Gathered:** 2026-06-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Sticky header + minimal footer + scroll-based navigation shell for the single-page portfolio. Includes:
- Sticky header with hide-on-scroll-down/show-on-scroll-up behavior
- Nav links: Home, About, Experience, Research, Skills, Blog, Contact (hybrid anchor/page)
- Active dot indicator on current section via IntersectionObserver
- Smooth scrolling via Lenis v2
- Mobile responsive hamburger menu (Slide-in Sheet, close on link tap)
- Minimal footer with copyright + social icons
- Fade-in backdrop effect on header (transparent at top → glassmorphism after scroll)

This does NOT include: Hero section content (Phase 1.3), section content (Phase 1.4+), page routes for Research/Blog (Phase 1.5/Milestone 2).

</domain>

<decisions>
## Implementation Decisions

### Header Scroll Behavior
- **D-01:** Header hides when scrolling down, reappears when scrolling up (hide-on-scroll-down pattern)
- **D-02:** Backdrop style fades in — transparent at top of page, `bg-background/80` + `backdrop-blur-md` + border appears after ~50px scroll distance
- **D-03:** Uses existing `sticky-header.tsx` component shell as base with scroll-state additions

### Smooth Scroll Engine
- **D-04:** Lenis v2 for smooth scrolling on anchor nav links. Provides silkier feel, custom easing, and programmatic scroll control needed for Phase 4.1 scroll-triggered animations

### Active Section Indicator
- **D-05:** Dot indicator — small accent-dot displayed beside (or below) the active nav link. Activated via IntersectionObserver tracking sections on the home page

### Mobile Menu
- **D-06:** Slide-in from right using the existing shadcn Sheet component (`src/components/ui/sheet.tsx`)
- **D-07:** Menu auto-closes when a nav link is tapped (close-on-click behavior)

### Footer
- **D-08:** Minimal — copyright (`© {year} Phạm Quang Minh`) + social icon row only (GitHub, LinkedIn, Google Scholar, Email)

### Nav Link Configuration
- **D-09:** Nav link data (label, href, isAnchor) defined as a TypeScript constant array — extensible for future sections
- **D-10:** Section order for anchor nav: Home → About → Experience → Research → Skills → Contact (matches Phase 1 CONTEXT.md)
- **D-11:** Non-anchor page links: Research (`/research`), Blog (`/blog`) — link to dedicated pages

### Claude's Discretion
- IntersectionObserver threshold and rootMargin values (default to standard `-20%` top offset)
- Dot indicator exact positioning (below or beside) and animation
- Hide-on-scroll-down implementation (custom hook vs inline `useEffect` — custom hook preferred for reuse)
- Lenis configuration (smoothness, easing curve, duration) — standard settings recommended
- Header z-index value (keep at `z-40` as in existing StickyHeader)
- Sheet mobile menu width (default `w-3/4` from Sheet component) and content layout

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design & Architecture
- `.planning/phases/11-project-scaffold-design-system/11-CONTEXT.md` — Design tokens, component structure, layout architecture, sheet component usage established in Phase 1.1
- `.planning/phases/11-project-scaffold-design-system/11-PATTERNS.md` — Component patterns for nav-links, sticky-header, sheet, and existing UI patterns

### Existing Code
- `src/components/sticky-header.tsx` — Shell component to extend with scroll-state behavior
- `src/components/nav-links.tsx` — Nav link rendering with anchor/page link pattern
- `src/components/ui/sheet.tsx` — Mobile menu component (Base UI Dialog-based, slide-in from right)
- `src/components/theme-toggle.tsx` — Dark/light toggle to integrate into header
- `src/app/globals.css` — Theme tokens, accent colors, existing animation keyframes
- `src/app/layout.tsx` — Root layout where header/footer will be placed
- `src/app/page.tsx` — Home page shell with section placeholder comments

### Requirements
- `.planning/REQUIREMENTS.md` §F9 (Navigation), §F10 (Footer), §NFR2 (Accessibility), §NFR3 (Responsiveness)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Sheet component** (`src/components/ui/sheet.tsx`) — Fully built, Base UI Dialog-based, slide-in variants (right is default), close button baked in. Ready for mobile menu.
- **NavLinks component** (`src/components/nav-links.tsx`) — Renders anchor links and Next.js Link-based nav items with hover/focus styles. Ready to reuse.
- **StickyHeader component** (`src/components/sticky-header.tsx`) — Glassmorphism shell with `z-40`, `backdrop-blur-md`, `border-border/50`. Needs scroll-state additions.
- **ThemeToggle component** (`src/components/theme-toggle.tsx`) — Ready for header integration.
- **Button/Dialog primitives** — shadcn + Base UI already handle animations, focus trapping, and accessibility for the Sheet.

### Established Patterns
- **"use client" + hydration-safe pattern** — ThemeToggle establishes the `useState(false)` + `useEffect(() => setMounted(true), [])` + placeholder render pattern for any client-only components
- **shadcn compound components** — Sheet component follows shadcn compound pattern (Sheet + Trigger + Content + Close)
- **CSS @theme inline keyframes** — Animation keyframes defined in globals.css under `@theme inline` block
- **component props pattern** — Props extend `React.ComponentProps<"element">`, `cn()` for class merging

### Integration Points
- **Header** → Rendered in `layout.tsx` as top-level wrapper (with ThemeToggle, NavLinks, mobile Sheet trigger)
- **Footer** → Rendered in `layout.tsx` after main content
- **NavLinks** → Consumes nav link data array (to be created or defined inline)
- **Lenis** → Initialized in a client component or root provider, CSS `html { scroll-behavior: auto }` override needed
- **IntersectionObserver** → Hook (`useActiveSection`) that observes all home section IDs and returns active section name for dot indicator

### Component Structure to Build
- `src/components/site-header.tsx` (or enhance sticky-header.tsx) — Composes StickyHeader shell + NavLinks + ThemeToggle + mobile Sheet trigger
- `src/components/site-footer.tsx` — Minimal copyright + social icons
- `src/components/mobile-nav.tsx` — Sheet wrapper with nav links + close-on-click
- `src/hooks/useScrollDirection.ts` — Detects scroll up/down for hide-on-scroll
- `src/hooks/useActiveSection.ts` — IntersectionObserver for active dot indicator
- `src/lib/lenis.ts` or `src/components/lenis-provider.tsx` — Lenis initialization
- `src/app/data/navigation.ts` — Nav link definitions (label, href, isAnchor)

</code_context>

<specifics>
## Specific Ideas

- **Dot indicator:** Small accent dot that appears beside/next to the active nav link label. Could animate between links when active section changes via scroll.
- **Hide-on-scroll-down:** Smooth CSS transform-based animation (translateY -100%) triggered by scroll direction changes. Uses `useScrollDirection` hook.
- **Lenis smooth scroll:** Ties into anchor link clicks — when user clicks "Experience", Lenis smoothly scrolls to `#experience` section. Also acts as foundation for Phase 4.1 scroll-triggered animations.
- **Backdrop fade-in:** Transition from transparent header to glassmorphism over ~50px scroll. Separate from hide/show behavior — backdrop state tracks `scrolled > threshold` while visibility tracks scroll direction.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 12-navigation-shell*
*Context gathered: 2026-06-19*
