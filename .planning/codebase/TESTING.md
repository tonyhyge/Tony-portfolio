# Testing Patterns

**Analysis Date:** 2026-06-19

## Test Framework

**Current State:** No testing infrastructure installed.

- No test runner (Jest, Vitest, Playwright) in `package.json`
- No test config files (`jest.config.*`, `vitest.config.*`, `playwright.config.*`)
- No test scripts in `package.json`
- Zero test files in `src/` or project root

**Required per project rules:**
- Unit tests for functions, utilities, and custom hooks
- E2E tests for critical user flows via Playwright
- Minimum 80% test coverage

## Recommended Setup

**Runner:**
- Vitest for unit tests (pairs well with Next.js, fast, native ESM)
- Playwright for E2E tests (per `rules/typescript/testing.md`)
- Config: `vitest.config.ts` at project root

**Assertion Library:**
- Vitest built-in `expect` API

**Install Commands:**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D @vitest/coverage-v8
npx playwright install
```

**Run Commands (after setup):**
```bash
npx vitest                 # Run all tests
npx vitest --watch         # Watch mode
npx vitest --coverage      # Coverage report
npx vitest path/to/file    # Run specific file
```

## Test File Organization

**Location:** Co-located with source files (per project conventions)
```
src/
├── lib/
│   ├── utils.ts
│   └── utils.test.ts        # Colocated test
├── components/
│   └── ui/
│       ├── button.tsx
│       └── button.test.tsx   # Colocated test
└── app/
    └── page.tsx
    └── page.test.tsx         # Colocated test for page
```

**Naming:**
- `{module}.test.ts` for utilities and logic
- `{Component}.test.tsx` for React components
- `{module}.spec.ts` for E2E Playwright tests

## Test Structure

**Suite Organization (Unit):**
```typescript
import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn()', () => {
  it('merges tailwind classes correctly', () => {
    const result = cn('px-2', 'py-1');
    expect(result).toBe('px-2 py-1');
  });

  it('resolves conflicting tailwind classes via tailwind-merge', () => {
    const result = cn('px-2', 'px-4');
    expect(result).toBe('px-4');
  });
});
```

**Component Tests:**
```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-slot', 'button');
  });
});
```

**E2E Shape (Playwright):**
```typescript
import { test, expect } from '@playwright/test';

test('portfolio home page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
});
```

## Mocking

**Framework:** Vitest mocking (`vi.mock`)

**Patterns:**
```typescript
import { vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: '--font-geist-sans' }),
  Geist_Mono: () => ({ variable: '--font-geist-mono' }),
}));
```

**What to Mock:**
- External dependencies (fonts, images, third-party SDKs)
- Network requests (fetch, API calls)
- Browser APIs not available in test environment

**What NOT to Mock:**
- `cn()` utility - test real behavior
- shadcn/base-ui primitives - test integration
- Tailwind classes - verify real output

## Fixtures and Factories

**Test Data:** Not yet established. When needed:
```typescript
// Test fixtures in src/__fixtures__/ or colocated
const testUser = {
  name: 'Tony',
  role: 'Software Engineer',
  bio: '...',
} as const;
```

**Location:** `src/__fixtures__/` for shared data, colocated for component-specific

## Coverage

**Requirements:** 80% minimum (per `rules/common/testing.md`)

**View Coverage (after setup):**
```bash
npx vitest --coverage
# Opens coverage/lcov-report/index.html
```

## Test Types

**Unit Tests:**
- Scope: `src/lib/utils.ts`, data transforms, utility functions
- Approach: Test inputs/outputs, edge cases, tailwind class merging

**Integration Tests:**
- Scope: Component compositions (e.g., `Card` with `CardHeader`, `CardContent`)
- Approach: Render composite components, verify slot targeting works

**E2E Tests:**
- Framework: Playwright
- Scope: Portfolio landing page, navigation, responsive breakpoints
- Per `rules/web/testing.md`: screenshot at 320, 768, 1024, 1440, 1920
- Test dark mode toggle, keyboard navigation, reduced-motion behavior

## Critical Test Gaps

**Untested:** Everything. The project is scaffold-only with zero tests.

**Priority order for test creation:**
1. `src/lib/utils.ts` - `cn()` utility (highest leverage, smallest surface)
2. UI components with CVA variants - `button.tsx`, `badge.tsx` (verify variant classes)
3. Compound components - `card.tsx`, `avatar.tsx` (verify composition)
4. Page rendering - `src/app/page.tsx` (integration test)
5. E2E portfolio flows - navigation, responsiveness, dark mode

## Common Patterns (for future tests)

**Async Testing:**
```typescript
import { render, screen, waitFor } from '@testing-library/react';

it('loads content asynchronously', async () => {
  render(<ContentLoader />);
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
```

**Error Testing:**
```typescript
import { render } from '@testing-library/react';

it('renders error boundary on failure', () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
  render(<BrokenComponent />);
  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  spy.mockRestore();
});
```

---

*Testing analysis: 2026-06-19*
