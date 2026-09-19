import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Reveal } from "../reveal";

describe("Reveal", () => {
  const originalMatchMedia = window.matchMedia;
  const originalIntersectionObserver = window.IntersectionObserver;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    window.IntersectionObserver = originalIntersectionObserver;
  });

  it("renders its children", () => {
    render(
      <Reveal>
        <p>content</p>
      </Reveal>,
    );

    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("becomes visible once it intersects (the global IntersectionObserver mock fires immediately)", () => {
    const { container } = render(
      <Reveal>
        <p>content</p>
      </Reveal>,
    );

    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain("opacity-100");
    expect(wrapper?.className).toContain("translate-y-0");
  });

  it("starts already visible when the user prefers reduced motion", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })) as unknown as typeof window.matchMedia;

    const { container } = render(
      <Reveal>
        <p>content</p>
      </Reveal>,
    );

    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain("opacity-100");
  });

  it("hides instantly (no transition class) when below the fold, so nothing is ever caught mid-fade", () => {
    class NotIntersectingObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "";
      readonly thresholds: ReadonlyArray<number> = [];
      constructor(private callback: IntersectionObserverCallback) {}
      observe = (target: Element) => {
        this.callback(
          [{ isIntersecting: false, intersectionRatio: 0, target } as IntersectionObserverEntry],
          this,
        );
      };
      unobserve = () => {};
      disconnect = () => {};
      takeRecords = () => [];
    }
    window.IntersectionObserver = NotIntersectingObserver as unknown as typeof IntersectionObserver;

    const { container } = render(
      <Reveal>
        <p>content</p>
      </Reveal>,
    );

    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toContain("opacity-0");
    expect(wrapper?.className).not.toContain("transition-all");
  });
});
