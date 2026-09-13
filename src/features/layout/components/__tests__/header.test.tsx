import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Header } from "../header";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

describe("Header", () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue("/");
  });

  it("renders every nav link", () => {
    render(<Header />);

    for (const label of ["Features", "Workflow", "Screenshots", "FAQ"]) {
      // Each label appears twice: desktop nav and mobile menu.
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  it("opens the mobile menu as a dialog and closes it on link click", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();

    const mobileFaqLink = screen.getAllByText("FAQ").find((el) => el.tagName === "A");
    if (!mobileFaqLink) throw new Error("Mobile FAQ link not found");

    await user.click(mobileFaqLink);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the mobile menu on Escape", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("starts solid (no transparent variant) on any page but the home page", () => {
    vi.mocked(usePathname).mockReturnValue("/privacy-policy");
    render(<Header />);

    const header = document.querySelector("header");
    expect(header?.className).toContain("bg-white/90");
    expect(header?.className).not.toContain("bg-transparent");
  });
});
