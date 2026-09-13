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
    // Runs only smoke.spec.ts and app-integration.spec.ts.
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
      testMatch: /(smoke|app-integration)\.spec\.ts/,
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
  },
});
