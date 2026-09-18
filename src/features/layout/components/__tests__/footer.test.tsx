import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Footer } from "../footer";

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

describe("Footer", () => {
  it("links to the legal pages and contact", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy-policy",
    );
    expect(screen.getByRole("link", { name: "Terms of Service" })).toHaveAttribute(
      "href",
      "/terms-of-service",
    );
    expect(screen.getByRole("link", { name: "Contact Support" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("links the product section to home page anchors", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "Screenshots" })).toHaveAttribute(
      "href",
      "/#screenshots",
    );
  });

  it("links every social icon to its destination", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");

    expect(
      footer.querySelector('a[href="https://github.com/dariomatias-dev"]'),
    ).toBeInTheDocument();
    expect(footer.querySelector('a[href="mailto:matiasdario75@gmail.com"]')).toBeInTheDocument();
  });

  it("scrolls to the top when Back to Top is clicked", async () => {
    const scrollTo = vi.fn();
    vi.stubGlobal("scrollTo", scrollTo);
    const user = userEvent.setup();
    render(<Footer />);

    await user.click(screen.getByRole("button", { name: "Back to Top" }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("shows the current year in the copyright notice", () => {
    render(<Footer />);

    expect(
      screen.getByText(`© ${new Date().getFullYear()} SQL Studio. All rights reserved.`),
    ).toBeInTheDocument();
  });
});
