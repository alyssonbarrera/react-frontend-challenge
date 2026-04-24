import { AlertTriangle } from "lucide-react";
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "@/core/components/ui/alert";
import { Button } from "@/core/components/ui/button";

type RouteErrorFallbackProps = {
	title?: string;
	description?: string;
	onRetry?: VoidFunction;
};

export function RouteErrorFallback({
	title = "Something went wrong",
	description = "An unexpected error occurred while rendering this page.",
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
		<div
			className="flex flex-1 items-center justify-center p-4 md:p-6"
			data-testid="route-error-fallback"
		>
			<Alert variant="destructive" className="max-w-lg">
				<AlertTriangle />
				<AlertTitle>{title}</AlertTitle>
				<AlertDescription className="flex flex-col gap-3">
					<span>{description}</span>

					<Button
						type="button"
						size="sm"
						variant="outline"
						onClick={handleReload}
						data-testid="route-error-retry"
					>
						Try again
					</Button>
				</AlertDescription>
			</Alert>
		</div>
	);
}
