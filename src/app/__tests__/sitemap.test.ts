import { describe, expect, it } from "vitest";

import { SITE_URL } from "@/shared/lib/site";

import sitemap from "../sitemap";

describe("sitemap", () => {
  it("lists every route once, as an absolute URL under SITE_URL", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toEqual([
      `${SITE_URL}/`,
      `${SITE_URL}/pt-BR`,
      `${SITE_URL}/es`,
      `${SITE_URL}/download`,
      `${SITE_URL}/pt-BR/download`,
      `${SITE_URL}/es/download`,
      `${SITE_URL}/contact`,
      `${SITE_URL}/privacy-policy`,
      `${SITE_URL}/terms-of-service`,
    ]);
  });

  it("gives the home page the highest priority", () => {
    const home = sitemap().find((entry) => entry.url === `${SITE_URL}/`);

    expect(home?.priority).toBe(1);
  });

  it("gives locale-aware routes hreflang alternates for every locale", () => {
    const home = sitemap().find((entry) => entry.url === `${SITE_URL}/`);

    expect(home?.alternates?.languages).toEqual({
      en: `${SITE_URL}/`,
      "pt-BR": `${SITE_URL}/pt-BR`,
      es: `${SITE_URL}/es`,
    });
  });

  it("does not add hreflang alternates to the single-language routes", () => {
    const contact = sitemap().find((entry) => entry.url === `${SITE_URL}/contact`);

    expect(contact?.alternates).toBeUndefined();
  });
});
