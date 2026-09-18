import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { APP_REPOSITORY_URL } from "@/shared/lib/site";

import en from "../../../../../messages/en.json";
import { OpenSourceSection } from "../open-source-section";

describe("OpenSourceSection", () => {
  it("renders the heading and description", () => {
    render(<OpenSourceSection />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Built in the open, on purpose.",
    );
  });

  it("renders every stat's value and label", () => {
    render(<OpenSourceSection />);

    for (const stat of en.OpenSource.stats) {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    }
  });

  it("renders every module's name and description", () => {
    render(<OpenSourceSection />);

    for (const mod of en.OpenSource.modules) {
      expect(screen.getByText(mod.name)).toBeInTheDocument();
      expect(screen.getByText(mod.description)).toBeInTheDocument();
    }
  });

  it("links to the app's GitHub repository", () => {
    render(<OpenSourceSection />);

    const link = screen.getByRole("link", { name: /View Source on GitHub/ });
    expect(link).toHaveAttribute("href", APP_REPOSITORY_URL);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
