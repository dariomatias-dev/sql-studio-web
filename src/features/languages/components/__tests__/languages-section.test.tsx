import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { languages } from "../../data/languages";
import { LanguagesSection } from "../languages-section";

describe("LanguagesSection", () => {
  it("renders the heading and description", () => {
    render(<LanguagesSection />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Speak your own language.");
  });

  it("renders every language's name and a matching screenshot alt text", () => {
    render(<LanguagesSection />);

    for (const language of languages) {
      expect(screen.getByText(language.name)).toBeInTheDocument();
      expect(
        screen.getByAltText(`SQL Studio's home screen in ${language.name}`),
      ).toBeInTheDocument();
    }
  });
});
