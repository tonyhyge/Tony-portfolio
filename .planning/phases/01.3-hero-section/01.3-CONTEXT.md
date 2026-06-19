# Phase 1.3: Hero Section — Context

**Gathered:** 2026-06-19
**Status:** Ready for planning

<domain>
## Phase Boundary

The hero section — the first thing visitors see on the single-page portfolio. Includes: name, tagline, decorative hexagon badge, CTA buttons, CV download link, animated gradient background, and scroll-down indicator. Does NOT include: section content below (Phase 1.4+), particle/Three.js effects (Phase 4.1), or the photo itself (user will add later).
</domain>

<decisions>
## Implementation Decisions

### Layout
- **D-01:** Split layout — left-aligned text block + right-side decorative hexagon badge. Desktop only; on mobile, hexagon shrinks and stays inline on the right.
- **D-02:** Hero height: 90vh (almost full-screen). Vertically centered content group.

### Name & Tagline
- **D-03:** Name displayed as "Minh Pham" (no diacritics, Western order).
- **D-04:** Tagline: "AI Engineer & Researcher" — directly under the name.
- **D-05:** No intro paragraph — minimal hero with name, tagline, and CTAs only.

### Avatar / Hexagon Badge
- **D-06:** Decorative geometric hexagon (not a circle). Styled with the accent gradient border/glow (cyan→violet). Acts as a placeholder for a real profile photo in the future.
- **D-07:** Positioned as a right-side floating badge on desktop. On mobile, shrinks in size but stays inline beside the text (not above nor hidden).
- **D-08:** The hexagon is swappable to a photo later — implement as a container that can accept an `<img>` element without structural changes.

### CTAs
- **D-09:** Two buttons: "View Projects" (Button variant `default`) + "Contact Me" (Button variant `outline`). Both at `lg` size.
- **D-10:** "Download CV" rendered as a text link below the buttons (not a third button). Link target is a placeholder URL — user will provide the PDF later.

### Scroll-Down Indicator
- **D-11:** Text + arrow — e.g., "Scroll to explore" followed by a downward arrow.
- **D-12:** Fades on scroll: fully visible on load, fades out within ~100–200px of scroll. CSS opacity transition, no JS timer.

### Background
- **D-13:** Pure gradient mesh animation as built in `hero-background.tsx`. No noise overlay, no dot-grid, no mouse-track interaction.
- **D-14:** Gradient direction: cyan (oklch(0.65 0.18 210)) → violet (oklch(0.55 0.15 280)), with a slow 20s animation cycle defined in globals.css `@keyframes gradient-shift`.

### Heading Style
- **D-15:** Name "Minh Pham" rendered with gradient text effect (cyan→violet), using `background-clip: text` / `text-fill-color: transparent` pattern. Tagline remains solid foreground color.

### Claude's Discretion
- Exact gradient text implementation (Tailwind utilities vs inline style)
- Hexagon shape implementation (CSS `clip-path: polygon()` or SVG inline)
- Hexagon exact size on desktop vs mobile
- Scroll-down indicator exact phrasing ("Scroll to explore" or similar) and animation (gentle pulse on arrow)
- Fade-on-scroll exact threshold and transition duration
- Spacing/margins between text elements in the split layout
- Text link styling for "Download CV" (underline, subtle color, icon)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & Roadmap
- `.planning/REQUIREMENTS.md` §F1 — Hero Section functional requirements (name, tagline, avatar, animated background, CTAs)
- `.planning/ROADMAP.md` §Phase 1.3 — Phase scope: hero layout, particle/network bg, photo placeholder, CTAs, scroll-down indicator

### Prior Phase Context
- `.planning/phases/11-project-scaffold-design-system/11-CONTEXT.md` — Design tokens (accent palette, gradient), hero background decision (CSS gradient mesh, no Three.js), avatar placeholder approach
- `.planning/phases/12-navigation-shell/12-CONTEXT.md` — Component patterns, established layout architecture, existing components

### Existing Code
- `src/components/hero-background.tsx` — Already built CSS gradient mesh background component
- `src/components/ui/button.tsx` — Button component with variant system (default/outline used for CTAs)
- `src/components/section.tsx` — Section wrapper component (hero may use this or be custom)
- `src/components/container.tsx` — Max-width container for content alignment
- `src/app/page.tsx` — Home page with `#home` section placeholder
- `src/app/globals.css` — Theme tokens, `--gradient-hero`, `--accent`, `--accent-secondary`; `@keyframes gradient-shift` animation

### Design Assets
No external design files or specs — all decisions captured above.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **HeroBackground** (`src/components/hero-background.tsx`) — Ready-to-use fixed gradient mesh with `animate-gradient-shift`. No changes needed.
- **Button** (`src/components/ui/button.tsx`) — Has `default` and `outline` variants at `sm`/`default`/`lg`/`icon` sizes. `lg` size exists and is appropriate for hero CTAs.
- **Container** (`src/components/container.tsx`) — Max-width `xl` wrapper. Good for constraining hero content width.
- **Section** (`src/components/section.tsx`) — Has built-in padding/heading pattern. Hero may not use this directly (needs full-height, no heading).

### Established Patterns
- **"use client"** — ThemeToggle established the mounted-state + placeholder render pattern for client-only components
- **Tailwind utility-first styling** — No separate CSS modules; everything via `cn()` + classes
- **CSS `@keyframes` in `@theme inline`** — Animation keyframes defined in globals.css

### Integration Points
- **page.tsx** — Hero content goes inside `<section id="home">`, which already exists as a placeholder
- **HeroBackground** — Already in the DOM, positioned with `fixed inset-0 -z-10`. Hero content renders above it naturally
- **NavLinks** — `#home` anchor already configured in `src/app/data/navigation.ts`; smooth scroll targeting works

### New Components Needed
- `src/components/hero/` directory (per web/coding-style.md feature-based organization)
  - `Hero.tsx` — Main hero section composing all sub-components
  - `HexagonBadge.tsx` — Decorative hexagon placeholder for profile photo
  - `HeroCtas.tsx` — CTA buttons + CV download link
  - `ScrollIndicator.tsx` — "Scroll to explore" + arrow, fades on scroll
- `src/components/hero/hero.css` (optional, if clip-path or complex styles needed beyond Tailwind)

</code_context>

<specifics>
## Specific Ideas

- **Gradient text on name:** Use `bg-clip-text text-transparent bg-gradient-to-r from-[--accent] to-[--accent-secondary]` pattern. Already have the accent tokens; no new colors needed.
- **Hexagon shape:** CSS `clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)` with gradient border. Or inline SVG for cleaner border/glow effects.
- **Scroll-down fade:** Use IntersectionObserver (already has `useActiveSection` hook pattern) or a simple scroll listener that fades the indicator from opacity-100 to opacity-0 within the first 10% of the 90vh hero.
- **Mobile hexagon:** On viewports < 768px, hexagon resizes from ~120px to ~64px but stays on the right side of the text block (inline).
- **"Download CV" link:** Styled as a subtle text link with a download icon from lucide-react. Opens in new tab or downloads directly when PDF is available.

</specifics>

<deferred>
## Deferred Ideas

- **Particle/network animated background** — Mentioned in ROADMAP as optional. Decided against for MVP (Phase 11 decisions). Fits in Phase 4.1 (Animations & Interactions) if desired later.
- **Profile photo** — User will provide a real photo to replace the hexagon placeholder at a later date, not in this phase.

</deferred>

---

*Phase: 13-hero-section*
*Context gathered: 2026-06-19*
