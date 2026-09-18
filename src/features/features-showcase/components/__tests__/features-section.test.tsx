import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import en from "../../../../../messages/en.json";
import { FeaturesSection } from "../features-section";

describe("FeaturesSection", () => {
  it("renders the heading and description", () => {
    render(<FeaturesSection />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Engineered for Modern Performance.",
    );
  });

  it("renders every feature's title and description", () => {
    render(<FeaturesSection />);

    for (const feature of en.Features.items) {
      expect(screen.getByText(feature.title)).toBeInTheDocument();
      expect(screen.getByText(feature.description)).toBeInTheDocument();
    }
  });
});
