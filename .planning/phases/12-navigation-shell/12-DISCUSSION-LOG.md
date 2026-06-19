# Phase 1.2: Navigation & Shell — Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-19
**Phase:** 12-navigation-shell
**Areas discussed:** Scroll behavior, Smooth scroll engine, Active section indicator, Mobile menu UX, Footer

---

## Footer

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal footer | Copyright + social icons only | ✓ |
| Rich footer | Nav links, last-updated, credit | |

**User's choice:** Minimal — copyright + social icons only

---

## Scroll Behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Always visible | Header stays fixed with glassmorphism at all times | |
| Hide on scroll down | Header slides up on scroll down, slides back on scroll up | ✓ |

**User's choice:** Hide on scroll down

| Option | Description | Selected |
|--------|-------------|----------|
| Always blurred | Full glassmorphism always on | |
| Fade in on scroll | Transparent at top, backdrop-blur fades in after scroll | ✓ |

**User's choice:** Fade in (transparent at top → backdrop-blur + border after ~50px scroll)

---

## Smooth Scroll Engine

| Option | Description | Selected |
|--------|-------------|----------|
| Native CSS | scroll-behavior: smooth — 0 deps, limited easing | |
| Lenis v2 | Custom smooth scroll, custom easing, programmatic control | ✓ |

**User's choice:** Lenis v2

---

## Active Section Indicator

| Option | Description | Selected |
|--------|-------------|----------|
| Underline accent | Animated accent underline sliding between links | |
| Background highlight | Filled pill behind active link | |
| Dot indicator | Small accent dot beside/below active link | ✓ |
| Text accent color | Accent color on active link text only | |

**User's choice:** Dot indicator

---

## Mobile Menu UX

| Option | Description | Selected |
|--------|-------------|----------|
| Slide-in from right | Sheet panel from right (Sheet component exists) | ✓ |
| Full-screen overlay | Covers entire screen | |

**User's choice:** Slide-in from right (Sheet component)

| Option | Description | Selected |
|--------|-------------|----------|
| Close on click | Sheet auto-closes on nav link tap | ✓ |
| Manual close | User must tap close button | |

**User's choice:** Close on link click

---

## Claude's Discretion

- IntersectionObserver threshold and rootMargin
- Dot indicator exact positioning and animation
- Hide-on-scroll-down implementation approach
- Lenis configuration (smoothness, easing)
- Sheet mobile menu width and content layout

## Deferred Ideas

None.
