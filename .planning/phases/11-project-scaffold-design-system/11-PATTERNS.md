# Phase 1.1: Project Scaffold & Design System - Pattern Map

**Mapped:** 2026-06-19
**Files analyzed:** 13 (10 new, 3 modified)
**Analogs found:** 11 / 13 (2 data files have no codebase analog -- use RESEARCH.md patterns)

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `src/components/theme-toggle.tsx` | component | event-driven | `src/components/ui/separator.tsx` | role-match |
| `src/components/container.tsx` | component | static | `src/components/ui/card.tsx` | role-match |
| `src/components/section.tsx` | component | static | `src/components/ui/card.tsx` | role-match |
| `src/components/hero-background.tsx` | component | static | `src/components/ui/separator.tsx` | role-match |
| `src/components/sticky-header.tsx` | component | static | `src/components/ui/card.tsx` | role-match |
| `src/components/nav-links.tsx` | component | static | `src/components/ui/navigation-menu.tsx` | role-match |
| `src/app/layout.tsx` | config | static | `src/app/layout.tsx` (self) | exact |
| `src/app/globals.css` | config | static | `src/app/globals.css` (self) | exact |
| `src/app/data/experience.ts` | model | static | _no analog_ | -- |
| `src/app/data/research.ts` | model | static | _no analog_ | -- |
| `src/app/data/skills.ts` | model | static | _no analog_ | -- |
| `content/blog/` | -- | -- | `content/` directory | partial |
| `content/research/` | -- | -- | `content/` directory | partial |

## Pattern Assignments

### `src/components/theme-toggle.tsx` (component, event-driven)

**Analog:** `src/components/ui/separator.tsx` (for "use client" directive pattern) + `src/components/ui/button.tsx` (for component structure with lucide-react icons)

**Imports pattern** (from separator.tsx lines 1-5, button.tsx lines 1-4):
```typescript
"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
```

**Component structure pattern** (from separator.tsx lines 7-23, button.tsx lines 43-56):
- Named function export, no `React.FC`
- Props as inline interface or `React.ComponentProps`
- `cn()` for className merging
- Default className tokens for base styling

**Core pattern** - self-contained "use client" island (from RESEARCH.md lines 192-223):
```typescript
"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  if (!mounted) {
    return <div className="size-8" />; // placeholder same size as icon button
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
      {document.documentElement.classList.contains("dark")
        ? <Sun className="size-4" />
        : <Moon className="size-4" />
      }
    </Button>
  );
}
```

**Key patterns to copy:**
1. "use client" directive (required for browser APIs: localStorage, classList)
2. `useState(false)` + `useEffect(() => setMounted(true), [])` for hydration safety
3. Render placeholder `<div>` with matching dimensions before mount to prevent layout shift
4. Direct DOM manipulation (`document.documentElement.classList.toggle`) -- no context provider wrapper
5. lucide-react icons (`Moon`, `Sun`) at `size-4` inside shadcn Button

---

### `src/components/container.tsx` (component, static)

**Analog:** `src/components/ui/card.tsx` (card.tsx lines 5-21)

**Imports pattern** (from card.tsx lines 1-3):
```typescript
import { cn } from "@/lib/utils"
```

**Core layout wrapper pattern** (from card.tsx lines 5-21 -- simple div with className merging):
```typescript
interface ContainerProps extends React.ComponentProps<"div"> {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export function Container({ className, maxWidth = "xl", ...props }: ContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
  };

  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        maxWidthClasses[maxWidth],
        className
      )}
      {...props}
    />
  );
}
```

**Key patterns to copy:**
1. Props extend `React.ComponentProps<"div">` for full native attribute passthrough (card.tsx line 9)
2. `cn()` for className merging with default classes (card.tsx line 15)
3. Named function export, no `React.FC` (card.tsx line 5)
4. `data-slot` attribute is optional for custom components (shadcn convention, not required for non-shadcn)

---

### `src/components/section.tsx` (component, static)

**Analog:** `src/components/ui/card.tsx` (compound card sub-components: card.tsx lines 23-34, 36-47)

**Imports pattern:**
```typescript
import { cn } from "@/lib/utils"
import { Container } from "./container"
```

**Core wrapper + heading pattern** (from card.tsx CardHeader/CardTitle lines 23-47):
```typescript
interface SectionProps extends React.ComponentProps<"section"> {
  id: string;
  title?: string;
  subtitle?: string;
}

export function Section({ id, title, subtitle, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24", className)}
      aria-labelledby={title ? `${id}-heading` : undefined}
      {...props}
    >
      <Container>
        {title && (
          <div className="mb-10 md:mb-14">
            <h2
              id={`${id}-heading`}
              className="font-heading text-3xl font-semibold tracking-tight md:text-4xl"
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-base text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
```

**Key patterns to copy:**
1. Extends `React.ComponentProps<"section">` for semantic HTML passthrough (card.tsx passes `div`)
2. Uses `font-heading` CSS variable (defined in @theme inline -> --font-inter)
3. Responsive heading sizes: `text-3xl` mobile, `text-4xl` at `md:` breakpoint
4. `aria-labelledby` linking to heading id for accessibility
5. Spacing: `py-16 md:py-24` (matches spacing table: section-to-section gaps)

