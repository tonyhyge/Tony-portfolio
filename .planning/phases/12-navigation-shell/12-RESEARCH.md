# Phase 12: Navigation & Shell - Research

**Researched:** 2026-06-19
**Domain:** React scroll navigation, Lenis smooth scroll, IntersectionObserver, mobile navigation patterns
**Confidence:** HIGH

## Summary

This phase builds the navigation shell for a single-page portfolio: sticky header with hide-on-scroll behavior, smooth scroll via Lenis v2, active section dot indicator via IntersectionObserver, mobile hamburger menu via shadcn Sheet (Base UI Dialog), and a minimal footer with social icons.

The project already has the component shells (`sticky-header.tsx`, `nav-links.tsx`, `sheet.tsx`, `theme-toggle.tsx`) and design tokens (`globals.css`) from Phase 1.1. This phase composes them into a functional shell, adds two custom hooks (`useScrollDirection`, `useActiveSection`), installs Lenis as a smooth scroll engine, and creates a `SiteFooter` component.

**Primary recommendation:** Install `lenis` (package name is `lenis`, NOT the deprecated `@studio-freight/lenis`), use `lenis/react` React adapter with `ReactLenis root` component, implement scroll-state logic in a new `SiteHeader` wrapper that composes the existing `StickyHeader` shell, and use `Dialog.Close` with `render` prop from Base UI for close-on-link-click in mobile menu.

## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Header hides when scrolling down, reappears when scrolling up (hide-on-scroll-down pattern)
- **D-02:** Backdrop style fades in — transparent at top of page, `bg-background/80` + `backdrop-blur-md` + border appears after ~50px scroll distance
- **D-03:** Uses existing `sticky-header.tsx` component shell as base with scroll-state additions
- **D-04:** Lenis v2 for smooth scrolling on anchor nav links
- **D-05:** Dot indicator — small accent-dot displayed beside (or below) the active nav link, activated via IntersectionObserver tracking sections
- **D-06:** Slide-in from right using the existing shadcn Sheet component (`src/components/ui/sheet.tsx`)
- **D-07:** Menu auto-closes when a nav link is tapped (close-on-click behavior)
- **D-08:** Minimal footer — copyright (`© {year} Pham Quang Minh`) + social icon row only (GitHub, LinkedIn, Google Scholar, Email)
- **D-09:** Nav link data (label, href, isAnchor) defined as a TypeScript constant array
- **D-10:** Section order for anchor nav: Home → About → Experience → Research → Skills → Contact
- **D-11:** Non-anchor page links: Research (`/research`), Blog (`/blog`)

### Claude's Discretion
- IntersectionObserver threshold and rootMargin values (default to standard `-20%` top offset)
- Dot indicator exact positioning (below or beside) and animation
- Hide-on-scroll-down implementation (custom hook vs inline `useEffect` — custom hook preferred for reuse)
- Lenis configuration (smoothness, easing curve, duration) — standard settings recommended
- Header z-index value (keep at `z-40` as in existing StickyHeader)
- Sheet mobile menu width (default `w-3/4` from Sheet component) and content layout

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| F9 | Sticky header, mobile hamburger, smooth scroll, active section highlighting | Lenis v2 (package `lenis`), IntersectionObserver hook, hide-on-scroll hook, Sheet close-on-click pattern |
| F10 | Copyright, nav links, social icons, last updated date | lucide-react social icons, dynamic copyright via `new Date().getFullYear()`, semantic `<footer>` element |
| NFR2 | WCAG AA, keyboard nav, screen reader friendly, focus indicators, color contrast | Base UI Dialog focus trap, ARIA labels, `aria-expanded`, `prefers-reduced-motion` handling for Lenis and header animation |
| NFR3 | Mobile-first responsive, breakpoints 640/768/1024/1280, touch-friendly | Sheet visible < lg, nav links visible >= lg, touch targets `min-h-[44px]` |

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Sticky header with scroll behavior | Browser / Client | — | DOM scroll events, CSS transforms, client-side IntersectionObserver |
| Smooth scroll engine (Lenis) | Browser / Client | — | Client-side scroll hijacking, RAF loop |
| Active section tracking | Browser / Client | — | IntersectionObserver API, purely client-side |
| Mobile hamburger menu | Browser / Client | — | Sheet open/close state, client-side navigation |
| Footer (copyright, social icons) | Browser / Client | Frontend Server (SSR) | Static content, but copyright year could be SSR-rendered; since this is static export, client-side `new Date().getFullYear()` is sufficient |
| Nav link data | Browser / Client | — | Static TypeScript array, bundled at build time |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| lenis | 1.3.23 | Smooth scroll engine | Official `lenis` package (deprecated `@studio-freight/lenis` is old). Provides `lenis/react` adapter with `ReactLenis` component and `useLenis` hook. Exports: `.` (core), `./react` (React adapter), `./snap` (snap scroll). [VERIFIED: npm registry 1.3.23, GitHub darkroomengineering/lenis] |

