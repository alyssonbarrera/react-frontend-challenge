import { Link } from "@tanstack/react-router";
import { Button } from "@/core/components/ui/button";
import { ErrorState } from "../error-state";

type RouteErrorFallbackProps = {
	title?: string;
	description?: string;
	onRetry?: VoidFunction;
};

export function RouteErrorFallback({
	title = "The projector just gave out.",
	description = "An unexpected error broke this page mid-reel. Our team has been notified — try refreshing, or head back to safer ground while we patch things up.",
	onRetry,
}: RouteErrorFallbackProps) {
	function handleReload() {
		if (onRetry) {
			onRetry();
			return;
		}
		window.location.reload();
	}

	return (
		<ErrorState
			variant="error"
			title={title}
			description={description}
			containerTestId="route-error-fallback"
			titleTestId="route-error-title"
			descriptionTestId="route-error-description"
			actions={
				<>
					<Button
						type="button"
						size="lg"
						onClick={handleReload}
						data-testid="route-error-retry"
					>
						Try again
					</Button>
					<Button asChild size="lg" variant="outline">
						<Link to="/discovery" data-testid="route-error-suggestion-discover">
							Go to Discover
						</Link>
					</Button>
				</>
			}
		/>
	);
}
