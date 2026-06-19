---
phase: 12-navigation-shell
reviewed: 2026-06-19T14:00:00Z
depth: standard
files_reviewed: 11
files_reviewed_list:
  - src/app/data/navigation.ts
  - src/app/globals.css
  - src/app/layout.tsx
  - src/app/page.tsx
  - src/components/lenis-provider.tsx
  - src/components/mobile-nav.tsx
  - src/components/nav-links.tsx
  - src/components/site-footer.tsx
  - src/components/site-header.tsx
  - src/hooks/useActiveSection.ts
  - src/hooks/useScrollDirection.ts
findings:
  critical: 0
  warning: 2
  info: 3
  total: 5
status: issues_found
---

# Phase 12: Code Review Report — Navigation Shell

**Reviewed:** 2026-06-19T14:00:00Z
**Depth:** standard
**Files Reviewed:** 11
**Status:** issues_found

## Summary

Reviewed the navigation shell implementation: site header/footer, mobile nav, smooth scroll provider, scroll direction hook, and active section tracking. The code is well-structured, follows TypeScript strict mode, uses semantic HTML with good accessibility, and respects project conventions. Two warnings were found: a missing `asChild` prop on `SheetTrigger` that creates invalid nested `<button>` HTML, and a logic bug in `useActiveSection` where the last-intersecting entry always wins regardless of visibility ratio.

## Warnings

### WR-01: Missing `asChild` on `SheetTrigger` produces nested buttons

**File:** `src/components/mobile-nav.tsx:20-23`
**Issue:** `SheetTrigger` wraps a `<Button>` without the `asChild` prop. Shadcn/Radix `SheetTrigger` renders its own `<button>` wrapper by default. When `<Button>` also renders a `<button>`, the result is a `<button>` nested inside another `<button>`, which is invalid HTML. This can break event propagation, focus handling, and accessibility tree structure.

**Fix:** Add `asChild` to `SheetTrigger` so it merges its trigger behavior into the `<Button>` element instead of wrapping it:

```tsx
<SheetTrigger asChild>
  <Button variant="ghost" size="icon" aria-label="Toggle mobile menu" className="lg:hidden">
    <Menu className="size-5" />
  </Button>
</SheetTrigger>
```

### WR-02: `useActiveSection` picks last intersecting entry, not most visible

**File:** `src/hooks/useActiveSection.ts:12-17`
**Issue:** The IntersectionObserver callback iterates entries and overwrites `activeSection` with `entry.target.id` for every intersecting entry. Because entries are processed in observation order (not visibility order), the last observed section that happens to be intersecting will win. In a stacked single-page layout with generous `rootMargin`, multiple sections can intersect simultaneously. The user may see "Experience" highlighted in the nav while "About" is actually the most visible section.

**Fix:** Sort entries by intersection ratio, or find the entry with the highest `intersectionRatio`:

```tsx
const observer = new IntersectionObserver(
  (entries) => {
    const mostVisible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (mostVisible) {
      setActiveSection(mostVisible.target.id);
    }
  },
  {
    rootMargin: "-20% 0px -60% 0px",
    threshold: [0, 0.25, 0.5],
  }
);
```

## Info

### IN-01: Stale closure in `useScrollDirection` defeats delta threshold

**File:** `src/hooks/useScrollDirection.ts:15-24`
**Issue:** The `handleScroll` callback captures `scrollY` from the last render via `useCallback` dependency. Between renders, multiple scroll events reuse the same stale `scrollY`, so `delta = current - scrollY` accumulates the entire scroll distance since the last render rather than the incremental delta. This makes the `threshold` check always pass, effectively disabling scroll direction debouncing. Direction detection still works (sign is preserved) but with no jitter filtering.

**Fix:** Replace `useState` for `scrollY` with `useRef` to access the most recent scroll position without depending on React re-renders:

```tsx
import { useState, useEffect, useCallback, useRef } from "react";

export function useScrollDirection(threshold = 10) {
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const current = window.scrollY;
    setScrolled(current > 50);
    const delta = current - lastScrollY.current;
    lastScrollY.current = current;
    if (Math.abs(delta) > threshold) {
      setDirection(delta > 0 ? "down" : "up");
    }
  }, [threshold]);

  // ...
}
```

### IN-02: Duplicate `NavLink` interface with mismatched optionality

**File:** `src/components/nav-links.tsx:4-8` and `src/app/data/navigation.ts:1-5`
**Issue:** Both files define a `NavLink` interface with the same shape but different `isAnchor` optionality. `navigation.ts` requires `isAnchor: boolean`, while `nav-links.tsx` has `isAnchor?: boolean`. This inconsistency can cause confusion. Consider importing the canonical interface from `navigation.ts` into `nav-links.tsx` instead of redefining it:

```tsx
import { NavLink } from "@/app/data/navigation";
// Or re-export NavLink from a shared types file
```

### IN-03: Potential Tailwind v4 incompatibility for `ring-3`

**Files:** `src/components/mobile-nav.tsx:35`, `src/components/nav-links.tsx:25,41`
**Issue:** `focus-visible:ring-3` uses Tailwind v3 ring sizing. In Tailwind v4, the ring API was restructured and `ring-3` may not resolve. Verify during build that focus ring styles render correctly. If broken, replace with `ring-[3px]` or the appropriate v4 ring utility.

---

_Reviewed: 2026-06-19T14:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
