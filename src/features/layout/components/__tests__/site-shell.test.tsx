import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SITE_NAME, SITE_URL } from "@/shared/lib/site";

import { SiteShell } from "../site-shell";

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
  usePathname: () => "/",
}));

describe("SiteShell", () => {
  it("renders a skip link pointing at the main content", () => {
    render(
      <SiteShell locale="en" messages={{}}>
        <p>page content</p>
      </SiteShell>,
    );

    const skipLink = screen.getByRole("link", { name: "Skip to content" });
    expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  it("renders children inside the focusable main landmark", () => {
    render(
      <SiteShell locale="en" messages={{}}>
        <p>page content</p>
      </SiteShell>,
    );

    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "main-content");
    expect(main).toHaveAttribute("tabIndex", "-1");
    expect(screen.getByText("page content")).toBeInTheDocument();
  });

  it("embeds a MobileApplication JSON-LD script with the site's name and URL", () => {
    const { container } = render(
      <SiteShell locale="en" messages={{}}>
        <p>page content</p>
      </SiteShell>,
    );

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();

    const data = JSON.parse(script?.innerHTML ?? "{}");
    expect(data["@type"]).toBe("MobileApplication");
    expect(data.name).toBe(SITE_NAME);
    expect(data.url).toBe(SITE_URL);
  });
});
