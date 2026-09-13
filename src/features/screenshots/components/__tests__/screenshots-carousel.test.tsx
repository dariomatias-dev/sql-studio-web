import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ScreenshotsCarousel } from "../screenshots-carousel";

// The active dot is the only one whose bar div carries the "w-6" width
// class; the rest stay at "w-1.5". embla-carousel still tracks the
// selected snap correctly in jsdom even though layout measurements
// (getBoundingClientRect) are all zero, since every slide is the same
// (zero) size.
const activeDotIndex = () =>
  screen
    .getAllByLabelText(/Go to slide \d+/)
    .findIndex((dot) => dot.firstElementChild?.className.includes("w-6"));

describe("ScreenshotsCarousel", () => {
  it("starts on the first slide", () => {
    render(<ScreenshotsCarousel />);
    expect(activeDotIndex()).toBe(0);
  });

  it("advances and goes back with the next/previous buttons", async () => {
    const user = userEvent.setup();
    render(<ScreenshotsCarousel />);

    await user.click(screen.getByRole("button", { name: "Next slide" }));
    expect(activeDotIndex()).toBe(1);

    await user.click(screen.getByRole("button", { name: "Previous slide" }));
    expect(activeDotIndex()).toBe(0);
  });

  it("jumps to a slide when its dot is clicked", async () => {
    const user = userEvent.setup();
    render(<ScreenshotsCarousel />);

    await user.click(screen.getByLabelText("Go to slide 5"));
    expect(activeDotIndex()).toBe(4);
  });

  it("renders each slide as a focusable button with a descriptive label", () => {
    render(<ScreenshotsCarousel />);

    const carousel = screen.getByRole("region", { name: "App screenshots" });
    const slides = screen.getAllByRole("group", { name: /\d+ of 10/ });
    expect(slides).toHaveLength(10);
    expect(carousel).toHaveAttribute("aria-roledescription", "carousel");
    for (const slide of slides) {
      expect(slide).toHaveAttribute("aria-roledescription", "slide");
    }

    const firstSlideImage = screen.getAllByRole("img")[0];
    expect(firstSlideImage.getAttribute("alt")).not.toMatch(/^Screen \d+$/);
  });

  it("advances to the next slide with the right arrow key", async () => {
    const user = userEvent.setup();
    render(<ScreenshotsCarousel />);

    const slideButtons = screen.getAllByRole("group").map((group) => group.querySelector("button"));
    const firstSlideButton = slideButtons[0];
    if (!firstSlideButton) throw new Error("First slide button not found");

    firstSlideButton.focus();
    await user.keyboard("{ArrowRight}");
    expect(activeDotIndex()).toBe(1);

    await user.keyboard("{ArrowLeft}");
    expect(activeDotIndex()).toBe(0);
  });
});
