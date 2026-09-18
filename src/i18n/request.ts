import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";
import enMessages from "../../messages/en.json";
import esMessages from "../../messages/es.json";
import ptBrMessages from "../../messages/pt-BR.json";

const MESSAGES_BY_LOCALE: Record<string, Record<string, unknown>> = {
  en: enMessages,
  "pt-BR": ptBrMessages,
  es: esMessages,
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: MESSAGES_BY_LOCALE[locale],
  };
});
