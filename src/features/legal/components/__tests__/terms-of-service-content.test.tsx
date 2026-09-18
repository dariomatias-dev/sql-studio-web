import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { APP_REPOSITORY_URL, SITE_EMAIL } from "@/shared/lib/site";

import TermsOfServiceContent from "../terms-of-service-content";

describe("TermsOfServiceContent", () => {
  it("renders the page heading", () => {
    render(<TermsOfServiceContent />);

    expect(screen.getByRole("heading", { level: 1, name: "Terms of Service" })).toBeInTheDocument();
  });

  it("renders every section heading, in order", () => {
    render(<TermsOfServiceContent />);

    const headings = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(headings).toEqual([
      "Open Source License",
      'The App "As Is"',
      "Local Data Responsibility",
      "Third Party Services",
      "Beta Status",
      "Changes to Terms",
      "Contact Us",
    ]);
  });

  it("links to the app's GitHub repository and its MIT license file", () => {
    render(<TermsOfServiceContent />);

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      APP_REPOSITORY_URL,
    );
    expect(screen.getByRole("link", { name: "MIT License" })).toHaveAttribute(
      "href",
      `${APP_REPOSITORY_URL}/blob/main/LICENSE`,
    );
  });

  it("links the mailto to the site's support email", () => {
    render(<TermsOfServiceContent />);

    const mailtoLinks = screen.getAllByRole("link", { name: SITE_EMAIL });
    expect(mailtoLinks.length).toBeGreaterThan(0);
    for (const link of mailtoLinks) {
      expect(link).toHaveAttribute("href", `mailto:${SITE_EMAIL}`);
    }
  });
});
