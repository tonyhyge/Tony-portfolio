# Coding Conventions

**Analysis Date:** 2026-06-19

## Naming Patterns

**Files:**
- kebab-case for all source files (`page.tsx`, `layout.tsx`, `utils.ts`)
- Components exported from kebab-case files inside `src/components/ui/`

**Components:**
- PascalCase function names (`Button`, `Card`, `Sheet`, `Avatar`)
- Compound components use shared prefix (`CardHeader`, `CardTitle`, `CardContent`, `CardFooter`)

**Functions:**
- PascalCase for React components (`function Home()`, `function cn()`)
- camelCase for utilities (`cn`, `mergeProps`)

**CSS/Classes:**
- Tailwind utility classes applied via `className` prop
- `data-slot` attributes used consistently for slot targeting (`data-slot="card"`, `data-slot="avatar-image"`)
- CSS custom properties defined in `globals.css` using `--` prefix (`--background`, `--foreground`, `--radius`)
- OKLCH color space used for all palette tokens

**Types:**
- PascalCase for interfaces and types (`ButtonPrimitive.Props`, `VariantProps<typeof buttonVariants>`)
- camelCase with `...Props` suffix for React prop types

## Code Style

**Formatting:**
- No explicit Prettier config detected - uses ESLint defaults
- Semicolons: inconsistent (some files use them, some don't)
- Indentation: 2 spaces
- Trailing commas: not enforced consistently

**Linting:**
- Tool: ESLint v9 with flat config (`eslint.config.mjs`)
- Extends: `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Custom ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

## TypeScript

**Strict Mode:** Enabled in `tsconfig.json`
- `strict: true`
- `noEmit: true`
- `target: "ES2017"`
- `jsx: "react-jsx"`
- Path alias: `@/*` maps to `./src/*`

**Type Patterns:**
- `interface` not used for props - inline types and `React.ComponentProps<"div">` pattern preferred
- `type` used for unions and utility types (`VariantProps<typeof buttonVariants>`)
- `React.FC` not used - plain function components with typed props
- Generic type parameters inferred where obvious
- `Readonly<>` used for layout children props in `layout.tsx`

**Avoid `any`:** Enforced by strict mode. Use `unknown` for external input per project rules.

## Import Organization

**Order observed:**
1. React/framework imports (`import * as React from "react"`)
2. Third-party library imports (`import { cva } from "class-variance-authority"`)
3. Internal imports with `@/` alias (`import { cn } from "@/lib/utils"`)
4. Relative/sibling imports (rare in this project)

**Path Aliases:**
- `@/*` -> `./src/*` (configured in `tsconfig.json`)
- `@/lib/utils` for the `cn()` utility
- `@/components/ui` for UI components

## Component Patterns

**Compound Components:**
- Pattern: multiple named exports sharing a prefix
- Examples: `src/components/ui/card.tsx` exports `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`
- Examples: `src/components/ui/avatar.tsx` exports `Avatar`, `AvatarImage`, `AvatarFallback`, `AvatarGroup`, `AvatarGroupCount`, `AvatarBadge`
- Barrel exports at bottom of each file

**Component Signatures:**
```tsx
function Component({
  className,
  variant = "default",
  size = "default",
  ...props
}: Primitive.Props & VariantProps<typeof componentVariants>) {
  return (
    <Primitive
      data-slot="component-name"
      className={cn(baseStyles, className)}
      {...props}
    />
  )
}
```

**Variant System:**
- `class-variance-authority` (CVA) for variant definitions
- `cva()` call defines `variants` and `defaultVariants`
- Export both component and variants (`export { Button, buttonVariants }`)

**Primitive Wrapping:**
- Components wrap `@base-ui/react` primitives
- Props typed against primitive's `.Props` type
- `data-slot` attributes added for CSS targeting
- `cn()` used for class merging with Tailwind classes

**Server vs Client Components:**
- `"use client"` directive at top of files using React hooks or browser APIs
- Examples: `sheet.tsx`, `avatar.tsx` have `"use client"`
- `page.tsx` and `layout.tsx` are server components by default (no directive)

## Error Handling

**Strategy:** Not yet implemented - portfolio is scaffold-only
- Next.js error boundaries available but not configured
- No custom error pages (`error.tsx`, `not-found.tsx`)
- Per project rules: async/await with try-catch, narrow unknown errors safely

## Logging

**Framework:** None configured
- No `console.log` in source files
- Per project rules: no `console.log` in production code

## Comments

**When to Comment:** Minimal comments observed
- JSDoc/TSDoc not used in current codebase
- One inline comment in `next.config.ts`: `// GitHub Pages doesn't support Next.js Image Optimization`

## Function Design

**Size:** Components are concise (typically 20-60 lines)
- Utility function `cn()` is 6 lines
- Each UI component is focused on a single element

**Parameters:**
- Destructured props with `className` always first
- Default values via destructuring (`variant = "default"`)
- Rest spread `...props` for primitive forwarding

**Return Values:**
- JSX elements returned directly
- No explicit `return` for single-expression components using arrow syntax (not used here - all use function declarations)

## Module Design

**Exports:** Named exports only, no default exports for components
- Barrel pattern: all related exports at bottom of file
- `cn()` utility: named export from `@/lib/utils`

**Barrel Files:** Each UI component file is its own barrel
- No re-export barrel (`index.ts`) detected in `components/ui/`

## CSS/Styling

**Framework:** Tailwind CSS v4
- Config via `@theme inline` in `globals.css`
- PostCSS with `@tailwindcss/postcss`
- No separate `tailwind.config.ts`

**Theme Tokens:**
- Colors: OKLCH values mapped to CSS custom properties
- Radii: calculated from `--radius` base (`0.625rem`)
- Fonts: `--font-sans` (Inter/Geist), `--font-mono` (Geist Mono), `--font-heading`
- shadcn style: `base-nova` with neutral base color

**Animation Classes:**
- Tailwind animation utilities used (`transition`, `duration-200`, `ease-in-out`)
- `data-starting-style` and `data-ending-style` for open/close animations
- Compositor-friendly properties: `transform`, `opacity`, `scale`, `translate`

## Where to Add New Code

**New Section/Component:**
- Domain components: `src/components/{feature-name}/` (per web/coding-style.md)
- Reusable UI: `src/components/ui/`
- Hooks: `src/hooks/` (directory not yet created)
- Utilities: `src/lib/`

**New Page/Route:**
- App Router: `src/app/{route}/page.tsx`
- Layout: `src/app/{route}/layout.tsx`

**Styling:**
- Component styles: inline Tailwind classes via `cn()`
- Global styles: `src/app/globals.css`
- CSS custom properties: add to `@theme inline` block in `globals.css`

---

*Convention analysis: 2026-06-19*
