import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SITE_EMAIL } from "@/shared/lib/site";

import PrivacyPolicyContent from "../privacy-policy-content";

describe("PrivacyPolicyContent", () => {
  it("renders the page heading", () => {
    render(<PrivacyPolicyContent />);

    expect(screen.getByRole("heading", { level: 1, name: "Privacy Policy" })).toBeInTheDocument();
  });

  it("renders every section heading, in order", () => {
    render(<PrivacyPolicyContent />);

    const headings = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(headings).toEqual([
      "The App",
      "This Website",
      "Your Rights",
      "Children's Privacy",
      "Changes to This Policy",
      "Contact Us",
    ]);
  });

  it("links every mailto to the site's support email", () => {
    render(<PrivacyPolicyContent />);

    const mailtoLinks = screen.getAllByRole("link", { name: SITE_EMAIL });
    expect(mailtoLinks.length).toBeGreaterThan(0);
    for (const link of mailtoLinks) {
      expect(link).toHaveAttribute("href", `mailto:${SITE_EMAIL}`);
    }
  });

  it("links to EmailJS's own privacy policy", () => {
    render(<PrivacyPolicyContent />);

    const link = screen.getByRole("link", { name: "EmailJS" });
    expect(link).toHaveAttribute("href", "https://www.emailjs.com/legal/privacy-policy/");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
