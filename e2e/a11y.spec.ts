import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("axe scan", () => {
  for (const path of ["/", "/contact", "/download", "/privacy-policy", "/terms-of-service"]) {
    test(`${path} has no automatically detectable violations`, async ({ page }) => {
      await page.goto(path);

      const results = await new AxeBuilder({ page }).analyze();

      expect(results.violations).toEqual([]);
    });
  }
});

test.describe("heading hierarchy", () => {
  for (const path of ["/", "/contact", "/download", "/privacy-policy", "/terms-of-service"]) {
    test(`${path} never skips a heading level`, async ({ page }) => {
      await page.goto(path);

      const levels = await page.evaluate(() =>
        Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6")).map((el) =>
          Number(el.tagName[1]),
        ),
      );

      expect(levels[0]).toBe(1);
      for (let i = 1; i < levels.length; i++) {
        expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
      }
    });
  }
});

test.describe("decorative elements are hidden from assistive tech", () => {
  test("the 404 background number is aria-hidden", async ({ page }) => {
    await page.goto("/does-not-exist");

    const hiddenWrapper = page.locator('[aria-hidden="true"]', { hasText: "404" });
    await expect(hiddenWrapper).toBeVisible();
  });

  test("the beta status ping indicator is aria-hidden", async ({ page }) => {
    await page.goto("/download");

    await expect(page.locator('span[aria-hidden="true"]').first()).toBeVisible();
  });
});
