import emailjs from "@emailjs/browser";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { sendEmail } from "../email";

vi.mock("@emailjs/browser", () => ({
  default: { send: vi.fn() },
}));

const data = {
  email: "ada@example.com",
  subject: "Hello",
  message: "Testing sendEmail.",
};

describe("sendEmail", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env.NEXT_PUBLIC_SERVICE_ID = "service-id";
    process.env.NEXT_PUBLIC_TEMPLATE_ID = "template-id";
    process.env.NEXT_PUBLIC_PUBLIC_KEY = "public-key";
    vi.mocked(emailjs.send).mockReset();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("throws without sending when any EmailJS env var is missing", async () => {
    delete process.env.NEXT_PUBLIC_SERVICE_ID;

    await expect(sendEmail(data)).rejects.toThrow("Missing EmailJS environment variables");
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  it("calls emailjs.send with the service, template, payload, and public key", async () => {
    vi.mocked(emailjs.send).mockResolvedValueOnce({ status: 200, text: "OK" });

    await sendEmail(data);

    expect(emailjs.send).toHaveBeenCalledWith(
      "service-id",
      "template-id",
      { subject: data.subject, message: data.message, email: data.email },
      "public-key",
    );
  });

  it("logs and rethrows when emailjs.send fails", async () => {
    const error = new Error("network down");
    vi.mocked(emailjs.send).mockRejectedValueOnce(error);
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(sendEmail(data)).rejects.toThrow("network down");
    expect(consoleError).toHaveBeenCalledWith("EmailJS Error:", error);

    consoleError.mockRestore();
  });
});
