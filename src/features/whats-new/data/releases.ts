import type { Release } from "./release.types";

export const releases: Release[] = [
  {
    version: "0.3.0",
    date: "July 31, 2026",
    highlights: [
      "Light, dark, and system theme support.",
      "Search filter on the databases list.",
      "Navigate straight to a table from the database visualizer's schema diagram.",
      "Toast confirmation for database actions.",
    ],
  },
  {
    version: "0.2.0",
    date: "July 26, 2026",
    highlights: [
      "Redesigned UI with a unified black-and-white minimal visual identity.",
      "About screen with app info and a licenses viewer.",
      "SQL editor download/export, load-last-query, and copy schema/seed to clipboard.",
      "Database visualizer relation tracing and automatic diagram fit-to-view.",
      "Transitions and micro-animations across screens and components.",
    ],
  },
  {
    version: "0.1.1",
    date: "December 3, 2025",
    highlights: [
      "Full internationalization: English, Portuguese (Brazil), and Spanish.",
      "Language switching support and a language selector.",
      "Advanced SQL suggestions.",
      "Contact option in Settings.",
    ],
  },
  {
    version: "0.1.0",
    date: "October 26, 2025",
    highlights: [
      "Initial release: database creation, listing, favoriting, and deletion.",
      "SQL editor and console workspace.",
      "Basic SQL suggestions.",
    ],
  },
];
