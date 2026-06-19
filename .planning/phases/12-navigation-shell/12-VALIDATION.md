---
phase: 12
slug: navigation-shell
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-06-19
---

# Phase 12 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Playwright |
| **Config file** | None — Wave 0 creates playwright.config.ts |
| **Quick run command** | `npx playwright test --grep "nav\|header\|footer\|menu\|a11y\|responsive"` |
| **Full suite command** | `npx playwright test` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build` — verify static export compiles
- **After every plan wave:** Run `npx playwright test --grep "nav\|header\|footer\|menu"`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 12-01-01 | 01 | 1 | F9, NFR3 | — | N/A | unit | `grep` checks on file | ❌ W0 | ⬜ pending |
| 12-01-02 | 01 | 1 | F9, NFR2 | — | N/A | unit | `grep` checks on file | ❌ W0 | ⬜ pending |
| 12-01-03 | 01 | 1 | F9, F10, NFR2, NFR3 | — | N/A | unit | `grep` checks on file | ❌ W0 | ⬜ pending |
| 12-02-01 | 02 | 1 | F9, NFR2 | T-12-03 | prefers-reduced-motion fallback | unit | `grep` checks on file | ❌ W0 | ⬜ pending |
| 12-02-02 | 02 | 1 | F9, NFR2, NFR3 | T-12-04 | Base UI focus trap, escape key | E2E | `playwright test mobile-menu` | ❌ W0 | ⬜ pending |
| 12-02-03 | 02 | 1 | F9, NFR2, NFR3 | T-12-05 | z-40 below overlay | unit | `grep` checks on file | ❌ W0 | ⬜ pending |
| 12-03-01 | 03 | 2 | F9, F10, NFR2, NFR3 | — | N/A | E2E | `playwright test header footer responsive` | ❌ W0 | ⬜ pending |
| 12-03-02 | 03 | 2 | F9, NFR2 | — | N/A | E2E | `playwright test navigation a11y` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/e2e/header.spec.ts` — F9 header visibility, hide-on-scroll-down, show-on-scroll-up, backdrop fade
- [ ] `tests/e2e/navigation.spec.ts` — F9 nav links render, smooth scroll on anchor click, active section dot indicator
- [ ] `tests/e2e/mobile-menu.spec.ts` — F9 Sheet opens/closes, close-on-link-tap, hamburger visible < 1024px
- [ ] `tests/e2e/footer.spec.ts` — F10 copyright year, social icons render and link to correct URLs
- [ ] `tests/e2e/a11y.spec.ts` — NFR2 keyboard nav, ARIA labels, focus trap in Sheet, focus-visible indicators
- [ ] `tests/e2e/responsive.spec.ts` — NFR3 desktop nav at >= 1024px, hamburger at < 1024px, no horizontal scroll
- [ ] `npx playwright install` — if not already installed in project

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Lenis smooth scroll feels natural | F9 | Subjective feel — automation can verify scroll happened, not "smoothness" | Scroll wheel through all sections; verify no jank or rubber-banding |
| Header backdrop fade smoothness | F9 | Subjective visual quality | Scroll up/down across 50px threshold; verify no visible flicker |
| Active section dot transitions between sections | F9 | Visual animation quality | Scroll rapidly between sections; verify dot doesn't jump erratically |

---

## Validation Sign-Off

- [ ] All tasks have automated verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
