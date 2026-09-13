import { expect, test } from "@playwright/test";

test.describe("/contact validation", () => {
  test("shows field errors on an invalid submission", async ({ page }) => {
    await page.goto("/contact");

    // Name and message stay empty; subject keeps its valid default.
    await page.getByRole("button", { name: "Send Message" }).click();

    await expect(
      page.getByText("Name must be at least 2 characters")
    ).toBeVisible();
    await expect(page.getByText("Invalid email address")).toBeVisible();
    await expect(
      page.getByText("Message must be at least 10 characters")
    ).toBeVisible();
  });
});

test.describe("/download beta request", () => {
  test("a valid submission calls EmailJS and shows the success state", async ({
    page,
  }) => {
    let emailjsRequestCount = 0;
    await page.route("https://api.emailjs.com/**", async (route) => {
      emailjsRequestCount += 1;
      await route.fulfill({ status: 200, body: "OK" });
    });

    await page.goto("/download");
    await page.locator("#email").fill("tester@example.com");
    await page.getByRole("button", { name: "Join Beta Waitlist" }).click();

    await expect(
      page.getByRole("heading", { name: "Request Received" })
    ).toBeVisible();
    expect(emailjsRequestCount).toBe(1);
  });

  test("a failed submission shows an error", async ({ page }) => {
    await page.route("https://api.emailjs.com/**", async (route) => {
      await route.fulfill({ status: 500, body: "Internal Server Error" });
    });

    await page.goto("/download");
    await page.locator("#email").fill("tester@example.com");
    await page.getByRole("button", { name: "Join Beta Waitlist" }).click();

    await expect(
      page.getByText("Failed to send request. Please try again.")
    ).toBeVisible();
  });
});
