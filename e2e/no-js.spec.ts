import { expect, test } from "@playwright/test";

import type { Page } from "@playwright/test";

// Reads an element's computed text color as [r, g, b] via a 1x1 canvas.
const getTextColorRgb = (page: Page, text: string) =>
  page.evaluate((needle) => {
    const el = Array.from(document.querySelectorAll("header a")).find(
      (a) => a.textContent?.trim() === needle,
    );
    if (!el) throw new Error(`Header link not found: ${needle}`);
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = getComputedStyle(el).color;
    ctx.fillRect(0, 0, 1, 1);
    return Array.from(ctx.getImageData(0, 0, 1, 1).data.slice(0, 3));
  }, text);

// The header must render solid on first paint, with no JavaScript.
test.describe("header without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("nav links are legible (dark text) on /privacy-policy", async ({ page }) => {
    await page.goto("/privacy-policy");

    await expect(page.locator("header").getByText("Features")).toBeVisible();

    const [r, g, b] = await getTextColorRgb(page, "Features");
    const luminance = (r + g + b) / 3;

    expect(luminance).toBeLessThan(128);
  });
});

test.describe("main content without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  for (const [path, heading] of [
    ["/", "SQL Studio Anywhere."],
    ["/contact", "Get in Touch"],
    ["/download", "Join the Development Program"],
    ["/privacy-policy", "Privacy Policy"],
    ["/terms-of-service", "Terms of Service"],
  ] as const) {
    test(`${path} shows its heading`, async ({ page }) => {
      await page.goto(path);

      await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    });
  }
});

test.describe("forms warn when JavaScript is off", () => {
  test.use({ javaScriptEnabled: false });

  for (const path of ["/contact", "/download"] as const) {
    test(`${path} shows the no-JS warning inside the form`, async ({ page }) => {
      await page.goto(path);

      const warning = page.locator("form noscript");
      await expect(warning).toBeVisible();

      const text = await warning.evaluate((el) => el.textContent);
      expect(text).toContain("This form requires JavaScript to be enabled");
    });
  }
});
