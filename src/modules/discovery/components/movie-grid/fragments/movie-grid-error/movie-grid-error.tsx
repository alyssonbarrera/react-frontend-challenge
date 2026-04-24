import { AlertTriangle } from "lucide-react";
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "@/core/components/ui/alert";
import { Button } from "@/core/components/ui/button";

type MovieGridErrorProps = {
	isRetrying: boolean;
	onRetry: VoidFunction;
};

export function MovieGridError({ isRetrying, onRetry }: MovieGridErrorProps) {
	return (
		<Alert variant="destructive" data-testid="movie-grid-error">
			<AlertTriangle />
			<AlertTitle>We couldn't load movies right now.</AlertTitle>
			<AlertDescription className="flex flex-col gap-3">
				<span>Check your connection or try again in a moment.</span>
				<div>
					<Button
						type="button"
						size="sm"
						variant="outline"
						onClick={onRetry}
						disabled={isRetrying}
						data-testid="movie-grid-retry"
					>
						Try again
					</Button>
				</div>
			</AlertDescription>
		</Alert>
	);
}
