import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import en from "../../../../../messages/en.json";
import { WorkflowSection } from "../workflow-section";

describe("WorkflowSection", () => {
  it("renders the heading and description", () => {
    render(<WorkflowSection />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Master your data in four simple steps.",
    );
  });

  it("renders every step's title and description, in order", () => {
    render(<WorkflowSection />);

    const headings = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    en.Workflow.steps.forEach((step, index) => {
      expect(headings[index]).toContain(step.title);
      expect(screen.getByText(step.description)).toBeInTheDocument();
    });
  });

  it("renders the mockup image, status label, and query-executed toast", () => {
    render(<WorkflowSection />);

    expect(screen.getByAltText("SQL editor with an active database")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Query Executed")).toBeInTheDocument();
  });
});
