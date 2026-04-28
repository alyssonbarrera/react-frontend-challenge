import { Film } from "lucide-react";
import {
	CompactError,
	CompactErrorContent,
	CompactErrorDescription,
	CompactErrorIcon,
	CompactErrorRetryButton,
	CompactErrorTitle,
} from "@/core/components/compact-error";

type MovieCardErrorProps = {
	onRetry: VoidFunction;
};

export function MovieCardError({ onRetry }: MovieCardErrorProps) {
	return (
		<article
			role="alert"
			className="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-border bg-card px-4 py-6"
		>
			<CompactError data-testid="movie-card-error">
				<CompactErrorIcon icon={Film} />

				<CompactErrorContent>
					<CompactErrorTitle data-testid="movie-card-error-title">
						Couldn't load movie
					</CompactErrorTitle>
					<CompactErrorDescription>
						This title is temporarily unavailable. Try again in a moment.
					</CompactErrorDescription>
				</CompactErrorContent>

				<CompactErrorRetryButton
					data-testid="movie-card-error-retry"
					onClick={onRetry}
				>
					Try again
				</CompactErrorRetryButton>
			</CompactError>
		</article>
	);
}
