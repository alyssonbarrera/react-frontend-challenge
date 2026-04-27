import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackRouter } from "@tanstack/router-plugin/vite";

import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const config = defineConfig(({ mode }) => ({
	resolve: { tsconfigPaths: true },
	plugins: [
		mode === "development" ? devtools() : null,
		tailwindcss(),
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
			generatedRouteTree: "./src/route-tree.gen.ts",
		}),
		viteReact(),
	],
}));

export default config;
