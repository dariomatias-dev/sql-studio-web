import { LOCALE_NAMES } from "@/shared/lib/locale-names";

import type { Language } from "./language.types";

// Display order; English sits in the center column.
export const languages: Language[] = [
  { code: "pt-BR", name: LOCALE_NAMES["pt-BR"], screenshot: "/screenshots/locales/pt-BR.png" },
  { code: "en", name: LOCALE_NAMES.en, screenshot: "/screenshots/locales/en.png" },
  { code: "es", name: LOCALE_NAMES.es, screenshot: "/screenshots/locales/es.png" },
];