### Supporting (Already Installed)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @base-ui/react | ^1.6.0 | Dialog/Sheet primitive for mobile menu | Already installed — Sheet uses `Dialog.Root`, `Dialog.Close`, focus trap, escape key handling |
| lucide-react | ^1.21.0 | Social icons (Github, Linkedin, Mail, GraduationCap/School) | Already installed — icon library per project convention |
| next | 16.2.9 | `<Link>` for non-anchor page links | Already installed — page navigation for `/research`, `/blog` |

### Installation
```bash
npm install lenis@1.3.23
```

**Import paths (verified from npm exports):**
- `lenis` — core Lenis class
- `lenis/react` — `ReactLenis` component, `useLenis` hook
- `lenis/dist/lenis.css` — required CSS for proper scroll behavior

## Architecture Patterns

### System Architecture Diagram

```
User Action                      Browser                    Data Flow
    │                                │                          │
    ▼                                │                          │
┌─────────────────┐                  │                          │
│ Scroll (wheel)  │─────► Lenis RAF ─┼─► Smooth scroll animation│
└─────────────────┘                  │                          │
    │                                │                          │
    ▼                                ▼                          │
┌──────────────────┐   ┌──────────────────────────┐            │
│ Nav link click   │──►│ Lenis.scrollTo(section)  │            │
│ (anchor or page) │   │ or Next.js navigation    │            │
└──────────────────┘   └──────────────────────────┘            │
    │                                                           │
    ▼                                                           ▼
┌──────────────────┐   ┌──────────────────────────┐   ┌────────────────┐
│ IntersectionObs. │──►│ useActiveSection hook    │   │ Section <div>  │
│ (observes        │   │ (returns activeSectionId)│◄──│ elements with  │
│  all sections)   │   └────────────┬─────────────┘   │ matching IDs   │
└──────────────────┘                │                 └────────────────┘
    │                               ▼
    │                    ┌──────────────────────┐
    │                    │ SiteHeader            │
    │                    │ - NavLinks updated    │
    │                    │ - Dot indicator shown │
    │                    └──────────────────────┘
    │
    ▼
┌──────────────────┐   ┌──────────────────────────┐
│ Scroll direction │──►│ useScrollDirection hook   │
│ (up vs down)     │   │ (direction, scrolled)     │
└──────────────────┘   └────────────┬─────────────┘
                                    ▼
                         ┌──────────────────────┐
                         │ SiteHeader transform  │
                         │ -translate-y-full     │← hide on down
                         │ translate-y-0         │← show on up
                         └──────────────────────┘
```

### Recommended Project Structure
```
src/
├── app/
│   ├── data/
│   │   └── navigation.ts          # Nav link definitions
│   ├── layout.tsx                 # Modified: add SiteHeader, SiteFooter, LenisProvider
│   ├── page.tsx                   # Modified: add section placeholders with IDs
│   └── globals.css                # Modified: add html { scroll-behavior: auto }
├── components/
│   ├── site-header.tsx            # NEW: Composes StickyHeader + NavLinks + ThemeToggle + MobileNav
│   ├── site-footer.tsx            # NEW: Minimal copyright + social icons
│   ├── mobile-nav.tsx             # NEW: Sheet wrapper with nav links + close-on-click
│   ├── lenis-provider.tsx         # NEW: "use client" Lenis initialization
│   ├── sticky-header.tsx          # EXISTING: Used as shell by SiteHeader (no changes)
│   ├── nav-links.tsx              # EXISTING: Extended with activeHref prop
│   └── ui/
│       └── sheet.tsx              # EXISTING: Mobile menu (Base UI Dialog-based)
└── hooks/
    ├── useScrollDirection.ts      # NEW: Detects scroll up/down
    └── useActiveSection.ts        # NEW: IntersectionObserver for active section
```

