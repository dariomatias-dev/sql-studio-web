import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ScreenshotsSection } from "../screenshots-section";

describe("ScreenshotsSection", () => {
  it("renders the heading, description, and the carousel", () => {
    render(<ScreenshotsSection />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Built for Speed & Precision.",
    );
    expect(screen.getByRole("button", { name: "Next slide" })).toBeInTheDocument();
  });
});
