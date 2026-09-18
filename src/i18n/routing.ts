import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "pt-BR", "es"],
  defaultLocale: "en",
  localePrefix: "always",
  // English is the default regardless of the visitor's browser language;
  // only an explicit /pt-BR or /es URL switches locale.
  localeDetection: false,
});
