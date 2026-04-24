import { createFileRoute } from "@tanstack/react-router";
import { RouteErrorFallback } from "@/core/components/route-error-fallback";
import { DiscoveryScreen } from "@/modules/discovery/screens/discovery-screen";

export const Route = createFileRoute("/_authenticated/app")({
	component: DiscoveryScreen,
	errorComponent: () => (
		<RouteErrorFallback
			title="We couldn't load the Discovery page"
			description="Something broke while rendering your movies. Try again in a moment."
		/>
	),
});
