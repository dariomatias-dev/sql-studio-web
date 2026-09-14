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
    // Unlike npm, pnpm forwards extra args to the underlying script without
    // needing a "--" separator; passing one here makes Next's CLI treat
    // "--port" itself as a positional project-directory argument and fail.
    command: process.env.CI
      ? `pnpm run start --port ${PORT}`
      : `pnpm run build && pnpm run start --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    // Dummy EmailJS credentials so the forms attempt a real request (which
    // e2e specs intercept, per the "never send real email in tests" rule)
    // instead of failing early on the "missing env vars" guard. NEXT_PUBLIC_*
    // vars are inlined at build time, so they must be set here, not just at
    // runtime.
    env: {
      NEXT_PUBLIC_SERVICE_ID: "test-service-id",
      NEXT_PUBLIC_TEMPLATE_ID: "test-template-id",
      NEXT_PUBLIC_PUBLIC_KEY: "test-public-key",
    },
  },
});
