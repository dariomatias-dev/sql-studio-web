import { expect, test } from "@playwright/test";

// Both routes below are linked from the app's settings screen (and the
// Play Store listing, for /privacy-policy). Breaking them affects users of
// the app, not just the website: see the invariants in AGENTS.md.

test.describe("/privacy-policy", () => {
  test("returns 200 without redirecting", async ({ page }) => {
    const response = await page.goto("/privacy-policy");

    expect(response?.status()).toBe(200);
    expect(new URL(page.url()).pathname).toBe("/privacy-policy");
    await expect(page.getByRole("heading", { level: 1, name: "Privacy Policy" })).toBeVisible();
  });
});

test.describe("/contact", () => {
  test("returns 200 without redirecting and has the expected fields", async ({ page }) => {
    const response = await page.goto("/contact");

    expect(response?.status()).toBe(200);
    expect(new URL(page.url()).pathname).toBe("/contact");
    await expect(page.locator("#name")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#subject")).toBeVisible();
    await expect(page.locator("#message")).toBeVisible();
  });

  test("a valid submission calls EmailJS and shows success", async ({ page }) => {
    let emailjsRequestCount = 0;
    await page.route("https://api.emailjs.com/**", async (route) => {
      emailjsRequestCount += 1;
      await route.fulfill({ status: 200, body: "OK" });
    });

    await page.goto("/contact");
    await page.locator("#name").fill("Ada Lovelace");
    await page.locator("#email").fill("ada@example.com");
    await page.locator("#message").fill("Testing the contact form.");
    // Clears the spam guard's minimum-fill-time check (see spam-guard.ts).
    await page.waitForTimeout(1600);
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(page.locator("form").getByRole("status")).toHaveText("Message sent successfully!");
    expect(emailjsRequestCount).toBe(1);
  });

  test("a failed submission shows an error, without retrying silently", async ({ page }) => {
    await page.route("https://api.emailjs.com/**", async (route) => {
      await route.fulfill({ status: 500, body: "Internal Server Error" });
    });

    await page.goto("/contact");
    await page.locator("#name").fill("Ada Lovelace");
    await page.locator("#email").fill("ada@example.com");
    await page.locator("#message").fill("Testing the contact form.");
    // Clears the spam guard's minimum-fill-time check (see spam-guard.ts).
    await page.waitForTimeout(1600);
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(page.locator("form").getByRole("alert")).toHaveText(
      "Failed to send. Please try again.",
    );
  });

  test("an invalid submission marks fields invalid and focuses the first one", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send Message" }).click();

    const nameInput = page.locator("#name");
    await expect(nameInput).toHaveAttribute("aria-invalid", "true");
    await expect(nameInput).toHaveAttribute("aria-describedby", "name-error");
    await expect(nameInput).toBeFocused();
  });
});
