import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import en from "../../../../../messages/en.json";
import BetaAccessPageContent from "../beta-access-page-content";

vi.mock("@/shared/lib/email", () => ({ sendEmail: vi.fn() }));

describe("BetaAccessPageContent", () => {
  it("renders the heading and description", () => {
    render(<BetaAccessPageContent />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Join the Development Program",
    );
  });

  it("renders the beta access form", () => {
    render(<BetaAccessPageContent />);

    expect(screen.getByRole("textbox", { name: /Google Play Email Address/ })).toBeInTheDocument();
  });

  it("renders every how-it-works step, with its number and title", () => {
    render(<BetaAccessPageContent />);

    for (const step of en.Download.steps) {
      expect(screen.getByText(`Step ${step.step}`)).toBeInTheDocument();
      expect(screen.getByText(step.title)).toBeInTheDocument();
      expect(screen.getByText(step.description)).toBeInTheDocument();
    }
  });
});
