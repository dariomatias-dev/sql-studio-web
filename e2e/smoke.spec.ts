import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", heading: "SQL Studio Anywhere." },
  { path: "/contact", heading: "Get in Touch" },
  { path: "/download", heading: "Join the Development Program" },
  { path: "/privacy-policy", heading: "Privacy Policy" },
  { path: "/terms-of-service", heading: "Terms of Service" },
];

for (const { path, heading } of routes) {
  test(`${path} loads without console errors`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    const response = await page.goto(path);
    expect(response?.status()).toBe(200);

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      heading,
      { useInnerText: true }
    );

    expect(consoleErrors).toEqual([]);
  });
}

test("unknown path renders the app's 404 page", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");

  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: "Page not found" })
  ).toBeVisible();
});
