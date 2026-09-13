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
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "text-summary", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "**/__tests__/**",
        "src/app/**/{layout,page,not-found}.tsx",
        "**/*.types.ts",
        "**/index.ts",
        // shadcn/Radix primitives: styling only, no logic of our own.
        "src/shared/components/ui/**",
      ],
      // Floor, not a target: measured minus a small margin (actual was
      // 81.64/94.04/70.68/82.31 on 2026-09-13, right after the E29 component
      // tests). Known gaps — most section components with no interaction of
      // their own (cta, features-showcase, hero, workflow), the page-content
      // wrappers now that their forms are tested separately, and the icon
      // components — are a backlog, not a reason to lower this further.
      // Raise it whenever a change measurably improves the aggregate;
      // lowering it needs a reason in the commit message.
      thresholds: {
        statements: 78,
        branches: 90,
        functions: 65,
        lines: 78,
      },
    },
  },
});
