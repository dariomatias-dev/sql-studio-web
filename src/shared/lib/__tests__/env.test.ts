import { afterEach, describe, expect, it, vi } from "vitest";

describe("env", () => {
  const originalUrl = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = originalUrl;
    vi.resetModules();
  });

  it("defaults NEXT_PUBLIC_SITE_URL when it's not set", async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    vi.resetModules();

    const { env } = await import("../env");
    expect(env.NEXT_PUBLIC_SITE_URL).toBe("https://sql-studio.vercel.app");
  });

  it("uses a valid NEXT_PUBLIC_SITE_URL when it's set", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    vi.resetModules();

    const { env } = await import("../env");
    expect(env.NEXT_PUBLIC_SITE_URL).toBe("https://example.com");
  });

  it("throws at import time when NEXT_PUBLIC_SITE_URL isn't a valid URL", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "not-a-url";
    vi.resetModules();

    await expect(import("../env")).rejects.toThrow(/Invalid environment variables/);
  });
});
