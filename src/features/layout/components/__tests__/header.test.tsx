import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname } from "next/navigation";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Header } from "../header";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

describe("Header", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/");
    document.body.style.overflow = "";
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("renders every nav link", () => {
    render(<Header />);

    for (const label of ["Features", "Workflow", "Screenshots", "FAQ"]) {
      // Each label appears twice: desktop nav and mobile menu.
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  it("opens the mobile menu, locks scroll, and closes it on link click", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggle = screen.getByRole("navigation").querySelector("button");
    if (!toggle) throw new Error("Mobile menu toggle not found");

    await user.click(toggle);
    expect(document.body.style.overflow).toBe("hidden");

    const mobileFaqLink = screen.getAllByText("FAQ").find((el) => el.tagName === "A");
    if (!mobileFaqLink) throw new Error("Mobile FAQ link not found");

    await user.click(mobileFaqLink);
    expect(document.body.style.overflow).toBe("");
  });

  it("starts solid (no transparent variant) on any page but the home page", () => {
    vi.mocked(usePathname).mockReturnValue("/privacy-policy");
    render(<Header />);

    const header = document.querySelector("header");
    expect(header?.className).toContain("bg-white/90");
    expect(header?.className).not.toContain("bg-transparent");
  });
});
