import { describe, expect, it } from "vitest";

import en from "../../../messages/en.json";
import es from "../../../messages/es.json";
import ptBR from "../../../messages/pt-BR.json";

function collectKeyPaths(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectKeyPaths(item, `${prefix}[${index}]`));
  }
  if (value !== null && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
      collectKeyPaths(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

describe("message catalogs", () => {
  it("pt-BR exposes the exact same key paths as en", () => {
    expect(collectKeyPaths(ptBR).sort()).toEqual(collectKeyPaths(en).sort());
  });

  it("es exposes the exact same key paths as en", () => {
    expect(collectKeyPaths(es).sort()).toEqual(collectKeyPaths(en).sort());
  });
});
