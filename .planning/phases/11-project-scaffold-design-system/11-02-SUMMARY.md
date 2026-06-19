---
phase: 11-project-scaffold-design-system
plan: 02
subsystem: ui
tags: [react, nextjs, tailwind, shadcn, lucide-react, components, theme, navigation]

requires:
  - phase: 11-project-scaffold-design-system
    plan: 01
    provides: Globals.css with accent color tokens, font-heading, animate-gradient-shift keyframes
provides:
  - Container and Section layout primitives
  - ThemeToggle with localStorage persistence and hydration safety
  - StickyHeader with glassmorphism styling
  - NavLinks supporting anchor links and Next.js Link
  - HeroBackground with animated CSS gradient and reduced-motion support
affects:
  - 11-03-PLAN.md (home page composition - uses all 6 components)
  - 11-04-PLAN.md (section rendering - uses Section/Container)

tech-stack:
  added: []
  patterns:
    - Named function component exports without React.FC
    - React.ComponentProps extension for native attribute passthrough
    - cn() class merging with tailwind-merge
    - "use client" hydration-safe islands pattern (useState+useEffect mount detection)
    - Placeholder div matching button dimensions to prevent layout shift

key-files:
  created:
    - src/components/container.tsx
    - src/components/section.tsx
    - src/components/theme-toggle.tsx
    - src/components/sticky-header.tsx
    - src/components/nav-links.tsx
    - src/components/hero-background.tsx
  modified: []

key-decisions:
  - "ThemeToggle uses direct DOM manipulation (classList.toggle) without next-themes or context provider, keeping bundle size minimal and avoiding forcing entire tree client-side"
  - "ThemeToggle renders placeholder <div> with matching dimensions before mount to prevent hydration mismatch"
  - "HeroBackground uses inline background-image in style prop for 3-stop gradient instead of --gradient-hero var (which is 2-stop)"
  - "NavLinks uses <a> for anchor links and <Link> for page routes - explicit split for scroll behavior control"

patterns-established:
  - "Layout components: Container wraps content at max-w-screen-xl, Section wraps content with typographic heading"
  - "Interactive island: ThemeToggle is self-contained 'use client' with no global state"
  - "Decorative element: HeroBackground is presentational with aria-hidden, fixed positioning, and motion-reduce respect"
  - "Navigation shell: StickyHeader + NavLinks provide glassmorphism nav with keyboard focus states"

requirements-completed:
  - "Build theme-toggle component"
  - "Create reusable layout components (Container, Section)"
  - "Create sticky-header and nav-links for navigation shell"
  - "Create hero-background component"

duration: 1min
completed: 2026-06-19
---

# Phase 11 Plan 02: Design System Components Summary

**Six reusable design system components: layout primitives (Container, Section), theme toggle, navigation shell (StickyHeader, NavLinks), and decorative gradient layer (HeroBackground)**

## Performance

- **Duration:** 1 min
- **Started:** 2026-06-19T09:16:28Z
- **Completed:** 2026-06-19T09:17:36Z
- **Tasks:** 3
- **Files created:** 6

## Accomplishments

- Container provides max-w-screen-xl centered wrapper with responsive padding and configurable maxWidth option
- Section provides consistent vertical spacing (py-16 md:py-24) with optional title/subtitle, semantic `<section>` element, and aria-labelledby linking
- ThemeToggle handles dark/light toggle with localStorage persistence, hydration-safe mount pattern, and placeholder div to prevent layout shift
- StickyHeader uses glassmorphism (bg-background/80 + backdrop-blur-md) with subtle bottom border
- NavLinks supports both anchor links (same-page smooth scroll via `<a>`) and page navigation (Next.js `<Link>` for /research, /blog)
- HeroBackground renders a fullscreen fixed gradient layer with CSS background-position animation and `prefers-reduced-motion` respect

## Task Commits

Each task was committed atomically:

1. **Task 1: Create layout primitives — Container and Section** - `3bbd09b` (feat)
2. **Task 2: Create ThemeToggle component** - `1c98f7c` (feat)
3. **Task 3: Create StickyHeader, NavLinks, and HeroBackground** - `9992054` (feat)

## Files Created
- `src/components/container.tsx` - Max-width layout container (1280px default, mx-auto, responsive padding)
- `src/components/section.tsx` - Reusable section wrapper with id, optional title/subtitle, heading, aria-labelledby
- `src/components/theme-toggle.tsx` - "use client" dark/light toggle with Sun/Moon icons, localStorage persistence
- `src/components/sticky-header.tsx` - Sticky navigation bar with glassmorphism (backdrop-blur, border)
- `src/components/nav-links.tsx` - Anchor links for home sections + page links for /research, /blog
- `src/components/hero-background.tsx` - Fixed fullscreen CSS gradient animation layer

## Decisions Made

- ThemeToggle uses direct DOM classList.toggle instead of React context provider to avoid forcing entire component tree client-side
- HeroBackground uses inline `style` prop for 3-stop gradient (cyan/violet/deep navy) instead of `--gradient-hero` token (2-stop), providing richer animation
- NavLinks splits rendering into `<a>` for anchor links and `<Link>` for page routes, giving explicit scroll-behavior control
- ThemeToggle placeholder uses `size-8` with `aria-hidden="true"` to match the shadcn `size="icon"` button dimensions without announcing to screen readers

## Deviations from Plan

None - plan executed exactly as written. All three tasks implemented per spec. No auto-fixes needed.

## Issues Encountered

None - all components compiled with zero TypeScript errors on first attempt.

## Known Stubs

None - all six components are complete implementations with no placeholder text or mock data.

## Threat Flags

None - no new security-relevant surface introduced. ThemeToggle operates entirely client-side with localStorage for a non-sensitive theme preference (per threat register T-11-02-01, T-11-02-02: accepted).

## Next Phase Readiness

- All 6 components ready for Plan 03 (home page composition)
- Container and Section available for Plan 04 content section components
- ThemeToggle ready for integration into layout
- NavLinks interface (NavLink[] with label/href/isAnchor) defines the data contract for page data definition
- TypeScript compilation passes with zero errors across entire codebase

---
*Phase: 11-project-scaffold-design-system*
*Completed: 2026-06-19*
