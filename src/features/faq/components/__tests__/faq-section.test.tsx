import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { APP_REPOSITORY_URL } from "@/shared/lib/site";

import en from "../../../../../messages/en.json";
import { FaqSection } from "../faq-section";

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

describe("FaqSection", () => {
  it("expands and collapses an answer on click", async () => {
    const user = userEvent.setup();
    render(<FaqSection />);

    const question = screen.getByRole("button", { name: "Is SQL Studio free?" });

    expect(question).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText(/completely free and offers all essential features/)).toBeNull();

    await user.click(question);
    expect(question).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText(/completely free and offers all essential features/),
    ).toBeInTheDocument();

    await user.click(question);
    expect(question).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText(/completely free and offers all essential features/)).toBeNull();
  });

  it("only keeps one answer open at a time", async () => {
    const user = userEvent.setup();
    render(<FaqSection />);

    const first = screen.getByRole("button", { name: "What databases does SQL Studio support?" });
    const second = screen.getByRole("button", { name: "Is SQL Studio free?" });

    await user.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");

    await user.click(second);
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveAttribute("aria-expanded", "false");
  });

  it("renders every question from the message catalog", () => {
    render(<FaqSection />);

    for (const item of en.Faq.items) {
      expect(screen.getByRole("button", { name: item.question })).toBeInTheDocument();
    }
  });

  it("renders the <strong> tag inside the SQLite support answer", async () => {
    const user = userEvent.setup();
    render(<FaqSection />);

    await user.click(
      screen.getByRole("button", { name: "What databases does SQL Studio support?" }),
    );
    expect(screen.getByText("SQLite").tagName).toBe("STRONG");
  });

  it("links the beta-access answer's download link to /download", async () => {
    const user = userEvent.setup();
    render(<FaqSection />);

    await user.click(
      screen.getByRole("button", { name: "How do I get access to SQL Studio right now?" }),
    );
    expect(screen.getByRole("link", { name: "download page" })).toHaveAttribute(
      "href",
      "/download",
    );
  });

  it("links the open-source answer's GitHub link to the app repository", async () => {
    const user = userEvent.setup();
    render(<FaqSection />);

    await user.click(screen.getByRole("button", { name: "Is SQL Studio open source?" }));
    const link = screen.getByRole("link", { name: "GitHub" });
    expect(link).toHaveAttribute("href", APP_REPOSITORY_URL);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("links the bug-report answer's issues and contact links", async () => {
    const user = userEvent.setup();
    render(<FaqSection />);

    await user.click(
      screen.getByRole("button", { name: "How do I report a bug or request a feature?" }),
    );
    expect(screen.getByRole("link", { name: "GitHub repository" })).toHaveAttribute(
      "href",
      `${APP_REPOSITORY_URL}/issues`,
    );
    expect(screen.getByRole("link", { name: "contact page" })).toHaveAttribute("href", "/contact");
  });
});
