# Phase 1.3: Hero Section — Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-19
**Phase:** 13-hero-section
**Areas discussed:** Layout, Avatar, CTAs, Scroll indicator, Hero copy, Mobile responsive, Background texture, Interactive background, Heading style

---

## Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Centered | Classic centered hero — name, title, CTA vertically stacked | |
| Left-aligned | Editorial feel — text left, visual space right | |
| Split: text + badge | Left-aligned text block with floating badge/ring on the right | ✓ |

**User's choice:** Split: text + badge
**Notes:** Left-aligned text + right-side decorative hexagon badge.

| Option | Description | Selected |
|--------|-------------|----------|
| Full-screen (100vh) | Dramatic, immersive. Gradient bg fills viewport. | |
| Compact (auto) | Content-sized height, lets next section peek in | |
| Almost full-screen (90vh) | Content vertically centered within 90vh | ✓ |

**User's choice:** Almost full-screen (90vh)

## Avatar

| Option | Description | Selected |
|--------|-------------|----------|
| Initials + glow | Large circle with accent gradient ring/glow | |
| Silhouette icon | User silhouette from lucide-react | |
| Decorative geometric | Abstract shape (hexagon, diamond) — AI/research theme | ✓ |

**User's choice:** Decorative geometric
**Notes:** Hexagon shape, right-side badge position.

| Option | Description | Selected |
|--------|-------------|----------|
| Hexagon | Six-sided, AI/tech theme, glowing gradient border | ✓ |
| Diamond | 45° rotated square, editorial feel | |
| Circle + decorative ring | Traditional avatar with ornate ring | |

**User's choice:** Hexagon

## CTAs

| Option | Description | Selected |
|--------|-------------|----------|
| 2 buttons: primary + outline | View Projects (default) + Contact Me (outline). CV as text link | ✓ |
| 3 buttons, stacked | All three as buttons | |
| 2 buttons + icon link | Primary + outline, CV as small icon button | |

**User's choice:** 2 buttons: primary + outline
**Notes:** CV as text link below the buttons.

| Option | Description | Selected |
|--------|-------------|----------|
| Large (h-9) | Standard large size | ✓ |
| Extra-large (custom) | Bigger than lg, custom class | |
| Default (h-8) | Same as all page buttons | |

**User's choice:** Large (h-9)

## Scroll-Down Indicator

| Option | Description | Selected |
|--------|-------------|----------|
| Animated chevron | Single downward chevron bouncing | |
| Mouse icon | Mouse outline with scrolling wheel | |
| Text + arrow | "Scroll to explore" + arrow | ✓ |

**User's choice:** Text + arrow

| Option | Description | Selected |
|--------|-------------|----------|
| Always visible | Stays at bottom of hero | |
| Fades on scroll | Fades out within ~100-200px | ✓ |
| Auto-hides after delay | Fades after 3-4 seconds | |

**User's choice:** Fades on scroll

## Hero Copy

| Option | Description | Selected |
|--------|-------------|----------|
| Phạm Quang Minh | Full formal name with diacritics | |
| Minh Pham | Western order, no diacritics | ✓ |
| Hybrid | Minh (Tony) Phạm style | |

**User's choice:** Minh Pham (no diacritics)

| Option | Description | Selected |
|--------|-------------|----------|
| AI Engineer & Researcher | Direct existing meta description | ✓ |
| Long narrative | Custom longer tagline | |
| Claude propose | Let Claude suggest options | |

**User's choice:** AI Engineer & Researcher
**Notes:** After Claude proposed 3 options, user selected this.

| Option | Description | Selected |
|--------|-------------|----------|
| Short & direct | One sentence intro | |
| Two-sentence narrative | Brief story paragraph | |
| Minimal — just CTAs | No intro text | ✓ |
| Claude propose | Let Claude suggest | |

**User's choice:** Minimal — just CTAs
**Notes:** Name + tagline only. No intro paragraph.

## Mobile Responsive Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Hexagon above text | Centered above name on mobile | |
| Hide hexagon on mobile | Text-only on small screens | |
| Smaller hexagon inline | Shrinks, stays inline on the right | ✓ |

**User's choice:** Smaller hexagon inline

## Background Texture / Depth

| Option | Description | Selected |
|--------|-------------|----------|
| Subtle dot-grid overlay | Tech/screen feel, pure CSS | |
| Subtle noise/grain | Organic film grain | |
| Keep pure gradient | Clean, no overlay | ✓ |

**User's choice:** Keep pure gradient

## Interactive Background

| Option | Description | Selected |
|--------|-------------|----------|
| No interaction | Pure CSS animation, no JS | ✓ |
| Mouse-track gradient | Gradient shifts toward cursor | |
| Cursor glow / spotlight | Radial highlight following cursor | |

**User's choice:** No interaction

## Heading Style

| Option | Description | Selected |
|--------|-------------|----------|
| Gradient text (cyan→violet) | `background-clip: text` gradient on name | ✓ |
| Solid accent color | Cyan solid color | |
| Foreground + glow | White with glow effect | |

**User's choice:** Gradient text (cyan→violet)

## Claude's Discretion

- Hexagon exact shape implementation (CSS clip-path vs SVG)
- Hexagon exact size desktop vs mobile
- Scroll-down indicator exact phrasing and animation
- Fade-on-scroll threshold and transition timing
- Spacing/margins in split layout
- "Download CV" text link styling
- Gradient text exact Tailwind implementation

## Deferred Ideas

- Particle/network animated background → Phase 4.1
- Real profile photo → user provides later, not in this phase
