import { MovieDetailAudienceScoreSkeleton } from "./fragments/movie-detail-audience-score/movie-detail-audience-score-skeleton";
import { MovieDetailCastSkeleton } from "./fragments/movie-detail-cast/movie-detail-cast-skeleton";
import { MovieDetailKeyCrewSkeleton } from "./fragments/movie-detail-key-crew/movie-detail-key-crew-skeleton";
import { MovieDetailSynopsisSkeleton } from "./fragments/movie-detail-synopsis/movie-detail-synopsis-skeleton";
import { MovieDetailTrailerSkeleton } from "./fragments/movie-detail-trailer/movie-detail-trailer-skeleton";
import { MovieDetailWhereToWatchSkeleton } from "./fragments/movie-detail-where-to-watch/movie-detail-where-to-watch-skeleton";
import {
	MovieDetailBodyShellLeft,
	MovieDetailBodyShellRight,
	MovieDetailBodyShellRoot,
} from "./movie-detail-body-shell";

export function MovieDetailBodySkeleton() {
	return (
		<MovieDetailBodyShellRoot data-testid="movie-detail-body-skeleton">
			<MovieDetailBodyShellLeft data-testid="movie-detail-body-skeleton-left">
				<MovieDetailSynopsisSkeleton />
				<MovieDetailCastSkeleton />
				<MovieDetailTrailerSkeleton />
			</MovieDetailBodyShellLeft>

			<MovieDetailBodyShellRight
				className="lg:w-md"
				data-testid="movie-detail-body-skeleton-right"
			>
				<MovieDetailAudienceScoreSkeleton />
				<MovieDetailKeyCrewSkeleton />
				<MovieDetailWhereToWatchSkeleton />
			</MovieDetailBodyShellRight>
		</MovieDetailBodyShellRoot>
	);
}
