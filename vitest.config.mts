import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

const isCI = process.env.CI === "true";

export default defineConfig({
	resolve: {
		alias: {
			"@": resolve(import.meta.dirname, "./src"),
			"@tests": resolve(import.meta.dirname, "./tests"),
		},
	},
	test: {
		silent: isCI,
		globals: true,
		testTimeout: 10_000,
		typecheck: { enabled: true },
		bail: isCI ? 1 : 0,
		clearMocks: true,
		exclude: ["**/node_modules/**", "**/dist/**"],
		setupFiles: ["tests/setup-tests.ts"],
		environment: "jsdom",
		coverage: {
			provider: "v8",
			include: ["src/**"],
			exclude: [
				"src/main.tsx",
				"src/tests/**",
				"src/infra/**",
				"src/@types/**",
				"src/routes/**",
				"src/**/dtos/**",
				"src/**/types/**",
				"src/**/index.ts",
				"src/core/lib/**",
				"src/route-tree.gen.ts",
				"src/core/components/ui/**",
			],
			reporter: ["text", "text-summary", "html"],
		},
	},
});
