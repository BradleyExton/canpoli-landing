import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["**/*.d.ts", "src/**/__tests__/**"],
      thresholds: {
        "src/lib/**/*.{ts,tsx}": {
          lines: 80,
          branches: 80,
          functions: 80,
          statements: 80,
        },
      },
    },
  },
});
