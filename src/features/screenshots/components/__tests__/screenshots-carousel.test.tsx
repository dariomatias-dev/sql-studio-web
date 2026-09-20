import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ScreenshotsCarousel } from "../screenshots-carousel";

// Index of the active dot: the only one whose bar carries "w-6".
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

  const preloadedImageUrls = () =>
    Array.from(document.head.querySelectorAll('link[rel="preload"][as="image"]')).map((link) =>
      link.getAttribute("imagesrcset"),
    );

  it("preloads only the first slide's image", () => {
    render(<ScreenshotsCarousel />);

    const preloads = preloadedImageUrls();
    expect(preloads).toHaveLength(1);
    expect(preloads[0]).toContain("01_home.png");
  });

  it("keeps the same image preloaded after navigating to another slide", async () => {
    const user = userEvent.setup();
    render(<ScreenshotsCarousel />);

    await user.click(screen.getByLabelText("Go to slide 5"));

    const preloads = preloadedImageUrls();
    expect(preloads).toHaveLength(1);
    expect(preloads[0]).toContain("01_home.png");
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
