// Next.js 16 warns in dev whenever it detects `scroll-behavior: smooth` on
// <html> without the data-scroll-behavior="smooth" opt-in — but that
// attribute does the opposite of what its name suggests (it forces an
// *instant* scroll during route transitions, the pre-16 default). We want
// the smooth scroll-to-top on navigation, so the warning is expected and
// permanently silenced here rather than worked around.
const IGNORED_WARNING = "Detected `scroll-behavior: smooth` on the `<html>` element.";

if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].startsWith(IGNORED_WARNING)) return;
    originalWarn(...args);
  };
}

export {};
