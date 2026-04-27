import { ErrorBoundary } from "react-error-boundary";
import { AsyncState } from "@/core/components/async-state";
import { Progress } from "@/core/components/ui/progress";
import {
	MovieDetailSectionShellContent,
	MovieDetailSectionShellLabel,
	MovieDetailSectionShellRoot,
} from "../movie-detail-section-shell";
import { useMovieDetailAudienceScore } from "./movie-detail-audience-score.hook";
import { MovieDetailAudienceScoreError } from "./movie-detail-audience-score-error";
import { MovieDetailAudienceScoreSkeleton } from "./movie-detail-audience-score-skeleton";

function MovieDetailAudienceScoreView() {
	const {
		isError,
		isLoading,
		hasAudienceData,
		formattedScore,
		formattedVotes,
		scorePercentage,
		formattedScoreMax,
		retryAudienceScore,
	} = useMovieDetailAudienceScore();

	return (
		<AsyncState
			errorComponent={
				<MovieDetailAudienceScoreError onRetry={retryAudienceScore} />
			}
			emptyComponent={null}
			isEmpty={!hasAudienceData}
			isError={isError}
			isLoading={isLoading}
			loadingComponent={<MovieDetailAudienceScoreSkeleton />}
		>
			<MovieDetailSectionShellRoot
				className="gap-4 rounded-[18px] border border-border bg-card p-6"
				data-testid="movie-detail-audience-score"
			>
				<MovieDetailSectionShellLabel data-testid="movie-detail-audience-score-label">
					Audience Score
				</MovieDetailSectionShellLabel>
				<MovieDetailSectionShellContent className="space-y-4">
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
				</MovieDetailSectionShellContent>
			</MovieDetailSectionShellRoot>
		</AsyncState>
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
