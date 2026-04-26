import { Tv } from "lucide-react";
import {
	CompactError,
	CompactErrorContent,
	CompactErrorDescription,
	CompactErrorIcon,
	CompactErrorRetryButton,
	CompactErrorTitle,
} from "@/core/components/compact-error";
import { MovieDetailSectionLabel } from "../movie-detail-section-label";

type MovieDetailWhereToWatchErrorProps = {
	onRetry: VoidFunction;
};

export function MovieDetailWhereToWatchError({
	onRetry,
}: MovieDetailWhereToWatchErrorProps) {
	return (
		<section
			className="flex flex-col gap-4 rounded-[18px] border border-border bg-card p-6"
			data-testid="movie-detail-where-to-watch-error"
		>
			<MovieDetailSectionLabel>Where to Watch</MovieDetailSectionLabel>

			<CompactError className="px-3 pt-2 pb-3">
				<CompactErrorIcon icon={Tv} />

				<CompactErrorContent>
					<CompactErrorTitle data-testid="movie-detail-where-to-watch-error-title">
						Couldn't load watch providers
					</CompactErrorTitle>
					<CompactErrorDescription>
						Streaming options are temporarily unavailable. Try again in a
						moment.
					</CompactErrorDescription>
				</CompactErrorContent>

				<CompactErrorRetryButton
					data-testid="movie-detail-where-to-watch-error-retry"
					onClick={onRetry}
				>
					Try again
				</CompactErrorRetryButton>
			</CompactError>
		</section>
	);
}
