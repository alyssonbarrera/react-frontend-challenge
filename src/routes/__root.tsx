import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
} from "@tanstack/react-router";
import { lazy, useEffect } from "react";
import { RouteErrorFallback } from "@/core/components/route-error-fallback";
import { Toaster } from "@/core/components/ui/sonner";
import { useThemeStore } from "@/core/stores/theme-store";

const Devtools = import.meta.env.DEV
	? lazy(() =>
			import("@tanstack/react-devtools").then(async (mod) => {
				const { TanStackRouterDevtoolsPanel } = await import(
					"@tanstack/react-router-devtools"
				);

				return {
					default: () => (
						<mod.TanStackDevtools
							config={{ position: "bottom-right" }}
							plugins={[
								{
									name: "TanStack Router",
									render: <TanStackRouterDevtoolsPanel />,
								},
							]}
						/>
					),
				};
			}),
		)
	: null;

import "../styles.css";

type RootRouteContext = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RootRouteContext>()({
	head: () => ({
		meta: [{ title: "CineDash" }],
	}),
	component: RootComponent,
	errorComponent: () => (
		<RouteErrorFallback description="An unexpected error occurred. Please reload the page." />
	),
});

function RootComponent() {
	const theme = useThemeStore((state) => state.theme);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		document.documentElement.style.colorScheme = theme;
	}, [theme]);

	return (
		<>
			<HeadContent />
			<Outlet />
			<Toaster position="top-right" richColors />
			{Devtools && <Devtools />}
		</>
	);
}
