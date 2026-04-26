/** biome-ignore-all lint/style/noNonNullAssertion: I know the element exists. */
import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { NuqsAdapter } from "nuqs/adapters/tanstack-router";
import ReactDOM from "react-dom/client";
import { NotFound } from "./core/components/not-found";
import { TooltipProvider } from "./core/components/ui/tooltip";
import { queryClient } from "./core/lib/react-query";
import { THEME_STORAGE_KEY, type Theme } from "./core/stores/theme-store";
import { routeTree } from "./route-tree.gen";

const theme: Theme = (() => {
	try {
		const persistedThemeRaw = localStorage.getItem(THEME_STORAGE_KEY);

		if (!persistedThemeRaw) return "dark";

		const persistedThemeData = JSON.parse(persistedThemeRaw) as {
			state?: { theme?: Theme };
		};

		return persistedThemeData.state?.theme === "light" ? "light" : "dark";
	} catch {
		return "dark";
	}
})();

document.documentElement.classList.toggle("dark", theme === "dark");
document.documentElement.style.colorScheme = theme;

const router = createRouter({
	routeTree,
	context: { queryClient },
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultNotFoundComponent: () => <NotFound />,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<NuqsAdapter>
			<QueryClientProvider client={queryClient}>
				<TooltipProvider>
					<RouterProvider router={router} />
				</TooltipProvider>
			</QueryClientProvider>
		</NuqsAdapter>,
	);
}
