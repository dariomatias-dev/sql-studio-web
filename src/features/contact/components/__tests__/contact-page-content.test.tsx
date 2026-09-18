import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { GITHUB_URL, LINKEDIN_URL, SITE_EMAIL } from "@/shared/lib/site";

import ContactPageContent from "../contact-page-content";

vi.mock("@/shared/lib/email", () => ({ sendEmail: vi.fn() }));

describe("ContactPageContent", () => {
  it("renders the page heading", () => {
    render(<ContactPageContent />);

    expect(screen.getByRole("heading", { level: 1, name: "Get in Touch" })).toBeInTheDocument();
  });

  it("links the email support address, GitHub profile, and LinkedIn profile", () => {
    render(<ContactPageContent />);

    expect(screen.getByRole("link", { name: SITE_EMAIL })).toHaveAttribute(
      "href",
      `mailto:${SITE_EMAIL}`,
    );
    expect(screen.getByRole("link", { name: /GitHub Profile/ })).toHaveAttribute(
      "href",
      GITHUB_URL,
    );
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", LINKEDIN_URL);
  });

  it("renders the contact form", () => {
    render(<ContactPageContent />);

    expect(screen.getByRole("textbox", { name: /Name/ })).toBeInTheDocument();
  });
});
