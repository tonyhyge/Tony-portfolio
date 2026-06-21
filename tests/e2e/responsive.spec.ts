import { test } from "@playwright/test";
import { existsSync, mkdirSync } from "fs";

const BREAKPOINTS = [
  { width: 320, name: "mobile-small" },
  { width: 768, name: "tablet" },
  { width: 1024, name: "desktop" },
  { width: 1440, name: "desktop-wide" },
] as const;

test.describe("Responsive screenshot tests", () => {
  BREAKPOINTS.forEach(({ width, name }) => {
    test(`captures screenshot at ${width}px (${name})`, async ({ page }) => {
      if (!existsSync("screenshots")) {
        mkdirSync("screenshots");
      }
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/Tony-portfolio/");
      await page.waitForLoadState("networkidle");
      await page.screenshot({
        path: `screenshots/${name}.png`,
        fullPage: true,
      });
    });
  });
});
