import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DownloadButton } from "../download-button";

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

describe("DownloadButton", () => {
  it("links to the download page", () => {
    render(<DownloadButton />);

    expect(screen.getByRole("link", { name: /Google Play/ })).toHaveAttribute("href", "/download");
  });
});
