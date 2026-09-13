import emailjs from "@emailjs/browser";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { BetaAccessForm } from "../beta-access-form";

vi.mock("@emailjs/browser", () => ({
  default: { send: vi.fn() },
}));

describe("BetaAccessForm", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SERVICE_ID = "service-id";
    process.env.NEXT_PUBLIC_TEMPLATE_ID = "template-id";
    process.env.NEXT_PUBLIC_PUBLIC_KEY = "public-key";
    vi.mocked(emailjs.send).mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls emailjs.send and shows the success state on submission", async () => {
    vi.mocked(emailjs.send).mockResolvedValueOnce({ status: 200, text: "OK" });
    const user = userEvent.setup();
    render(<BetaAccessForm />);

    await user.type(screen.getByLabelText("Google Play Email Address"), "tester@example.com");
    await user.click(screen.getByRole("button", { name: "Join Beta Waitlist" }));

    expect(await screen.findByText("Request Received")).toBeInTheDocument();
    expect(emailjs.send).toHaveBeenCalledWith(
      "service-id",
      "template-id",
      expect.objectContaining({ email: "tester@example.com" }),
      "public-key",
    );
  });

  it("shows an error message when emailjs.send rejects", async () => {
    vi.mocked(emailjs.send).mockRejectedValueOnce(new Error("network down"));
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
