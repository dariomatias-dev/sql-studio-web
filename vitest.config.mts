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
        // Thin next-intl re-export.
        "src/i18n/navigation.ts",
        // shadcn/Radix primitives.
        "src/shared/components/ui/**",
      ],
      // Floor, not a target: raise it when coverage improves.
      thresholds: {
        statements: 96,
        branches: 93,
        functions: 92,
        lines: 97,
      },
    },
  },
});
