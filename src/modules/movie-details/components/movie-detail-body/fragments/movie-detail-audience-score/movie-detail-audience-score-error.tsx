import { CloudOff } from "lucide-react";
import {
	CompactError,
	CompactErrorContent,
	CompactErrorDescription,
	CompactErrorIcon,
	CompactErrorRetryButton,
	CompactErrorTitle,
} from "@/core/components/compact-error";
import { MovieDetailSectionLabel } from "../movie-detail-section-label";

type MovieDetailAudienceScoreErrorProps = {
	onRetry: VoidFunction;
};

export function MovieDetailAudienceScoreError({
	onRetry,
}: MovieDetailAudienceScoreErrorProps) {
	return (
		<section
			className="flex flex-col gap-4 rounded-[18px] border border-border bg-card p-6"
			data-testid="movie-detail-audience-score-error"
		>
			<MovieDetailSectionLabel>Audience Score</MovieDetailSectionLabel>

			<CompactError className="px-3 pt-2 pb-3">
				<CompactErrorIcon icon={CloudOff} />

				<CompactErrorContent>
					<CompactErrorTitle data-testid="movie-detail-audience-score-error-title">
						Couldn't load score
					</CompactErrorTitle>
					<CompactErrorDescription>
						We couldn't reach the ratings service. Check your connection and try
						again.
					</CompactErrorDescription>
				</CompactErrorContent>

				<CompactErrorRetryButton
					data-testid="movie-detail-audience-score-error-retry"
					onClick={onRetry}
				>
					Try again
				</CompactErrorRetryButton>
			</CompactError>
		</section>
	);
}
