import { MovieDetailAudienceScoreError } from "./fragments/movie-detail-audience-score/movie-detail-audience-score-error";
import { MovieDetailCastError } from "./fragments/movie-detail-cast/movie-detail-cast-error";
import { MovieDetailKeyCrewError } from "./fragments/movie-detail-key-crew/movie-detail-key-crew-error";
import { MovieDetailSynopsisError } from "./fragments/movie-detail-synopsis/movie-detail-synopsis-error";
import { MovieDetailTrailerError } from "./fragments/movie-detail-trailer/movie-detail-trailer-error";
import { MovieDetailWhereToWatchError } from "./fragments/movie-detail-where-to-watch/movie-detail-where-to-watch-error";

type MovieDetailBodyErrorProps = {
	onRetry?: VoidFunction;
};

export function MovieDetailBodyError({
	onRetry = () => undefined,
}: MovieDetailBodyErrorProps) {
	return (
		<section
			className="flex flex-col gap-8 px-10 pt-10 pb-15 lg:flex-row"
			data-testid="movie-detail-body-error"
		>
			<div
				className="flex min-w-0 flex-1 flex-col gap-8"
				data-testid="movie-detail-body-error-left"
			>
				<MovieDetailSynopsisError />
				<MovieDetailCastError />
				<MovieDetailTrailerError onRetry={onRetry} />
			</div>

			<aside
				className="flex w-full shrink-0 flex-col gap-6 lg:sticky lg:top-6 lg:w-md lg:self-start"
				data-testid="movie-detail-body-error-right"
			>
				<MovieDetailAudienceScoreError onRetry={onRetry} />
				<MovieDetailKeyCrewError onRetry={onRetry} />
				<MovieDetailWhereToWatchError onRetry={onRetry} />
			</aside>
		</section>
	);
}
