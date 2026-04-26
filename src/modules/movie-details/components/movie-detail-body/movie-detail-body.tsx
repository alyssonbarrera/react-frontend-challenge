import { ErrorBoundary } from "react-error-boundary";
import { MovieDetailAudienceScore } from "./fragments/movie-detail-audience-score";
import { MovieDetailCast } from "./fragments/movie-detail-cast";
import { MovieDetailKeyCrew } from "./fragments/movie-detail-key-crew";
import { MovieDetailSynopsis } from "./fragments/movie-detail-synopsis";
import { MovieDetailTrailer } from "./fragments/movie-detail-trailer";
import { MovieDetailWhereToWatch } from "./fragments/movie-detail-where-to-watch";
import { useMovieDetailBody } from "./movie-detail-body.hook";
import { MovieDetailBodyError } from "./movie-detail-body-error";

function MovieDetailBodyView() {
	const { body, isError, isKeyCrewError, isLoading, retryKeyCrew } =
		useMovieDetailBody();

	return (
		<section
			className="flex flex-col gap-8 px-10 pt-10 pb-15 lg:flex-row"
			data-testid="movie-detail-body"
		>
			<div
				className="flex min-w-0 flex-1 flex-col gap-8"
				data-testid="movie-detail-body-left"
			>
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
			</div>

			<aside
				className="flex w-full shrink-0 flex-col gap-6 lg:sticky lg:top-6 lg:w-md lg:self-start"
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
			</aside>
		</section>
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
