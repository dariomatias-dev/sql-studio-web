import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { sendEmail } from "@/shared/lib/email";

import { BetaAccessForm } from "../beta-access-form";

vi.mock("@/shared/lib/email", () => ({
  sendEmail: vi.fn(),
}));

vi.mock("@/shared/lib/spam-guard", () => ({
  useSpamGuard: () => ({ honeypotRef: { current: null }, isSpam: () => false }),
}));

describe("BetaAccessForm", () => {
  afterEach(() => {
    vi.mocked(sendEmail).mockReset();
  });

  it("calls sendEmail and shows the success state on submission", async () => {
    vi.mocked(sendEmail).mockResolvedValueOnce();
    const user = userEvent.setup();
    render(<BetaAccessForm />);

    await user.type(screen.getByLabelText("Google Play Email Address"), "tester@example.com");
    await user.click(screen.getByRole("button", { name: "Join Beta Waitlist" }));

    expect(await screen.findByText("Request Received")).toBeInTheDocument();
    expect(sendEmail).toHaveBeenCalledWith({
      email: "tester@example.com",
      subject: "Beta Access Request",
      message: "Requesting beta access for Google Play email: tester@example.com",
    });
  });

  it("shows an error message when sendEmail rejects", async () => {
    vi.mocked(sendEmail).mockRejectedValueOnce(new Error("network down"));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<BetaAccessForm />);

    await user.type(screen.getByLabelText("Google Play Email Address"), "tester@example.com");
    await user.click(screen.getByRole("button", { name: "Join Beta Waitlist" }));

    expect(
      await screen.findByText("Failed to send request. Please try again."),
    ).toBeInTheDocument();
  });
});