### Pattern 1: LenisProvider for React/Next.js
**What:** Client component that wraps app content with `<ReactLenis root>`, initializing smooth scroll globally.
**When to use:** At the top of the layout tree for any page needing smooth scroll.

**Example:**
```tsx
// Source: https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md
"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

interface LenisProviderProps {
  children: React.ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <ReactLenis
      root
      options={{
        duration: prefersReducedMotion ? 0 : 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        anchors: true,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
```

### Pattern 2: Hide-on-Scroll-Down Custom Hook
**What:** Custom React hook that tracks scroll direction and returns `{direction, scrolled}`.
**When to use:** Sticky header visibility control.

**Example:**
```tsx
// Source: Verified pattern — standard scroll direction detection
"use client";

import { useState, useEffect, useCallback } from "react";

interface UseScrollDirectionReturn {
  direction: "up" | "down";
  scrolled: boolean;
}

export function useScrollDirection(threshold = 10): UseScrollDirectionReturn {
  const [scrollY, setScrollY] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const current = window.scrollY;
    setScrollY(current);
    setScrolled(current > 50);

    const delta = current - scrollY;
    if (Math.abs(delta) > threshold) {
      setDirection(delta > 0 ? "down" : "up");
    }
  }, [scrollY, threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { direction, scrolled };
}
```

### Pattern 3: IntersectionObserver for Active Section
**What:** Custom hook that observes all section elements and returns the currently visible section ID.
**When to use:** Active nav link highlighting via scroll position.

**Example:**
```tsx
// Source: Verified IntersectionObserver pattern for active section tracking
"use client";

import { useState, useEffect, useRef } from "react";

export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-20% 0px -60% 0px",
      threshold: [0, 0.25, 0.5],
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
}
```

### Anti-Patterns to Avoid
- **Animating `top` or `margin` for header hide/show:** Causes layout thrashing. Use `transform: translateY()` which runs on the compositor. [VERIFIED: MDN CSS performance guidance]
- **Creating a new IntersectionObserver per render:** Observer is expensive. Create once in `useEffect`, disconnect on cleanup or dependency change.
- **Using `scroll-behavior: smooth` alongside Lenis:** Lenis manages scroll animation itself. `html { scroll-behavior: smooth }` conflicts with Lenis. Override to `auto` in globals.css. [VERIFIED: Lenis docs]
- **Using `useScroll` event without `passive: true`:** Unthrottled scroll listeners block the main thread. Use `{ passive: true }` or `requestAnimationFrame`-based throttling.
- **Wrapping Lenis in SSR components:** Lenis uses `window` and `document`. Must be `"use client"` only.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Smooth scroll engine | Custom CSS `scroll-behavior: smooth` or JS scroll animation | `lenis` | Handles momentum, touch, wheel events, RAF loop, anchor links, and is actively maintained (1.3.23 as of 2026-06). Edge cases: scroll hijacking conflicts, touch gesture handling, programmatic scroll vs user scroll distinction |
| Active section tracking | Manual scroll position math (getBoundingClientRect in scroll listener) | `IntersectionObserver` via `useActiveSection` hook | Browser-native, runs off-main-thread, handles edge cases like section overlap, viewport resize. Manual math breaks on zoom, dynamic content height changes |
| Mobile menu focus trap | Custom focus management with `tabIndex` cycling | Base UI Dialog (`sheet.tsx`) | Already handles focus trap, escape key, focus restoration, ARIA attributes, pointer-outside dismissal. Building manually misses edge cases (iframe focus, nested dialogs) |
| Icon library | Inline SVGs or custom icon font | `lucide-react` (already installed) | Already in project, consistent icon stroke weights, tree-shakable, TypeScript typed |
| Class name merging | String concatenation with conditionals | `cn()` utility from `@/lib/utils` | Already in project, handles Tailwind class conflicts via `twMerge` |

