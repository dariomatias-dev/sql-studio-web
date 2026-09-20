import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium-desktop", use: { ...devices["Desktop Chrome"] } },
    // Runs only smoke.spec.ts, app-integration.spec.ts, and a11y.spec.ts.
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
      testMatch: /(smoke|app-integration|a11y)\.spec\.ts/,
    },
  ],
  webServer: {
    command: process.env.CI
      ? `pnpm run start --port ${PORT}`
      : `pnpm run build && pnpm run start --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    // Dummy EmailJS credentials; specs intercept the request.
    env: {
      NEXT_PUBLIC_EMAILJS_SERVICE_ID: "test-service-id",
      NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: "test-template-id",
      NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: "test-public-key",
    },
  },
});
