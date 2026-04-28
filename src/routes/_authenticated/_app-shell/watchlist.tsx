import { createFileRoute } from "@tanstack/react-router";
import { RouteErrorFallback } from "@/core/components/route-error-fallback";
import { WatchlistScreen } from "@/modules/watchlist/screens/watchlist-screen";

export const Route = createFileRoute("/_authenticated/_app-shell/watchlist")({
	head: () => ({
		meta: [{ title: "CineDash | Watchlist" }],
	}),
	component: WatchlistScreen,
	errorComponent: () => (
		<RouteErrorFallback
			title="We couldn't load your Watchlist"
			description="Something broke while rendering your saved films. Try again in a moment."
		/>
	),
});
