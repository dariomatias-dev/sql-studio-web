// Filters Next.js's dev-only `scroll-behavior: smooth` warning.
const IGNORED_WARNING = "Detected `scroll-behavior: smooth` on the `<html>` element.";

if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].startsWith(IGNORED_WARNING)) return;
    originalWarn(...args);
  };
}

export {};
