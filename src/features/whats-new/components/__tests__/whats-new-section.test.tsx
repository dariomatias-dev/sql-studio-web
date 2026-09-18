import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { APP_VERSION } from "@/shared/lib/app-release";

import en from "../../../../../messages/en.json";
import { WhatsNewSection } from "../whats-new-section";

describe("WhatsNewSection", () => {
  it("renders the heading and description", () => {
    render(<WhatsNewSection />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("What's New.");
  });

  it("renders every release's version, date, and highlights", () => {
    render(<WhatsNewSection />);

    for (const release of en.WhatsNew.releases) {
      expect(screen.getByText(`v${release.version}`)).toBeInTheDocument();
      expect(screen.getByText(release.date)).toBeInTheDocument();
      for (const highlight of release.highlights) {
        expect(screen.getByText(highlight)).toBeInTheDocument();
      }
    }
  });

  it("marks only the release matching the app's current version as current", () => {
    render(<WhatsNewSection />);

    const currentBadges = screen.getAllByText("Current");
    expect(currentBadges).toHaveLength(1);

    const currentRelease = en.WhatsNew.releases.find((r) => r.version === APP_VERSION);
    expect(currentRelease).toBeDefined();
  });
});
