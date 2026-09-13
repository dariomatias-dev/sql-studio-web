import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { FaqSection } from "../faq-section";

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
});
