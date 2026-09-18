import type { Language } from "./language.types";

// Order controls display position (grid-cols-3): English stays centered.
export const languages: Language[] = [
  { code: "pt-BR", name: "Português (Brasil)", screenshot: "/screenshots/locales/pt-BR.png" },
  { code: "en", name: "English", screenshot: "/screenshots/locales/en.png" },
  { code: "es", name: "Español", screenshot: "/screenshots/locales/es.png" },
];
