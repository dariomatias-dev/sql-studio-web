import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", title: "SQL Studio" },
  { path: "/contact", title: "Contact | SQL Studio" },
  { path: "/download", title: "Download | SQL Studio" },
  { path: "/privacy-policy", title: "Privacy Policy | SQL Studio" },
  { path: "/terms-of-service", title: "Terms of Service | SQL Studio" },
];

for (const { path, title } of routes) {
  test(`${path} has the expected title, description, and canonical`, async ({ page }) => {
    await page.goto(path);

    await expect(page).toHaveTitle(title);

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute("content", /.+/);

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", new RegExp(`${path === "/" ? "/?$" : path}$`));
  });

  test(`${path} has matching Open Graph and Twitter tags`, async ({ page }) => {
    await page.goto(path);

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
    const twitterTitle = await page.locator('meta[name="twitter:title"]').getAttribute("content");
    expect(ogTitle).toBe(title);
    expect(twitterTitle).toBe(title);

    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "website");
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
      "content",
      "SQL Studio",
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
  });
}
