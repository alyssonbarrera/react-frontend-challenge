import { VideoOff } from "lucide-react";
import {
	CompactError,
	CompactErrorContent,
	CompactErrorDescription,
	CompactErrorIcon,
	CompactErrorLabel,
	CompactErrorRetryButton,
	CompactErrorTitle,
} from "@/core/components/compact-error";

type MovieDetailTrailerErrorProps = {
	onRetry: VoidFunction;
};

export function MovieDetailTrailerError({
	onRetry,
}: MovieDetailTrailerErrorProps) {
	return (
		<section
			className="flex aspect-880/440 w-full flex-col items-center justify-center gap-4.5 rounded-[18px] border border-border bg-card px-8 py-7"
			data-testid="movie-detail-trailer-error"
		>
			<CompactError>
				<CompactErrorIcon icon={VideoOff} />

				<CompactErrorContent className="max-w-105">
					<CompactErrorLabel data-testid="movie-detail-trailer-error-eyebrow">
						Trailer unavailable
					</CompactErrorLabel>
					<CompactErrorTitle
						className="font-heading font-bold text-[20px] tracking-[-0.02em]"
						data-testid="movie-detail-trailer-error-title"
					>
						Couldn't load trailer
					</CompactErrorTitle>
					<CompactErrorDescription data-testid="movie-detail-trailer-error-description">
						The trailer stream couldn't be reached. Check your connection and
						try again in a moment.
					</CompactErrorDescription>
				</CompactErrorContent>

				<CompactErrorRetryButton
					data-testid="movie-detail-trailer-error-retry"
					onClick={onRetry}
				>
					Try again
				</CompactErrorRetryButton>
			</CompactError>
		</section>
	);
}
