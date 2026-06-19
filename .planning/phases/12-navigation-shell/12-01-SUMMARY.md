---
phase: 12
plan: 01
subsystem: navigation-shell
tags: [nav-data, hooks, scroll, footer, site-footer, navigation]
requires: [phase-11-project-scaffold-design-system]
provides: [navigation-data, scroll-hooks, nav-links-extension, site-footer]
affects: [src/app/data/, src/hooks/, src/components/, src/app/globals.css, package.json]
tech-stack:
  added: [lenis@1.3.23]
  patterns: [useScrollDirection with 10px threshold, useActiveSection with IntersectionObserver rootMargin -20%/ -60%]
key-files:
  created:
    - src/app/data/navigation.ts
    - src/hooks/useScrollDirection.ts
    - src/hooks/useActiveSection.ts
    - src/components/site-footer.tsx
  modified:
    - package.json
    - package-lock.json
    - src/components/nav-links.tsx
    - src/app/globals.css
decisions:
  - Icon substitution: lucide-react v1 removed brand icons (Github, Linkedin). Used Code2 (GitHub) and Briefcase (LinkedIn) as best semantic alternatives.
  - Exact version pinning: lenis pinned to 1.3.23 (no caret) per threat model T-12-01.
duration: 0m
completed: 2026-06-19
task_count: 3
commit_count: 3
---

# Phase 12 Plan 01: Navigation Data, Hooks, NavLinks Extension, SiteFooter — Summary

One-liner: Navigation data file with 7 link objects, scroll direction and active section hooks, NavLinks extension with accent dot indicator, and SiteFooter component with copyright and social icons.

## Task Results

| Task | Name | Status | Commit |
|------|------|--------|--------|
| 1 | Install Lenis, create nav data file, update globals.css | Done | a3f8022 |
| 2 | Create useScrollDirection and useActiveSection hooks | Done | 1745f5c |
| 3 | Extend NavLinks with activeHref prop and create SiteFooter | Done | 0605c39 |

## Deviations from Plan

### Rule 3 - Dependency: Lenis version pinning corrected

**Found during:** Task 1
**Issue:** `npm install lenis@1.3.23` installed `^1.3.23` (caret range) instead of exact `1.3.23`. Threat model T-12-01 requires exact pinning.
**Fix:** Re-ran with `--save-exact` flag to pin to `1.3.23` without caret.
**Commit:** a3f8022

### Rule 1 - Bug: Lucide-react brand icon names missing

**Found during:** Task 3
**Issue:** Plan references `Github` and `Linkedin` icon names, but lucide-react v1.21.0 removed all brand icons. TypeScript compilation failed with `Module has no exported member`.
**Fix:** Replaced `Github` with `Code2` (code hosting proxy) and `Linkedin` with `Briefcase` (professional network proxy). `GraduationCap` and `Mail` icons still exist and were kept.
**Files modified:** `src/components/site-footer.tsx`
**Commit:** 0605c39

## Files Created

### `src/app/data/navigation.ts`
- Exports `NavLink` interface with `label`, `href`, `isAnchor` (required boolean)
- Exports `navLinks` array with exactly 7 items: Home, About, Experience, Research, Skills, Blog, Contact
- Anchor links (`#home`, `#about`, `#experience`, `#skills`, `#contact`) vs page links (`/research`, `/blog`)

### `src/hooks/useScrollDirection.ts`
- `"use client"` directive, exports `useScrollDirection(threshold = 10)`
- Returns `{direction: "up" | "down", scrolled: boolean}`
- 10px threshold prevents direction jank (per RESEARCH.md Pitfall 4)
- 50px `scrolled` threshold triggers backdrop state (per D-02)
- `passive: true` event listener for scroll performance

### `src/hooks/useActiveSection.ts`
- `"use client"` directive, exports `useActiveSection(sectionIds: string[])`
- Uses IntersectionObserver with `rootMargin: "-20% 0px -60% 0px"` and `threshold: [0, 0.25, 0.5]`
- Returns active section ID string, defaults to `sectionIds[0]`
- Disconnects observer on cleanup

### `src/components/site-footer.tsx`
- Exports `SiteFooter` component
- Semantic `<footer>` with `aria-label="Site footer"`
- Copyright line with dynamic year (`new Date().getFullYear()`) and "Phạm Quang Minh"
- 4 social icons: Code2 (GitHub), Briefcase (LinkedIn), GraduationCap (Scholar), Mail (Email)
- All links `target="_blank"` with `rel="noopener noreferrer"` and `aria-label`
- Responsive layout: stacked on mobile, row on `sm:` breakpoint

## Files Modified

### `package.json` / `package-lock.json`
- Added `"lenis": "1.3.23"` (exact pin)

### `src/components/nav-links.tsx`
- Added `activeHref?: string` to `NavLinksProps`
- Active link renders `text-foreground` + accent dot (`bg-accent h-1.5 w-1.5 rounded-full`) with `aria-hidden="true"`
- Inactive links render `text-muted-foreground`
- `NavLink` interface remains exported for downstream consumers

### `src/app/globals.css`
- Added `scroll-behavior: auto` to `html` rule in `@layer base` — prevents conflict with Lenis smooth scroll

## Verification

- [x] `npm run build` — exit code 0
- [x] `npx tsc --noEmit` — no errors
- [x] navLinks array with exactly 7 items
- [x] useScrollDirection exported with 10px threshold
- [x] useActiveSection exports with rootMargin `-20% 0px -60% 0px`
- [x] NavLinks accepts activeHref, renders accent dot with aria-hidden
- [x] SiteFooter exported with 4 social icons
- [x] globals.css has `scroll-behavior: auto`
- [x] lenis@1.3.23 installed (exact version)

## Self-Check: PASSED

```
MISSING: .planning/PROJECT.md — file does not exist in worktree (shared orchestrator file, expected)
MISSING: ./CLAUDE.md — file does not exist in worktree (project root file, expected)
```
All created/modified files verified present. All commits verified in git log. Build passes. No stubs detected.