**Key insight:** Scroll-related problems look simple but have deep edge cases: momentum scrolling on mobile, scroll event coalescing, programmatic scroll vs user-initiated scroll, and `position: sticky` interaction. Lenis solves all of these. IntersectionObserver avoids main-thread scroll listener performance penalties.

## Common Pitfalls

### Pitfall 1: Lenis + Next.js basePath Conflicts
**What goes wrong:** Anchor links like `#about` work in dev but fail in production when `basePath: "/Tony-portfolio"` is set, because Lenis tries to scroll to `window.location.pathname + hash`.
**Why it happens:** Lenis `anchors: true` scrolls to `document.querySelector(href)`. If the URL is `/Tony-portfolio/#about`, Lenis looks for `#about` which works. But if the hash gets prepended with basePath incorrectly, the selector fails.
**How to avoid:** Lenis anchor handling uses the `href` attribute of clicked `<a>` tags, which in this project are plain `#section` values (not full URLs). This works correctly. Only Next.js `<Link>` components get basePath prepended. Verify anchor links render as `<a href="#section">` not `<a href="/Tony-portfolio#section">`.
**Warning signs:** Clicking nav link scrolls to wrong position or not at all in production build.

### Pitfall 2: `html { scroll-behavior: smooth }` Conflict
**What goes wrong:** Lenis smooth scroll appears to "fight" with native smooth scroll, causing jittery behavior.
**Why it happens:** CSS `scroll-behavior: smooth` triggers browser animation while Lenis also animates scroll.
**How to avoid:** Add `html { scroll-behavior: auto }` to `globals.css`. Lenis CSS import (`lenis/dist/lenis.css`) also sets this, but explicit override prevents surprises. [VERIFIED: Lenis docs — "Lenis overrides scroll-behavior automatically"]
**Warning signs:** Double animation on anchor clicks, scroll feels "rubbery".

### Pitfall 3: IntersectionObserver Doesn't Fire on Initial Load
**What goes wrong:** Active section shows as empty or wrong on page load.
**Why it happens:** `IntersectionObserver` is async — the first observation cycle may not fire if sections are already fully in/out of view.
**How to avoid:** Set `activeSection` default to `sectionIds[0]` (Home) so there's always a valid default. The observer will update once it fires. Alternatively, run a one-time `getBoundingClientRect` check on mount as a fallback.
**Warning signs:** No dot highlighted until first scroll action.

### Pitfall 4: Header Hide Jank on Fast Scroll
**What goes wrong:** Header flashes in/out unpredictably during fast scrolling.
**Why it happens:** Scroll events fire at ~60fps; without a minimum scroll delta threshold, small jitter changes direction state rapidly.
**How to avoid:** Use a `threshold` parameter (e.g., 10px minimum delta) in `useScrollDirection` before flipping direction state. [VERIFIED: Standard pattern in useScrollDirection implementations]
**Warning signs:** Header flickers between visible/hidden during slow scroll.

### Pitfall 5: Base UI Sheet Close with Next.js Link
**What goes wrong:** Using `SheetClose asChild={<Link href="#section" />}` does not work because Base UI uses `render` prop, not `asChild`.
**Why it happens:** shadcn Sheet traditionally wraps Radix UI which uses `asChild`. This project uses `@base-ui/react` which uses `render` prop on `Dialog.Close`.
**How to avoid:** Use the `render` prop pattern: `<SheetClose render={<a href="#section" className="...">Home</a>} />` for anchor links, or controlled `onOpenChange` with `useState` for Next.js `<Link>` pages. [VERIFIED: Base UI Dialog docs]
**Warning signs:** Clicking nav link closes Sheet but doesn't navigate, or navigates but doesn't close Sheet.

