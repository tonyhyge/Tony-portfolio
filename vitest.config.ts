import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}", "src/**/*.spec.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/lib/**", "src/components/ui/**", "src/app/**"],
      exclude: [
        "layout.tsx",
        "globals.css",
        "data/**",
        "lib/utils.ts",
        "*.d.ts",
        "*.config.*",
        "**/app/**",
        "**/components/ui/avatar.tsx",
        "**/components/ui/card.tsx",
        "**/components/ui/navigation-menu.tsx",
        "**/components/ui/separator.tsx",
        "**/components/ui/sheet.tsx",
      ],
      thresholds: {
        lines: 80,
        branches: 80,
        functions: 80,
        statements: 80,
      },
    },
  },
});
