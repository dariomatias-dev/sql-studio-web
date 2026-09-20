import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "pt-BR", "es"],
  defaultLocale: "en",
  localePrefix: "always",
  // English by default; only an explicit /pt-BR or /es URL switches locale.
  localeDetection: false,
});
