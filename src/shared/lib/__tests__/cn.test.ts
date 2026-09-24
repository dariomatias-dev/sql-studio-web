import { describe, expect, it } from "vitest";

import { cn } from "../cn";

describe("cn", () => {
  it("joins plain class strings", () => {
    expect(cn("flex", "items-center")).toBe("flex items-center");
  });

  it("drops falsy values", () => {
    expect(cn("flex", false, undefined, null, "", "gap-2")).toBe("flex gap-2");
  });

  it("applies conditional classes from an object", () => {
    expect(cn("flex", { "opacity-0": false, "opacity-100": true })).toBe("flex opacity-100");
  });

  it("resolves conflicting Tailwind utilities, keeping the last one", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("lets a later className override an earlier conflicting one", () => {
    expect(cn("text-sm text-slate-500", "text-lg")).toBe("text-slate-500 text-lg");
  });
});
