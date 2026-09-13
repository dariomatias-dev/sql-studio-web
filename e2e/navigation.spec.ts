import { expect, test } from "@playwright/test";

// This project only runs smoke.spec.ts and app-integration.spec.ts on
// mobile-chrome (see playwright.config.ts); everything here assumes a
// desktop viewport, except the mobile menu test below, which resizes the
// page itself.

test.describe("header", () => {
  test("desktop nav links scroll to the matching section", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("navigation").getByText("Features").click();
    await expect(page).toHaveURL("/#features");

    await page.getByRole("navigation").getByText("FAQ").click();
    await expect(page).toHaveURL("/#faq");
  });

  test("mobile menu opens as a dialog, locks scroll, and closes on link click", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");

    const toggle = page.getByRole("button", { name: "Open menu" });
    const dialog = page.getByRole("dialog");

    await expect(dialog).not.toBeVisible();

    await toggle.click();
    await expect(dialog).toBeVisible();
    const mobileFaqLink = dialog.getByText("FAQ", { exact: true });
    await expect(mobileFaqLink).toBeVisible();

    const scrollYBeforeWheel = await page.evaluate(() => window.scrollY);
    await page.mouse.move(200, 400);
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(200);
    expect(await page.evaluate(() => window.scrollY)).toBe(scrollYBeforeWheel);

    await mobileFaqLink.click();
    await expect(page).toHaveURL("/#faq");
    await expect(dialog).not.toBeVisible();
  });

  test("resizing to desktop with the mobile menu open unlocks scroll (B5)", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.setViewportSize({ width: 1280, height: 800 });
    await expect(page.getByRole("dialog")).not.toBeVisible();

    const scrollYBeforeWheel = await page.evaluate(() => window.scrollY);
    await page.mouse.move(640, 400);
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(200);
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(scrollYBeforeWheel);
  });
});

test.describe("footer", () => {
  test("legal links navigate to the right pages", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Privacy Policy" }).click();
    await expect(page).toHaveURL("/privacy-policy");

    await page.goto("/");
    await page.getByRole("link", { name: "Terms of Service" }).click();
    await expect(page).toHaveURL("/terms-of-service");

    await page.goto("/");
    await page.getByRole("link", { name: "Contact Support" }).click();
    await expect(page).toHaveURL("/contact");
  });

  test("product links scroll to the matching home section", async ({ page }) => {
    await page.goto("/");

    await page.locator("footer").getByRole("link", { name: "Screenshots", exact: true }).click();
    await expect(page).toHaveURL("/#screenshots");
  });

  test("social links point to the right destinations", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");

    // The icon-only social links appear before the "Built by" bar at the
    // bottom, which also links to the same GitHub profile by name.
    await expect(footer.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/dariomatias-dev",
    );
    await expect(footer.getByRole("link", { name: "LinkedIn" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:matiasdario75@gmail.com",
    );
  });

  test("back to top scrolls the window to the top", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, 2000));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

    await page.getByRole("button", { name: "Back to Top" }).click();
    await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 5000 }).toBeLessThan(5);
  });
});

test.describe("screenshots carousel", () => {
  test("next/prev and dots update the active slide", async ({ page }) => {
    await page.goto("/#screenshots");

    const dot = (n: number) =>
      page.getByRole("button", { name: `Go to slide ${n}`, exact: true }).locator("div");

    await expect(dot(1)).toHaveClass(/w-6/);

    await page.getByRole("button", { name: "Next slide" }).click();
    await expect(dot(2)).toHaveClass(/w-6/);
    await expect(dot(1)).not.toHaveClass(/w-6/);

    await page.getByRole("button", { name: "Previous slide" }).click();
    await expect(dot(1)).toHaveClass(/w-6/);

    await page.getByRole("button", { name: "Go to slide 5" }).click();
    await expect(dot(5)).toHaveClass(/w-6/);
  });
});

test.describe("FAQ", () => {
  test("expands and collapses an answer", async ({ page }) => {
    await page.goto("/#faq");

    const question = page.getByRole("button", {
      name: "Is SQL Studio free?",
    });
    const answer = page.getByText(
      "SQL Studio is completely free and offers all essential features",
    );

    await expect(answer).not.toBeVisible();
    await question.click();
    await expect(answer).toBeVisible();
    await question.click();
    await expect(answer).not.toBeVisible();
  });
});
