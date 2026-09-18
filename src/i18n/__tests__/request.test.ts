import { describe, expect, it } from "vitest";

import enMessages from "../../../messages/en.json";
import esMessages from "../../../messages/es.json";
import ptBrMessages from "../../../messages/pt-BR.json";
import { MESSAGES_BY_LOCALE, resolveLocale } from "../request";

describe("resolveLocale", () => {
  it("keeps a supported locale as-is", () => {
    expect(resolveLocale("pt-BR")).toBe("pt-BR");
    expect(resolveLocale("es")).toBe("es");
    expect(resolveLocale("en")).toBe("en");
  });

  it("falls back to the default locale (en) for an unsupported locale", () => {
    expect(resolveLocale("fr")).toBe("en");
  });

  it("falls back to the default locale (en) when no locale is requested", () => {
    expect(resolveLocale(undefined)).toBe("en");
  });
});

describe("MESSAGES_BY_LOCALE", () => {
  it("maps each supported locale to its real message catalog", () => {
    expect(MESSAGES_BY_LOCALE.en).toEqual(enMessages);
    expect(MESSAGES_BY_LOCALE["pt-BR"]).toEqual(ptBrMessages);
    expect(MESSAGES_BY_LOCALE.es).toEqual(esMessages);
  });
});
