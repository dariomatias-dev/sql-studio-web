import { expect, test } from "@playwright/test";

test.describe("spam guard", () => {
  test("/contact silently blocks a submission with the honeypot filled", async ({ page }) => {
    let emailjsRequestCount = 0;
    await page.route("https://api.emailjs.com/**", async (route) => {
      emailjsRequestCount += 1;
      await route.fulfill({ status: 200, body: "OK" });
    });

    await page.goto("/contact");
    await page.locator("#name").fill("Ada Lovelace");
    await page.locator("#email").fill("ada@example.com");
    await page.locator("#message").fill("Testing the honeypot.");
    // Real users never see or fill this field; bots that fill every input do.
    await page.locator("#company").fill("Acme Inc");
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(page.locator("form").getByRole("status")).toHaveText("Message sent successfully!");
    expect(emailjsRequestCount).toBe(0);
  });

  test("/contact silently blocks a submission filled in faster than a human could type", async ({
    page,
  }) => {
    let emailjsRequestCount = 0;
    await page.route("https://api.emailjs.com/**", async (route) => {
      emailjsRequestCount += 1;
      await route.fulfill({ status: 200, body: "OK" });
    });

    await page.goto("/contact");
    await page.locator("#name").fill("Ada Lovelace");
    await page.locator("#email").fill("ada@example.com");
    await page.locator("#message").fill("Testing the fill-time guard.");
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(page.locator("form").getByRole("status")).toHaveText("Message sent successfully!");
    expect(emailjsRequestCount).toBe(0);
  });

  test("/download silently blocks a submission with the honeypot filled", async ({ page }) => {
    let emailjsRequestCount = 0;
    await page.route("https://api.emailjs.com/**", async (route) => {
      emailjsRequestCount += 1;
      await route.fulfill({ status: 200, body: "OK" });
    });

    await page.goto("/download");
    await page.locator("#email").fill("tester@example.com");
    // Real users never see or fill this field; bots that fill every input do.
    await page.locator("#company").fill("Acme Inc");
    await page.getByRole("button", { name: "Join Beta Waitlist" }).click();

    await expect(page.getByRole("heading", { name: "Request Received" })).toBeVisible();
    expect(emailjsRequestCount).toBe(0);
  });
});
