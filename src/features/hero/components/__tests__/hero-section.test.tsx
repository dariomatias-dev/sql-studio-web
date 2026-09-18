import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { HeroSection } from "../hero-section";

vi.mock("@/i18n/navigation", () => ({
  Link: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("HeroSection", () => {
  it("renders the headline, badge, and description", () => {
    render(<HeroSection />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("SQL Studio Anywhere.");
    expect(screen.getByText("Native SQLite Client")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Every database comes ready to query\. Currently in closed beta on Android\./,
      ),
    ).toBeInTheDocument();
  });

  it("links the explore-features CTA to the features section", () => {
    render(<HeroSection />);

    expect(screen.getByRole("link", { name: /Explore Features/ })).toHaveAttribute(
      "href",
      "#features",
    );
  });

  it("renders the three offline/instant/native stat labels", () => {
    render(<HeroSection />);

    expect(screen.getByText("SQLite Native")).toBeInTheDocument();
    expect(screen.getByText("Instant Query")).toBeInTheDocument();
    expect(screen.getByText("Offline Ready")).toBeInTheDocument();
  });
});
