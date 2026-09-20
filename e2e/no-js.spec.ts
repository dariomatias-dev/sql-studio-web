import { expect, test } from "@playwright/test";

import type { Page } from "@playwright/test";

// Reads an element's computed text color and normalizes it to an [r, g, b]
// triple via a 1x1 canvas, regardless of which color space the browser
// serializes it in (Tailwind v4 uses oklch()/lab(), not plain rgb()).
// page.evaluate runs through CDP, independent of the page's own
// JavaScript being enabled, so this works even with javaScriptEnabled:
// false.
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

// Regression test for B4/D6: the header used to decide whether it should
// render solid (dark nav text) or transparent (light nav text, for the
// dark hero) inside a useEffect, which never runs without JavaScript. On
// any page but the home page, that left the header's light text sitting
// on that page's white background, illegible. The header now derives
// this from the route synchronously, so it must render solid on first
// paint, with no JavaScript at all.
test.describe("header without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("nav links are legible (dark text) on /privacy-policy", async ({ page }) => {
    await page.goto("/privacy-policy");

    await expect(page.locator("header").getByText("Features")).toBeVisible();

    const [r, g, b] = await getTextColorRgb(page, "Features");
    const luminance = (r + g + b) / 3;

    // The page background is white; a legible header needs dark nav text
    // (text-slate-600), not the transparent variant's near-white
    // text-slate-300.
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

      // Playwright's own text-matching doesn't see into <noscript> content.
      const warning = page.locator("form noscript");
      await expect(warning).toBeVisible();

      const text = await warning.evaluate((el) => el.textContent);
      expect(text).toContain("This form requires JavaScript to be enabled");
    });
  }
});
