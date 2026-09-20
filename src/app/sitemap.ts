import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/shared/lib/site";

import type { MetadataRoute } from "next";

const localizedPath = (path: string, locale: string) =>
  path === "/" ? `/${locale}` : `/${locale}${path}`;

const languageAlternates = (path: string) =>
  Object.fromEntries(
    routing.locales.map((locale) => [locale, `${SITE_URL}${localizedPath(path, locale)}`]),
  );

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedRoutes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "monthly", priority: 1 },
    { path: "/download", changeFrequency: "monthly", priority: 0.8 },
  ];

  const staticRoutes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms-of-service", changeFrequency: "yearly", priority: 0.3 },
  ];

  const localizedEntries: MetadataRoute.Sitemap = localizedRoutes.flatMap(
    ({ path, changeFrequency, priority }) =>
      routing.locales.map((locale) => ({
        url: `${SITE_URL}${localizedPath(path, locale)}`,
        changeFrequency,
        priority,
        alternates: { languages: languageAlternates(path) },
      })),
  );

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency,
      priority,
    }),
  );

  return [...localizedEntries, ...staticEntries];
}
