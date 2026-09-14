import { expect, test } from "@playwright/test";

const routes = ["/", "/contact", "/download", "/privacy-policy", "/terms-of-service"];

for (const path of routes) {
  test(`${path} sends security headers`, async ({ page }) => {
    const response = await page.goto(path);
    const headers = response?.headers() ?? {};

    expect(headers["content-security-policy"]).toContain("default-src 'self'");
    expect(headers["content-security-policy"]).toContain("connect-src");
    expect(headers["content-security-policy"]).toContain("https://api.emailjs.com");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["strict-transport-security"]).toContain("max-age=63072000");
    expect(headers["permissions-policy"]).toBeTruthy();
  });
}
