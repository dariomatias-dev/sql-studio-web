import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DownloadButton } from "../download-button";

describe("DownloadButton", () => {
  it("links to the download page", () => {
    render(<DownloadButton />);

    expect(screen.getByRole("link", { name: /Google Play/ })).toHaveAttribute("href", "/download");
  });
});
