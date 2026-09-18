import { describe, expect, it } from "vitest";

import { baseMetadata, localeAlternates, pageMetadata } from "../page-metadata";
import { SITE_NAME, SITE_URL } from "../site";

describe("baseMetadata", () => {
  it("sets the site's default title, template, and canonical", () => {
    expect(baseMetadata.metadataBase).toEqual(new URL(SITE_URL));
    expect(baseMetadata.title).toEqual({ default: SITE_NAME, template: `%s | ${SITE_NAME}` });
    expect(baseMetadata.alternates).toEqual({ canonical: "/" });
  });
});

describe("localeAlternates", () => {
  it("keeps the default locale's canonical unprefixed", () => {
    expect(localeAlternates("/", "en")).toMatchObject({ canonical: "/" });
    expect(localeAlternates("/download", "en")).toMatchObject({ canonical: "/download" });
  });

  it("prefixes non-default locales", () => {
    expect(localeAlternates("/", "pt-BR")).toMatchObject({ canonical: "/pt-BR" });
    expect(localeAlternates("/download", "es")).toMatchObject({ canonical: "/es/download" });
  });

  it("lists every locale plus x-default, all pointing at the same path", () => {
    const alternates = localeAlternates("/download", "en");

    expect(alternates?.languages).toEqual({
      en: "/download",
      "pt-BR": "/pt-BR/download",
      es: "/es/download",
      "x-default": "/download",
    });
  });

  it("always points x-default at the default locale's path, regardless of the current locale", () => {
    const fromEs = localeAlternates("/download", "es");
    const fromPtBr = localeAlternates("/download", "pt-BR");

    expect((fromEs?.languages as Record<string, string>)["x-default"]).toBe("/download");
    expect((fromPtBr?.languages as Record<string, string>)["x-default"]).toBe("/download");
  });
});

describe("pageMetadata", () => {
  it("builds a title, description, and canonical for a single-language page", () => {
    const metadata = pageMetadata({
      title: "Contact",
      description: "Get in touch.",
      path: "/contact",
    });

    expect(metadata.title).toBe("Contact");
    expect(metadata.description).toBe("Get in touch.");
    expect(metadata.alternates).toEqual({ canonical: "/contact" });
  });

  it("prefixes the OpenGraph title with the site name", () => {
    const metadata = pageMetadata({
      title: "Contact",
      description: "Get in touch.",
      path: "/contact",
    });

    expect(metadata.openGraph?.title).toBe(`Contact | ${SITE_NAME}`);
    expect(metadata.twitter).toMatchObject({ title: `Contact | ${SITE_NAME}` });
  });

  it("defaults the OpenGraph locale to en_US when no locale is given", () => {
    const metadata = pageMetadata({
      title: "Contact",
      description: "Get in touch.",
      path: "/contact",
    });

    expect(metadata.openGraph?.locale).toBe("en_US");
  });

  it("maps a known locale to its OpenGraph locale tag and adds hreflang alternates", () => {
    const metadata = pageMetadata({
      title: "Download",
      description: "Get the app.",
      path: "/download",
      locale: "pt-BR",
    });

    expect(metadata.openGraph?.locale).toBe("pt_BR");
    expect(metadata.alternates).toMatchObject({ canonical: "/pt-BR/download" });
  });

  it("falls back to en_US for an OpenGraph locale it doesn't recognize", () => {
    const metadata = pageMetadata({
      title: "Download",
      description: "Get the app.",
      path: "/download",
      // Cast is deliberate: only next-intl's routing.locales are valid callers in
      // practice, but the function shouldn't crash on an unexpected value either.
      locale: "fr" as string,
    });

    expect(metadata.openGraph?.locale).toBe("en_US");
  });
});
