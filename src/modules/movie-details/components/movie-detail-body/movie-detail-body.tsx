import { ErrorBoundary } from "react-error-boundary";
import { MovieDetailAudienceScore } from "./fragments/movie-detail-audience-score";
import { MovieDetailCast } from "./fragments/movie-detail-cast";
import { MovieDetailKeyCrew } from "./fragments/movie-detail-key-crew";
import { MovieDetailSynopsis } from "./fragments/movie-detail-synopsis";
import { MovieDetailTrailer } from "./fragments/movie-detail-trailer";
import { MovieDetailWhereToWatch } from "./fragments/movie-detail-where-to-watch";
import { useMovieDetailBody } from "./movie-detail-body.hook";
import { MovieDetailBodyError } from "./movie-detail-body-error";
import {
	MovieDetailBodyShellLeft,
	MovieDetailBodyShellRight,
	MovieDetailBodyShellRoot,
} from "./movie-detail-body-shell";

function MovieDetailBodyView() {
	const { body, isError, isKeyCrewError, isLoading, retryKeyCrew } =
		useMovieDetailBody();

	return (
		<MovieDetailBodyShellRoot data-testid="movie-detail-body">
			<MovieDetailBodyShellLeft data-testid="movie-detail-body-left">
				<MovieDetailSynopsis
					synopsis={body?.synopsis}
					isLoading={isLoading}
					isError={isError}
				/>

				<MovieDetailCast
					cast={body?.cast}
					isLoading={isLoading}
					isError={isError}
				/>

				<MovieDetailTrailer />
			</MovieDetailBodyShellLeft>

			<MovieDetailBodyShellRight
				className="lg:sticky lg:top-6 lg:self-start"
				data-testid="movie-detail-body-right"
			>
				<MovieDetailAudienceScore />

				<MovieDetailKeyCrew
					crew={body?.keyCrew}
					isLoading={isLoading}
					isError={isKeyCrewError}
					onRetry={retryKeyCrew}
				/>

				<MovieDetailWhereToWatch />
			</MovieDetailBodyShellRight>
		</MovieDetailBodyShellRoot>
	);
}

export function MovieDetailBody() {
	return (
		<ErrorBoundary
			fallbackRender={({ resetErrorBoundary }) => (
				<MovieDetailBodyError onRetry={resetErrorBoundary} />
			)}
		>
			<MovieDetailBodyView />
		</ErrorBoundary>
	);
}
