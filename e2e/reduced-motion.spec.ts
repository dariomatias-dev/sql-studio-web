import { expect, test } from "@playwright/test";

test.describe("prefers-reduced-motion: reduce", () => {
  test.use({ reducedMotion: "reduce" });

  test("home page's ping, bounce, and pulse animations are disabled", async ({ page }) => {
    await page.goto("/");

    for (const selector of [".animate-ping", ".animate-pulse", ".animate-pulse-slow"]) {
      const animationName = await page
        .locator(selector)
        .first()
        .evaluate((el) => {
          return getComputedStyle(el).animationName;
        });
      expect(animationName).toBe("none");
    }
  });

  test("workflow section's bounce animation is disabled", async ({ page }) => {
    await page.goto("/");

    const animationName = await page
      .locator(".animate-bounce")
      .first()
      .evaluate((el) => {
        return getComputedStyle(el).animationName;
      });
    expect(animationName).toBe("none");
  });

  test("beta access button's shine animation is disabled", async ({ page }) => {
    await page.goto("/download");

    const animationName = await page
      .locator('[class*="animate-[shine"]')
      .first()
      .evaluate((el) => getComputedStyle(el).animationName);
    expect(animationName).toBe("none");
  });
});
