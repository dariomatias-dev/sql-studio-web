import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { sendEmail } from "@/shared/lib/email";

import { ContactForm } from "../contact-form";

vi.mock("@/shared/lib/email", () => ({
  sendEmail: vi.fn(),
}));

vi.mock("@/shared/lib/spam-guard", () => ({
  useSpamGuard: () => ({ honeypotRef: { current: null }, isSpam: () => false }),
}));

describe("ContactForm", () => {
  afterEach(() => {
    vi.mocked(sendEmail).mockReset();
  });

  it("shows validation errors and never calls sendEmail on an empty submission", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(await screen.findByText("Name must be at least 2 characters")).toBeInTheDocument();
    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    expect(screen.getByText("Message must be at least 10 characters")).toBeInTheDocument();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("calls sendEmail and shows a success message on a valid submission", async () => {
    vi.mocked(sendEmail).mockResolvedValueOnce();
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Message"), "Testing the contact form.");
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(await screen.findByText("Message sent successfully!")).toBeInTheDocument();
    expect(sendEmail).toHaveBeenCalledWith({
      email: "ada@example.com",
      subject: "General Inquiry",
      message: "Ada Lovelace: Testing the contact form.",
    });
  });

  it("shows an error message when sendEmail rejects", async () => {
    vi.mocked(sendEmail).mockRejectedValueOnce(new Error("network down"));
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Message"), "Testing the contact form.");
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(await screen.findByText("Failed to send. Please try again.")).toBeInTheDocument();
  });
});
