import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { RouteErrorFallback } from "@/core/components/route-error-fallback";
import { Toaster } from "@/core/components/ui/sonner";
import { useThemeStore } from "@/core/stores/theme-store";

import "../styles.css";

export const Route = createRootRoute({
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
			<Outlet />
			<Toaster position="top-right" richColors />
			{import.meta.env.DEV && (
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "TanStack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
			)}
		</>
	);
}