---

### `src/app/layout.tsx` (modify, config)

**Self-analog:** Current `src/app/layout.tsx` (lines 1-33). Full replacement pattern from RESEARCH.md lines 435-483.

**Current imports to replace** (layout.tsx lines 1-3):
```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
```
Replace with:
```typescript
import { Inter, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
```

**Font configuration pattern** (RESEARCH.md lines 441-452):
```typescript
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
```

**Theme flash prevention inline script** (RESEARCH.md lines 459-465):
```typescript
const themeScript = `
  (function() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  })();
`;
```

**Root layout with suppressHydrationWarning** (RESEARCH.md lines 467-483):
```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
```

**Key changes from current layout.tsx:**
1. Replace `Geist` / `Geist_Mono` imports with `Inter` / `JetBrains_Mono`
2. Change CSS variables from `--font-geist-sans` / `--font-geist-mono` to `--font-inter` / `--font-jetbrains-mono`
3. Add `suppressHydrationWarning` to `<html>` (prevents React hydration mismatch from inline theme script)
4. Add inline `<script>` in `<head>` for flash prevention
5. Update `<body>` classes from `min-h-full flex flex-col` to `min-h-full flex flex-col bg-background text-foreground`
6. Remove `h-full` from `<html>` className (not needed with min-h-full on body)

---

### `src/app/globals.css` (modify, config)

**Self-analog:** Current `src/app/globals.css` (lines 1-130). Additions to @theme inline, :root, and .dark blocks.

**@theme inline additions** (add within existing block, after `--font-heading: var(--font-sans);` line 12):
```css
@theme inline {
  /* ... existing entries ... */
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent-secondary: var(--accent-secondary);
  /* Update font-heading to reference Inter instead of font-sans */
  --font-heading: var(--font-inter);
}
```

**:root additions** (add after existing accent entries, around line 64):
```css
:root {
  /* ... existing entries ... */
  --accent: oklch(0.65 0.18 210);
  --accent-foreground: oklch(0.98 0 0);
  --accent-secondary: oklch(0.55 0.15 280);
  --gradient-hero: linear-gradient(135deg, oklch(0.65 0.18 210), oklch(0.55 0.15 280));
}
```

**.dark additions** (add after existing accent entries, around line 99):
```css
.dark {
  /* ... existing entries ... */
  --accent: oklch(0.65 0.18 210);
  --accent-foreground: oklch(0.98 0 0);
  --accent-secondary: oklch(0.6 0.18 280);
}
```

**Key changes from current globals.css:**
1. Update `--font-heading` in `@theme inline` from `var(--font-sans)` to `var(--font-inter)` (line 12)
2. Add `--color-accent`, `--color-accent-foreground`, `--color-accent-secondary` to `@theme inline`
3. Add `--accent`, `--accent-foreground`, `--accent-secondary`, `--gradient-hero` to `:root`
4. Add `--accent`, `--accent-foreground`, `--accent-secondary` to `.dark`
5. `--gradient-hero` is NOT added to `@theme inline` -- it is a `linear-gradient()` value which cannot be used in Tailwind `bg-*` utilities (per RESEARCH.md Pitfall A4)

---

### `src/app/data/experience.ts` (model, static)

**Analog:** No existing data file in the codebase. Use RESEARCH.md data file pattern (lines 488-518).

```typescript
export interface Experience {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  description: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    role: "Research Intern",
    company: "AI Lab",
    location: "San Francisco, CA",
    startDate: "2024-06",
    endDate: "Present",
    description: "Working on NLP research.",
    highlights: [
      "Developed production RAG pipeline",
      "Fine-tuned LLMs for domain-specific tasks",
    ],
  },
];

export type { Experience };
```

**Key patterns:**
1. `export interface` for the shape definition
2. `export const` for the data array (typed)
3. `export type` for re-exporting the interface
4. Date format: `"YYYY-MM"` strings
5. `endDate: string | "Present"` union type for current positions

---

### `src/app/data/research.ts` (model, static)

**Analog:** No existing analog. Same pattern as `experience.ts` with different interface.

```typescript
export interface ResearchProject {
  title: string;
  status: "active" | "completed" | "draft";
  description: string;
  tags: string[];
  link?: string;
}

export const researchProjects: ResearchProject[] = [
  // ...
];

export type { ResearchProject };
```

**Key patterns:**
1. `status` field uses string literal union (`"active" | "completed" | "draft"`)
2. Optional fields with `?` marker for links/URLs

---

### `src/app/data/skills.ts` (model, static)

```typescript
export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  // ...
];

export type { SkillCategory };
```

---

### `src/components/hero-background.tsx` (component, static)

**Analog:** `src/components/ui/separator.tsx` (simple visual-only component, lines 1-23)

```typescript
import { cn } from "@/lib/utils"

export function HeroBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed inset-0 -z-10",
        "bg-gradient-hero",
        "bg-[length:400%_400%]",
        "animate-gradient-shift",
        "motion-reduce:animate-none",
        className
      )}
      aria-hidden="true"
    />
  );
}
```

