import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { usePathname } from "@/i18n/navigation";

import { LanguageSwitcher } from "../language-switcher";

vi.mock("@/i18n/navigation", () => ({
  usePathname: vi.fn(),
  Link: ({
    href,
    locale,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; locale: string }) => (
    <a href={`/${locale}${href === "/" ? "" : href}`} {...props}>
      {children}
    </a>
  ),
}));

describe("LanguageSwitcher", () => {
  it("opens a menu listing every supported locale, linking to the current path", async () => {
    vi.mocked(usePathname).mockReturnValue("/download");
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    await user.click(screen.getByRole("button", { name: "Change language" }));

    expect(screen.getByRole("menuitem", { name: /English/ })).toHaveAttribute(
      "href",
      "/en/download",
    );
    expect(screen.getByRole("menuitem", { name: /Português/ })).toHaveAttribute(
      "href",
      "/pt-BR/download",
    );
    expect(screen.getByRole("menuitem", { name: /Español/ })).toHaveAttribute(
      "href",
      "/es/download",
    );
  });

  it("marks the current locale with a check mark", async () => {
    vi.mocked(usePathname).mockReturnValue("/");
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    await user.click(screen.getByRole("button", { name: "Change language" }));

    const english = screen.getByRole("menuitem", { name: /English/ });
    expect(english.querySelector("svg")).not.toBeNull();

    const portuguese = screen.getByRole("menuitem", { name: /Português/ });
    expect(portuguese.querySelector("svg")).toBeNull();
  });

  it("calls onNavigate when a locale is selected", async () => {
    vi.mocked(usePathname).mockReturnValue("/");
    const onNavigate = vi.fn();
    const user = userEvent.setup();
    render(<LanguageSwitcher onNavigate={onNavigate} />);

    await user.click(screen.getByRole("button", { name: "Change language" }));
    await user.click(screen.getByRole("menuitem", { name: /Português/ }));

    expect(onNavigate).toHaveBeenCalledTimes(1);
  });
});