### Pitfall 6: prefers-reduced-motion Not Respected
**What goes wrong:** Users with reduced motion preference still get smooth scroll animations and header hide/show transitions.
**Why it happens:** Lenis does not auto-detect `prefers-reduced-motion`. Header CSS transitions run regardless.
**How to avoid:** (1) In `LenisProvider`, check `window.matchMedia("(prefers-reduced-motion: reduce)").matches` and set `duration: 0` or `lerp: 1` to disable smooth scroll. (2) Add CSS `@media (prefers-reduced-motion: reduce) { .header-hide-show { transition: none !important; } }` or use `motion-reduce:transition-none` Tailwind utility. (3) Header stays always visible (no hide/show animation) for reduced-motion users.
**Warning signs:** Lighthouse accessibility audit flags "reduces motion" violation.

## Code Examples

Verified patterns from official sources:

### Lenis React Integration
```tsx
// Source: https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";

function App() {
  const lenis = useLenis(({ scroll }) => {
    // Called every scroll — useful for parallax, progress bars, etc.
  });

  return <ReactLenis root>{/* content */}</ReactLenis>;
}
```

### Sheet Close on Anchor Link Click (Base UI)
```tsx
// Source: https://base-ui.com/react/components/dialog — Dialog.Close render prop
import { Sheet, SheetContent, SheetClose, SheetTrigger } from "@/components/ui/sheet";

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
        {/* hamburger icon */}
      </SheetTrigger>
      <SheetContent side="right">
        <nav aria-label="Mobile navigation">
          {links.map((link) =>
            link.isAnchor ? (
              <SheetClose
                key={link.href}
                render={
                  <a href={link.href} className="block min-h-[44px] py-3 px-4 text-sm font-medium">
                    {link.label}
                  </a>
                }
              />
            ) : (
              <SheetClose
                key={link.href}
                render={
                  <Link href={link.href} className="block min-h-[44px] py-3 px-4 text-sm font-medium">
                    {link.label}
                  </Link>
                }
              />
            )
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
```

### Dynamic Copyright Year
```tsx
// Source: Standard pattern — server-rendered or client-rendered
function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer aria-label="Site footer">
      <p>&copy; {year} Pham Quang Minh</p>
      {/* social icons */}
    </footer>
  );
}
```

### Header Hide-on-Scroll with Backdrop States
```tsx
// Source: Composed from existing sticky-header.tsx + useScrollDirection pattern
"use client";

import { StickyHeader } from "./sticky-header";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { direction, scrolled } = useScrollDirection();

  const isVisible = direction === "up" || !scrolled;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-200 ease-in-out",
        !isVisible && "-translate-y-full",
        scrolled ? "translate-y-0" : "translate-y-0",
      )}
    >
      <StickyHeader
        className={cn(
          "transition-all duration-200",
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border/50"
            : "bg-transparent border-b border-transparent",
        )}
      >
        {/* nav content */}
      </StickyHeader>
    </div>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@studio-freight/lenis` | `lenis` (main package) | v1.0+ (late 2023) | Old package deprecated. Using wrong package name gives old version with breaking changes |
| `scroll-behavior: smooth` | Lenis with RAF loop | Continuous | Native smooth scroll lacks momentum, easing control, and programmatic API |
| `window.addEventListener("scroll", ...)` for active section | IntersectionObserver | Browser standard since 2017 | Off-main-thread, better performance, no throttle needed |
| Radix UI for shadcn Sheet | Base UI Dialog | Project-specific (Phase 1.1) | `asChild` replaced with `render` prop on `Dialog.Close` |
| CSS `top` animation for header hide | CSS `transform: translateY()` | Modern CSS best practice | Compositor-only, no layout thrashing |

