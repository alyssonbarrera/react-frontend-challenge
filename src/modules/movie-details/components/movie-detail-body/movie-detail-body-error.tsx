import { MovieDetailAudienceScoreError } from "./fragments/movie-detail-audience-score/movie-detail-audience-score-error";
import { MovieDetailCastError } from "./fragments/movie-detail-cast/movie-detail-cast-error";
import { MovieDetailKeyCrewError } from "./fragments/movie-detail-key-crew/movie-detail-key-crew-error";
import { MovieDetailSynopsisError } from "./fragments/movie-detail-synopsis/movie-detail-synopsis-error";
import { MovieDetailTrailerError } from "./fragments/movie-detail-trailer/movie-detail-trailer-error";
import { MovieDetailWhereToWatchError } from "./fragments/movie-detail-where-to-watch/movie-detail-where-to-watch-error";
import {
	MovieDetailBodyShellLeft,
	MovieDetailBodyShellRight,
	MovieDetailBodyShellRoot,
} from "./movie-detail-body-shell";

type MovieDetailBodyErrorProps = {
	onRetry?: VoidFunction;
};

export function MovieDetailBodyError({
	onRetry = () => undefined,
}: MovieDetailBodyErrorProps) {
	return (
		<MovieDetailBodyShellRoot data-testid="movie-detail-body-error">
			<MovieDetailBodyShellLeft data-testid="movie-detail-body-error-left">
				<MovieDetailSynopsisError />
				<MovieDetailCastError />
				<MovieDetailTrailerError onRetry={onRetry} />
			</MovieDetailBodyShellLeft>

			<MovieDetailBodyShellRight
				className="lg:sticky lg:top-6 lg:self-start"
				data-testid="movie-detail-body-error-right"
			>
				<MovieDetailAudienceScoreError onRetry={onRetry} />
				<MovieDetailKeyCrewError onRetry={onRetry} />
				<MovieDetailWhereToWatchError onRetry={onRetry} />
			</MovieDetailBodyShellRight>
		</MovieDetailBodyShellRoot>
	);
}
