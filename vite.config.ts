import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackRouter } from "@tanstack/router-plugin/vite";

import viteReact from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

function preloadFonts(): Plugin {
	let fontUrls: string[] = [];

	return {
		name: "preload-fonts",
		apply: "build",
		generateBundle(_, bundle) {
			fontUrls = Object.keys(bundle)
				.filter((fileName) =>
					/geist-latin-wght-normal-[^/]+\.woff2$/.test(fileName),
				)
				.map((fileName) => `/${fileName}`);
		},
		transformIndexHtml: {
			order: "post",
			handler(html) {
				if (fontUrls.length === 0) return html;

				const tags = fontUrls
					.map(
						(href) =>
							`<link rel="preload" href="${href}" as="font" type="font/woff2" crossorigin>`,
					)
					.join("\n  ");

				return html.replace("</head>", `  ${tags}\n</head>`);
			},
		},
	};
}

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
		preloadFonts(),
	],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (!id.includes("node_modules")) return;

					if (
						id.includes("/react/") ||
						id.includes("/react-dom/") ||
						id.includes("/scheduler/")
					) {
						return "vendor-react";
					}

					if (id.includes("/@tanstack/")) return "vendor-tanstack";

					if (id.includes("/radix-ui/") || id.includes("/@radix-ui/")) {
						return "vendor-radix";
					}

					if (
						id.includes("/react-hook-form/") ||
						id.includes("/@hookform/") ||
						id.includes("/zod/")
					) {
						return "vendor-forms";
					}

					if (
						id.includes("/react-virtuoso/") ||
						id.includes("/sonner/") ||
						id.includes("/lucide-react/")
					) {
						return "vendor-ui";
					}
				},
			},
		},
	},
}));

export default config;