**Deprecated/outdated:**
- `@studio-freight/lenis`: Superseded by `lenis`. The old package is at version 1.0.42 and is not receiving updates. [VERIFIED: npm registry — `lenis` is the current package]
- Manual scroll position calculation for active section tracking: Replaced by `IntersectionObserver` which is natively supported in all modern browsers.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Lenis `anchors: true` works with plain `<a href="#section">` elements without basePath interference | Pitfall 1 | If Lenis strips or modifies the hash, anchor clicks fail in production — would need custom scroll handler |
| A2 | Base UI `Dialog.Close` `render` prop correctly forwards click handler to `<a>` and `<Link>` elements for Sheet closure | Pitfall 5, Code Examples | If props aren't forwarded, Sheet won't close on link click — would need controlled `onOpenChange` fallback |
| A3 | `lenis/dist/lenis.css` exists at the published path and is required for proper behavior | Standard Stack | If CSS path changes, Lenis visual behavior breaks — easily verified at install time |
| A4 | `IntersectionObserver` with `rootMargin: "-20% 0px -60% 0px"` correctly triggers when a section enters the top 20% of the viewport | Pattern 3 | If margin calculation is off, active section tracking fires too early or too late — adjustable via UI testing |
| A5 | `window.matchMedia("(prefers-reduced-motion: reduce)").matches` is the correct way to detect reduced motion preference in the LenisProvider | Pattern 1, Pitfall 6 | If media query syntax is wrong, reduced motion users get full animations — accessibility violation |

## Open Questions

1. **Lenis + Next.js static export `<html>` scroll container:**
   - What we know: `<ReactLenis root>` uses `<html>` as scroll container. Next.js static export uses `body` as the scrollable element.
   - What's unclear: Whether `root: true` correctly attaches to `<html>` in a static export build, or if the `lenis.css` needs additional body-level styles.
   - Recommendation: Test with a production build (`npm run build && npm run start`). If issues arise, fall back to wrapping `children` in a div-level Lenis instance instead of `root: true`.

2. **Dot indicator animation between nav links:**
   - What we know: The UI spec mentions the dot "could animate between links when active section changes."
   - What's unclear: The exact animation style (fade, slide, morph) is not specified.
   - Recommendation: Start with a simple CSS transition (`transition-all duration-200`) on the dot's position/color. Can enhance later if desired.

3. **Section placeholder IDs in page.tsx:**
   - What we know: `page.tsx` currently has comments like `{/* HERO — Phase 1.3 */}` but no actual section elements with IDs.
   - What's unclear: Whether this phase should add placeholder `<section id="about">` elements so IntersectionObserver has targets, or wait for content phases.
   - Recommendation: Add minimal placeholder sections with `id` attributes and `min-h-screen` so the scroll shell functions correctly. Content phases fill them in later.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Development | ✓ | v22.x | — |
| npm | Package installation | ✓ | Available | — |
| lenis | Smooth scroll engine | ✗ (not yet installed) | 1.3.23 available | Would need to implement custom smooth scroll (not recommended) |
| Next.js 16 | Framework | ✓ | 16.2.9 | — |
| React 19 | Framework | ✓ | 19.2.4 | — |
| @base-ui/react | Sheet component | ✓ | ^1.6.0 | — |
| lucide-react | Social icons | ✓ | ^1.21.0 | — |

