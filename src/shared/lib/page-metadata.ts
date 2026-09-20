import { routing } from "@/i18n/routing";

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";

import type { Metadata } from "next";

// Both root layouts (the `[locale]` tree and the utility-pages tree) declare
// this identically since Next.js has no shared ancestor left to inherit it from.
export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

const OG_LOCALES: Record<string, string> = {
  en: "en_US",
  "pt-BR": "pt_BR",
  es: "es_ES",
};

// localePrefix: "always" (routing.ts) means every locale, including the
// default, is always prefixed.
const localizedPath = (path: string, locale: string) =>
  path === "/" ? `/${locale}` : `/${locale}${path}`;

// Only locale-aware pages (under `[locale]`) pass `locale`; /contact,
// /privacy-policy, and /terms-of-service never do: they're single-language
// and stay outside the `[locale]` tree, so hreflang doesn't apply to them.
export const localeAlternates = (path: string, locale: string): Metadata["alternates"] => ({
  canonical: localizedPath(path, locale),
  languages: {
    ...Object.fromEntries(routing.locales.map((l) => [l, localizedPath(path, l)])),
    "x-default": localizedPath(path, routing.defaultLocale),
  },
});

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  locale?: string;
}

// A route's own openGraph/twitter replaces the layout's wholesale, so type/siteName repeat here too.
export const pageMetadata = ({ title, description, path, locale }: PageMetadataInput): Metadata => {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: locale ? localeAlternates(path, locale) : { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: locale ? (OG_LOCALES[locale] ?? "en_US") : "en_US",
      title: fullTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
};
