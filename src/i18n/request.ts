import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";
import enMessages from "../../messages/en.json";
import esMessages from "../../messages/es.json";
import ptBrMessages from "../../messages/pt-BR.json";

export const MESSAGES_BY_LOCALE: Record<string, Record<string, unknown>> = {
  en: enMessages,
  "pt-BR": ptBrMessages,
  es: esMessages,
};

// Locale resolution, separate from getRequestConfig so it can be unit-tested.
export const resolveLocale = (requested: string | undefined): string =>
  hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = resolveLocale(await requestLocale);

  return {
    locale,
    messages: MESSAGES_BY_LOCALE[locale],
  };
});
