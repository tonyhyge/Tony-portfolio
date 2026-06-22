import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility (WCAG AA)", () => {
  test("home page has no WCAG AA violations", async ({ page }) => {
    await page.goto("/Tony-portfolio/");
    await page.waitForLoadState("networkidle");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("dark mode has no WCAG AA violations", async ({ page }) => {
    await page.goto("/Tony-portfolio/");
    await page.getByLabel("Toggle theme").click();
    await page.waitForLoadState("networkidle");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("404 page has no WCAG AA violations", async ({ page }) => {
    await page.goto("/Tony-portfolio/nonexistent");
    await page.waitForLoadState("networkidle");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("skip-to-content link is accessible via keyboard", async ({ page }) => {
    await page.goto("/Tony-portfolio/");
    await page.waitForLoadState("networkidle");

    // Skip link is hidden initially (sr-only)
    const skipLink = page.locator("a:has-text('Skip to content')");
    await expect(skipLink).not.toBeVisible();

    // Tab into the page to focus the skip link
    await page.keyboard.press("Tab");
    await expect(skipLink).toBeVisible();

    // Activate it and verify focus moves to main content
    await skipLink.click();
    await expect(page.locator("#main-content")).toBeFocused();
  });
});
