import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}", "scripts/**/*.{test,spec}.mjs"],
    coverage: {
      provider: "v8",
      reporter: ["text", "text-summary", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "**/__tests__/**",
        "src/app/**/{layout,page,not-found,opengraph-image}.tsx",
        "**/*.types.ts",
        "**/index.ts",
        // Thin next-intl re-export with no logic of our own; exercised
        // end-to-end by every /pt-BR and /es e2e assertion.
        "src/i18n/navigation.ts",
        // shadcn/Radix primitives: styling only, no logic of our own.
        "src/shared/components/ui/**",
      ],
      // Floor, not a target: measured minus a small margin (actual was
      // 97.23/94.69/94.49/98.67 on 2026-09-18, after adding tests for every
      // previously-untested section component, page-metadata.ts, and
      // i18n/request.ts). Raise it whenever a change measurably improves
      // the aggregate; lowering it needs a reason in the commit message.
      thresholds: {
        statements: 96,
        branches: 93,
        functions: 92,
        lines: 97,
      },
    },
  },
});
