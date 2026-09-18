import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

import en from "./messages/en.json";

// Resolves real strings from messages/en.json without a NextIntlClientProvider.
const getByPath = (obj: unknown, path: string) =>
  path.split(".").reduce<unknown>((acc, key) => (acc as Record<string, unknown>)?.[key], obj);

const interpolate = (template: string, values?: Record<string, unknown>) =>
  values ? template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? "")) : template;

vi.mock("next-intl", () => ({
  useTranslations: (namespace?: string) => {
    const base = namespace ? getByPath(en, namespace) : en;
    const t = (key: string, values?: Record<string, unknown>) => {
      const value = getByPath(base, key);
      return typeof value === "string" ? interpolate(value, values) : key;
    };
    t.raw = (key: string) => getByPath(base, key);
    // Mirrors next-intl's real t.rich: replaces <tag>chunk</tag> with the
    // matching renderer's output, so components exercise their own link
    // renderers instead of the tags being silently stripped.
    t.rich = (key: string, tags?: Record<string, (chunks: React.ReactNode) => React.ReactNode>) => {
      const value = getByPath(base, key);
      if (typeof value !== "string") return key;
      if (!tags) return value.replace(/<[^>]+>/g, "");

      const parts: React.ReactNode[] = [];
      const tagPattern = /<(\w+)>(.*?)<\/\1>/g;
      let lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = tagPattern.exec(value))) {
        if (match.index > lastIndex) parts.push(value.slice(lastIndex, match.index));
        const [, tagName, inner] = match;
        parts.push(tags[tagName] ? tags[tagName](inner) : inner);
        lastIndex = tagPattern.lastIndex;
      }
      if (lastIndex < value.length) parts.push(value.slice(lastIndex));
      return parts;
    };
    return t;
  },
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children,
  useLocale: () => "en",
  hasLocale: (locales: readonly string[], candidate: unknown) =>
    typeof candidate === "string" && locales.includes(candidate),
}));

// jsdom has no IntersectionObserver. Reports every target as intersecting.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(private callback: IntersectionObserverCallback) {}

  observe = (target: Element) => {
    this.callback(
      [{ isIntersecting: true, intersectionRatio: 1, target } as IntersectionObserverEntry],
      this,
    );
  };
  unobserve = () => {};
  disconnect = () => {};
  takeRecords = () => [];
}
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

// jsdom has no ResizeObserver. embla-carousel (the screenshots carousel)
// needs one to measure slide sizes.
class MockResizeObserver implements ResizeObserver {
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
}
vi.stubGlobal("ResizeObserver", MockResizeObserver);

// jsdom has no matchMedia.
vi.stubGlobal(
  "matchMedia",
  vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
);
