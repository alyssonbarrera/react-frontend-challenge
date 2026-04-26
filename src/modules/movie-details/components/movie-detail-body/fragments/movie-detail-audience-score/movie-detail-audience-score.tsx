import { ErrorBoundary } from "react-error-boundary";
import { Progress } from "@/core/components/ui/progress";
import { MovieDetailSectionLabel } from "../movie-detail-section-label";
import { useMovieDetailAudienceScore } from "./movie-detail-audience-score.hook";
import { MovieDetailAudienceScoreError } from "./movie-detail-audience-score-error";

function MovieDetailAudienceScoreView() {
	const {
		isError,
		formattedScore,
		formattedVotes,
		scorePercentage,
		formattedScoreMax,
		retryAudienceScore,
	} = useMovieDetailAudienceScore();

	if (isError) {
		return <MovieDetailAudienceScoreError onRetry={retryAudienceScore} />;
	}

	return (
		<section
			className="flex flex-col gap-4 rounded-[18px] border border-border bg-card p-6"
			data-testid="movie-detail-audience-score"
		>
			<MovieDetailSectionLabel data-testid="movie-detail-audience-score-label">
				Audience Score
			</MovieDetailSectionLabel>

			<div
				className="flex items-baseline gap-2"
				data-testid="movie-detail-audience-score-headline"
			>
				<span className="font-heading font-semibold text-[44px] text-foreground leading-none">
					{formattedScore}
				</span>
				<span className="text-[15px] text-muted-foreground">
					{formattedScoreMax}
				</span>
				<span className="ml-auto text-[12px] text-muted-foreground">
					{formattedVotes}
				</span>
			</div>

			<Progress
				data-testid="movie-detail-audience-score-bar"
				value={scorePercentage}
			/>
		</section>
	);
}

export function MovieDetailAudienceScore() {
	return (
		<ErrorBoundary
			fallbackRender={({ resetErrorBoundary }) => (
				<MovieDetailAudienceScoreError onRetry={resetErrorBoundary} />
			)}
		>
			<MovieDetailAudienceScoreView />
		</ErrorBoundary>
	);
}
