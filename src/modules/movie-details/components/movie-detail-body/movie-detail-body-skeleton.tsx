import { MovieDetailAudienceScoreSkeleton } from "./fragments/movie-detail-audience-score/movie-detail-audience-score-skeleton";
import { MovieDetailCastSkeleton } from "./fragments/movie-detail-cast/movie-detail-cast-skeleton";
import { MovieDetailKeyCrewSkeleton } from "./fragments/movie-detail-key-crew/movie-detail-key-crew-skeleton";
import { MovieDetailSynopsisSkeleton } from "./fragments/movie-detail-synopsis/movie-detail-synopsis-skeleton";
import { MovieDetailTrailerSkeleton } from "./fragments/movie-detail-trailer/movie-detail-trailer-skeleton";
import { MovieDetailWhereToWatchSkeleton } from "./fragments/movie-detail-where-to-watch/movie-detail-where-to-watch-skeleton";

export function MovieDetailBodySkeleton() {
	return (
		<section
			className="flex flex-col gap-8 px-10 pt-10 pb-15 lg:flex-row"
			data-testid="movie-detail-body-skeleton"
		>
			<div
				className="flex min-w-0 flex-1 flex-col gap-8"
				data-testid="movie-detail-body-skeleton-left"
			>
				<MovieDetailSynopsisSkeleton />
				<MovieDetailCastSkeleton />
				<MovieDetailTrailerSkeleton />
			</div>

			<aside
				className="flex w-full shrink-0 flex-col gap-6 lg:w-md"
				data-testid="movie-detail-body-skeleton-right"
			>
				<MovieDetailAudienceScoreSkeleton />
				<MovieDetailKeyCrewSkeleton />
				<MovieDetailWhereToWatchSkeleton />
			</aside>
		</section>
	);
}
