import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("suppress-dev-warnings", () => {
  const originalWarn = console.warn;

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    console.warn = originalWarn;
  });

  it("drops the known Next.js scroll-behavior warning", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const warnSpy = vi.fn();
    console.warn = warnSpy;

    await import("../suppress-dev-warnings");
    console.warn("Detected `scroll-behavior: smooth` on the `<html>` element. more text");

    expect(warnSpy).not.toHaveBeenCalled();
    vi.unstubAllEnvs();
  });

  it("still logs every other warning", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const warnSpy = vi.fn();
    console.warn = warnSpy;

    await import("../suppress-dev-warnings");
    console.warn("some unrelated warning");

    expect(warnSpy).toHaveBeenCalledWith("some unrelated warning");
    vi.unstubAllEnvs();
  });

  it("does nothing in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const warnSpy = vi.fn();
    console.warn = warnSpy;

    await import("../suppress-dev-warnings");
    console.warn("Detected `scroll-behavior: smooth` on the `<html>` element.");

    expect(warnSpy).toHaveBeenCalledWith(
      "Detected `scroll-behavior: smooth` on the `<html>` element.",
    );
    vi.unstubAllEnvs();
  });
});
