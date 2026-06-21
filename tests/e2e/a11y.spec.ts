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
});
