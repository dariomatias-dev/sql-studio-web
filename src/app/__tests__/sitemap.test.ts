import { describe, expect, it } from "vitest";

import { SITE_URL } from "@/shared/lib/site";

import sitemap from "../sitemap";

describe("sitemap", () => {
  it("lists every route once, as an absolute URL under SITE_URL", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toEqual([
      `${SITE_URL}/`,
      `${SITE_URL}/contact`,
      `${SITE_URL}/download`,
      `${SITE_URL}/privacy-policy`,
      `${SITE_URL}/terms-of-service`,
    ]);
  });

  it("gives the home page the highest priority", () => {
    const home = sitemap().find((entry) => entry.url === `${SITE_URL}/`);

    expect(home?.priority).toBe(1);
  });
});
