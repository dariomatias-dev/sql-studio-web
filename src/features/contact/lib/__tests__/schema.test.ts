import { describe, expect, it } from "vitest";

import { schema } from "../schema";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  subject: "General Inquiry",
  message: "This message is long enough.",
};

describe("contact form schema", () => {
  it("accepts a fully valid submission", () => {
    expect(schema.safeParse(valid).success).toBe(true);
  });

  it("rejects a name shorter than 2 characters", () => {
    const result = schema.safeParse({ ...valid, name: "A" });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Name must be at least 2 characters");
  });

  it("rejects an invalid email address", () => {
    const result = schema.safeParse({ ...valid, email: "not-an-email" });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Invalid email address");
  });

  it("rejects an empty subject", () => {
    const result = schema.safeParse({ ...valid, subject: "" });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Please select a subject");
  });

  it("rejects a message shorter than 10 characters", () => {
    const result = schema.safeParse({ ...valid, message: "too short" });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Message must be at least 10 characters");
  });
});
