import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { sendEmail } from "@/shared/lib/email";

import { ContactForm } from "../contact-form";

vi.mock("@/shared/lib/email", () => ({
  sendEmail: vi.fn(),
}));

describe("ContactForm spam guard", () => {
  afterEach(() => {
    vi.mocked(sendEmail).mockReset();
    vi.useRealTimers();
  });

  it("silently blocks submission when the honeypot field is filled", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Message"), "Testing the honeypot.");
    // Real users never see or fill this field; bots that fill every input do.
    await user.type(document.getElementById("company") as HTMLInputElement, "Acme Inc");
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(await screen.findByText("Message sent successfully!")).toBeInTheDocument();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("silently blocks submission filled in faster than a human could type", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ delay: null });
    render(<ContactForm />);

    // No time advances here: the form is filled and submitted in the same tick.
    await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Message"), "Testing the fill-time guard.");
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(await screen.findByText("Message sent successfully!")).toBeInTheDocument();
    expect(sendEmail).not.toHaveBeenCalled();
  });
});