**CSS @keyframes to add in globals.css:**
```css
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
}

@theme inline {
  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    25% { background-position: 100% 0%; }
    50% { background-position: 100% 100%; }
    75% { background-position: 0% 100%; }
  }
}
```

**Key patterns:**
1. `aria-hidden="true"` -- decorative element, not interactive
2. `position: fixed; inset: 0; z-index: -10` -- behind all content
3. `motion-reduce:animate-none` -- accessibility, respects `prefers-reduced-motion`
4. CSS `@keyframes` defined in globals.css, referenced via Tailwind `animate-` utility

---

### `src/components/sticky-header.tsx` (component, static)

**Analog:** `src/components/ui/card.tsx` (wrapper component, lines 5-21)

```typescript
"use client"

import { cn } from "@/lib/utils"

interface StickyHeaderProps extends React.ComponentProps<"header"> {
  /** Optional scrolled state trigger for shadow/backdrop */
}

export function StickyHeader({ className, children, ...props }: StickyHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full",
        "bg-background/80 backdrop-blur-md",
        "border-b border-border/50",
        className
      )}
      {...props}
    >
      {children}
    </header>
  );
}
```

**Key patterns:**
1. `"use client"` only needed if scroll-state tracking is added in the future
2. `bg-background/80` + `backdrop-blur-md` for glassmorphism header
3. `sticky top-0 z-40` for sticky positioning (below sheet overlay z-50)

---

### `src/components/nav-links.tsx` (component, static)

**Analog:** `src/components/ui/navigation-menu.tsx` (nav component pattern, lines 1-5, 45-56, 124-138)

```typescript
import { cn } from "@/lib/utils"
import Link from "next/link"

interface NavLink {
  label: string;
  href: string;
  isAnchor?: boolean;
}

interface NavLinksProps {
  links: NavLink[];
  className?: string;
}

export function NavLinks({ links, className }: NavLinksProps) {
  return (
    <nav className={cn("flex items-center gap-1", className)} aria-label="Main navigation">
      {links.map((link) =>
        link.isAnchor ? (
          <a
            key={link.href}
            href={link.href}
            className="inline-flex h-9 w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {link.label}
          </a>
        ) : (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex h-9 w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {link.label}
          </Link>
        )
      )}
    </nav>
  );
}
```

**Key patterns from navigation-menu.tsx:**
1. Nav items use `rounded-lg px-2.5 py-1.5 text-sm font-medium` (navigationMenuTriggerStyle, line 58-60)
2. `hover:bg-muted` for hover state
3. `focus-visible:ring-3 focus-visible:ring-ring/50` for keyboard focus
4. Anchor links (`<a href="#section-id">`) for same-page smooth scroll
5. Next.js `<Link>` for page navigation (`/research`, `/blog`)

---

### `content/blog/` and `content/research/` (directories for Milestone 2)

No file analog needed. Create empty directories. No files to create inside them yet.

## Shared Patterns

### Component Structure (for all new components)
**Source:** `src/components/ui/card.tsx`
```typescript
import { cn } from "@/lib/utils"

interface ComponentProps extends React.ComponentProps<"element"> {
  // custom props
}

export function Component({ className, ...props }: ComponentProps) {
  return (
    <element
      className={cn("base-classes", className)}
      {...props}
    />
  )
}
```

**Apply to:** Container, Section, HeroBackground, StickyHeader, NavLinks

### "use client" Directive Pattern (for interactive components)
**Source:** `src/components/ui/separator.tsx` (lines 1-5)
```typescript
"use client"

import { cn } from "@/lib/utils"
// ... other imports
```

**Apply to:** ThemeToggle (required for localStorage, classList, useState, useEffect)

### cn() Utility Usage
**Source:** `src/lib/utils.ts` (lines 1-5)
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage in all components:** Always import `cn` from `@/lib/utils` and use for className merging. Never concatenate className strings manually.

### Dark Mode CSS Custom Properties
**Source:** `src/app/globals.css` (existing shadcn pattern)
```css
:root { /* light values */ }
.dark { /* dark overrides */ }
```

**Apply to:** All new color tokens -- define in `:root` for light, override in `.dark` for dark mode.

### @theme inline Tailwind v4 Pattern
**Source:** `src/app/globals.css` (lines 7-49)
```css
@theme inline {
  --color-accent: var(--accent);
  /* --color-* creates bg-*, text-*, border-* utilities */
}
```
**Critical rule:** Values must be single color values (not `linear-gradient()`) to work with Tailwind utilities.

## No Analog Found

Files with no close match in the codebase (planner should use RESEARCH.md patterns instead):

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `src/app/data/experience.ts` | model | static | No existing data files in codebase. Use RESEARCH.md data pattern (lines 488-518). |
| `src/app/data/research.ts` | model | static | Same as above. Interface will differ (status field, tags). |
| `src/app/data/skills.ts` | model | static | Same pattern. Different shape (category + skills list). |

## Metadata

**Analog search scope:** `src/app/`, `src/components/ui/`, `src/lib/`
**Files scanned:** 12
**Pattern extraction date:** 2026-06-19
