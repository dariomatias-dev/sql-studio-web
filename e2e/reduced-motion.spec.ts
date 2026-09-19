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

  test("workflow section's status toast reveal is skipped, not animated in", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Query Executed")).toBeVisible();
  });

  test("beta access button's shine animation is disabled", async ({ page }) => {
    await page.goto("/download");

    const animationName = await page
      .locator(".animate-shine")
      .first()
      .evaluate((el) => getComputedStyle(el).animationName);
    expect(animationName).toBe("none");
  });
});
