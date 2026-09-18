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
    t.rich = (key: string) => {
      const value = getByPath(base, key);
      return typeof value === "string" ? value.replace(/<[^>]+>/g, "") : key;
    };
    return t;
  },
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children,
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
