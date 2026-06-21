import { test, expect } from "@playwright/test";

test.describe("Portfolio homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/Tony-portfolio/");
  });

  test("loads hero section with heading", async ({ page }) => {
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByText("View Projects")).toBeVisible();
  });

  test("navigates sections via nav links", async ({ page }) => {
    const navLinks = page.locator("nav a");
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test("toggles dark mode", async ({ page }) => {
    const toggle = page.getByLabel("Toggle theme");
    await toggle.click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await toggle.click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });

  test("contact section has form fields", async ({ page }) => {
    await page.goto("/Tony-portfolio/#contact");
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
  });

  test("loads 404 page correctly", async ({ page }) => {
    await page.goto("/Tony-portfolio/nonexistent");
    await expect(page.getByText("Lost in the Lab?")).toBeVisible();
    await expect(page.getByText("Back to Home")).toBeVisible();
    await page.getByText("Back to Home").click();
    await expect(page).toHaveURL(/\/Tony-portfolio\/$/);
  });
});
