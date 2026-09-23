import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useSpamGuard } from "../spam-guard";

describe("useSpamGuard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("flags as spam when the honeypot field is filled", () => {
    const { result } = renderHook(() => useSpamGuard());

    const input = document.createElement("input");
    input.value = "Acme Inc";
    result.current.honeypotRef.current = input;

    expect(result.current.isSpam()).toBe(true);
  });

  it("flags as spam when submitted before the minimum fill time", () => {
    const { result } = renderHook(() => useSpamGuard());

    act(() => {
      vi.advanceTimersByTime(1499);
    });

    expect(result.current.isSpam()).toBe(true);
  });

  it("does not flag as spam once the minimum fill time has passed with an empty honeypot", () => {
    const { result } = renderHook(() => useSpamGuard());

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(result.current.isSpam()).toBe(false);
  });
});