**Missing dependencies with no fallback:**
- None — all required dependencies are either already installed or available on npm.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Playwright (per project rules `typescript/testing.md`) |
| Config file | None — Wave 0 setup required |
| Quick run command | `npx playwright test --grep "nav\|header\|footer"` |
| Full suite command | `npx playwright test` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| F9 | Header visible on page load | E2E | `playwright test header-visible.spec.ts` | ❌ Wave 0 |
| F9 | Header hides on scroll down | E2E | `playwright test header-scroll.spec.ts` | ❌ Wave 0 |
| F9 | Header reappears on scroll up | E2E | `playwright test header-scroll.spec.ts` | ❌ Wave 0 |
| F9 | Active nav link dot updates on scroll | E2E | `playwright test active-section.spec.ts` | ❌ Wave 0 |
| F9 | Smooth scroll on anchor click | E2E | `playwright test smooth-scroll.spec.ts` | ❌ Wave 0 |
| F9 | Mobile menu opens/closes | E2E | `playwright test mobile-menu.spec.ts` | ❌ Wave 0 |
| F9 | Mobile menu closes on link tap | E2E | `playwright test mobile-menu.spec.ts` | ❌ Wave 0 |
| F10 | Footer renders with copyright | E2E | `playwright test footer.spec.ts` | ❌ Wave 0 |
| F10 | Social icons render and link correctly | E2E | `playwright test footer.spec.ts` | ❌ Wave 0 |
| NFR2 | All nav links keyboard-reachable | E2E/a11y | `playwright test a11y-nav.spec.ts` | ❌ Wave 0 |
| NFR2 | Sheet focus trap works | E2E/a11y | `playwright test a11y-sheet.spec.ts` | ❌ Wave 0 |
| NFR3 | Desktop nav shows at >= 1024px | E2E | `playwright test responsive.spec.ts` | ❌ Wave 0 |
| NFR3 | Hamburger shows at < 1024px | E2E | `playwright test responsive.spec.ts` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npm run build` — verify static export compiles
- **Per wave merge:** `npm run lint && npm run build` — lint + build green
- **Phase gate:** All Playwright tests green before `/gsd-verify-work`

### Wave 0 Gaps
- [ ] `tests/e2e/header.spec.ts` — covers F9 header behavior
- [ ] `tests/e2e/navigation.spec.ts` — covers F9 nav links, smooth scroll, active section
- [ ] `tests/e2e/mobile-menu.spec.ts` — covers F9 mobile Sheet, close-on-click
- [ ] `tests/e2e/footer.spec.ts` — covers F10 footer rendering
- [ ] `tests/e2e/a11y.spec.ts` — covers NFR2 keyboard nav, ARIA, focus trap
- [ ] `tests/e2e/responsive.spec.ts` — covers NFR3 responsive breakpoints
- [ ] Playwright install: `npx playwright install` — if not already installed

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | No authentication in static portfolio |
| V3 Session Management | No | No session state |
| V4 Access Control | No | All content is public |
| V5 Input Validation | No | No user input in this phase |
| V6 Cryptography | No | No encryption needed |

### Known Threat Patterns for {stack}

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| XSS via dynamic content | Tampering | Static export — no user-generated HTML rendered |
| Third-party CDN scripts (Lenis CSS from unpkg) | Tampering | Self-host `lenis.css` via npm import (already done via `import 'lenis/dist/lenis.css'`) |
| Open redirect via nav links | Spoofing | Nav links are static data array — no user-controlled URLs |

## Sources

### Primary (HIGH confidence)
- [GitHub darkroomengineering/lenis](https://github.com/darkroomengineering/lenis) — Lenis options, React integration, lenis.css, anchors config
- [GitHub darkroomengineering/lenis/packages/react/README.md](https://github.com/darkroomengineering/lenis/blob/main/packages/react/README.md) — ReactLenis component, useLenis hook, root prop
- [Base UI Dialog docs](https://base-ui.com/react/components/dialog) — Dialog.Close render prop, focus trap, accessibility features
- [npm registry — lenis](https://www.npmjs.com/package/lenis) — Current version 1.3.23, exports map (`.`, `./react`, `./snap`, `./vue`)
- [Next.js basePath docs](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath) — How basePath affects links, automatic prefixing for `<Link>`

### Secondary (MEDIUM confidence)
- [unpkg lenis.css](https://unpkg.com/lenis@1.3.23/dist/lenis.css) — CSS file exists at expected path (HTTP 200 verified)
- Web search results — hide-on-scroll patterns, IntersectionObserver active section tracking (standard patterns, not framework-specific)

### Tertiary (LOW confidence)
- Lenis prefers-reduced-motion behavior — not documented officially, assumed manual implementation needed via `matchMedia` check [ASSUMED — flagged as A5, A6]

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Verified via npm registry, official GitHub docs, package exports
- Architecture: HIGH — Based on existing codebase patterns from Phase 1.1, verified component shells
- Pitfalls: MEDIUM — Some (basePath interaction, Base UI render prop) require runtime verification
- Patterns: HIGH — Lenis React docs verified, IntersectionObserver standard pattern, scroll direction standard pattern

**Research date:** 2026-06-19
**Valid until:** 2026-07-19 (30 days — stable domain, Lenis releases infrequently)
