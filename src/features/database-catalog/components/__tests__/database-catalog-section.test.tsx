import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import en from "../../../../../messages/en.json";
import { DatabaseCatalogSection } from "../database-catalog-section";

describe("DatabaseCatalogSection", () => {
  it("renders the heading and description", () => {
    render(<DatabaseCatalogSection />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "14 databases, zero setup.",
    );
  });

  it("renders every database from the message catalog, by name", () => {
    render(<DatabaseCatalogSection />);

    for (const database of en.Databases.items) {
      expect(screen.getByText(database.name)).toBeInTheDocument();
    }
  });

  it("pluralizes the table count correctly", () => {
    render(<DatabaseCatalogSection />);

    expect(screen.getByText("1 table")).toBeInTheDocument();
    expect(screen.getByText("2 tables")).toBeInTheDocument();
  });
});
