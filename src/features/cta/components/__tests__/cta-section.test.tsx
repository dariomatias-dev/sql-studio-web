import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { APP_RELEASE_LABEL, APP_VERSION } from "@/shared/lib/app-release";

import { CtaSection } from "../cta-section";

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

describe("CtaSection", () => {
  it("renders the headline and description", () => {
    render(<CtaSection />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "SQL power in your pocket.",
    );
    expect(screen.getByText(/entirely for free/)).toBeInTheDocument();
  });

  it("renders the release label and current app version", () => {
    render(<CtaSection />);

    expect(screen.getByText(APP_RELEASE_LABEL)).toBeInTheDocument();
    expect(screen.getByText(`v${APP_VERSION}`)).toBeInTheDocument();
  });

  it("renders the no-account and free-and-private badges", () => {
    render(<CtaSection />);

    expect(screen.getByText("No account required")).toBeInTheDocument();
    expect(screen.getByText("100% Free & Private")).toBeInTheDocument();
  });
});
