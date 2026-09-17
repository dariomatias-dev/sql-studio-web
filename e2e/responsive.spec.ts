import { expect, test } from "@playwright/test";

const routes = ["/", "/contact", "/download", "/privacy-policy", "/terms-of-service"];

const viewports = [
  { name: "400px", width: 400, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "wide desktop", width: 1920, height: 1080 },
];

for (const viewport of viewports) {
  test.describe(`at ${viewport.name}`, () => {
    test.use({ viewport });

    for (const path of routes) {
      test(`${path} has no horizontal overflow`, async ({ page }) => {
        await page.goto(path);

        const { scrollWidth, clientWidth } = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));

        expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
      });
    }
  });
}

test.describe("header nav switches at the md breakpoint", () => {
  test("shows the hamburger menu below 768px", async ({ page }) => {
    await page.setViewportSize({ width: 767, height: 900 });
    await page.goto("/");

    const header = page.locator("header");
    await expect(header.getByRole("button", { name: "Open menu" })).toBeVisible();
    await expect(header.getByRole("link", { name: "Features", exact: true })).toBeHidden();
  });

  test("shows the inline nav links at 768px and up", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 900 });
    await page.goto("/");

    const header = page.locator("header");
    await expect(header.getByRole("link", { name: "Features", exact: true })).toBeVisible();
    await expect(header.getByRole("button", { name: "Open menu" })).toBeHidden();
  });
});
