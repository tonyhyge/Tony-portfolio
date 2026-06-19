---
phase: 11
slug: project-scaffold-design-system
status: verified
threats_open: 0
asvs_level: 1
created: 2026-06-19
---

# Phase 11 — Project Scaffold & Design System — Security

> Per-phase security contract: threat register, accepted risks, and audit trail.

---

## Trust Boundaries

| Boundary | Description | Data Crossing |
|----------|-------------|---------------|
| localStorage → ThemeToggle | Theme preference stored in browser localStorage, read by client component | Non-sensitive (dark/light preference string) |
| Inline script → `<html>.classList` | Flash-prevention script sets `.dark` class before hydration | No data crossing — script is developer-authored literal |
| Hardcoded data files → static bundle | TypeScript objects compiled into JS bundle at build time | Read-only, no external input |

---

## Threat Register

| Threat ID | Category | Component | Disposition | Mitigation | Status |
|-----------|----------|-----------|-------------|------------|--------|
| T-11-01 | T (Tampering) | Inline theme script (layout.tsx) | accept | Script content is authored by developer, never modified by user data. No user-controllable input reaches `innerHTML`. ClassName toggle on `<html>` is visual-only. | closed |
| T-11-02 | S (Spoofing) | localStorage theme key | accept | Theme preference is non-sensitive. No authentication, session data, or PII involved. Correctness of theme preference has no security impact. | closed |
| T-11-02-01 | T (Tampering) | theme-toggle.tsx classList | accept | Toggling `.dark` class on `<html>` controls visual presentation only. No functional or data impact. | closed |
| T-11-02-02 | T (Tampering) | theme-toggle.tsx localStorage | accept | Theme preference is non-sensitive. No authentication tokens, session data, or user content stored in localStorage. | closed |
| T-11-03-01 | T (Tampering) | data files (experience/research/skills) | accept | Hardcoded TypeScript objects compiled into static bundle at build time. No runtime user input touches these data structures. Developer-authored content only. | closed |

---

## Accepted Risks Log

No accepted risks. All threats have disposition **accept** (documented risk — no implementation required).

---

## Security Audit Trail

| Audit Date | Threats Total | Closed | Open | Run By |
|------------|---------------|--------|------|--------|
| 2026-06-19 | 5 | 5 | 0 | gsd-security-auditor |

---

## Sign-Off

- [x] All threats have a disposition (accept)
- [x] Accepted risks documented in Accepted Risks Log (none — all accepted)
- [x] `threats_open: 0` confirmed
- [x] `status: verified` set in frontmatter

**Approval:** verified 2026-06-19
