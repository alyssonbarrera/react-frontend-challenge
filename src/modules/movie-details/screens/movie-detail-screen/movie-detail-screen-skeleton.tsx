import { MovieDetailBodySkeleton } from "../../components/movie-detail-body/movie-detail-body-skeleton";
import { MovieDetailHeroSkeleton } from "../../components/movie-detail-hero/movie-detail-hero-skeleton";
import { MovieDetailRelatedSkeleton } from "../../components/movie-detail-related/movie-detail-related-skeleton";

export function MovieDetailScreenSkeleton() {
	return (
		<div
			className="relative flex flex-col"
			data-testid="movie-detail-screen-skeleton"
		>
			<MovieDetailHeroSkeleton />
			<MovieDetailBodySkeleton />
			<MovieDetailRelatedSkeleton />
		</div>
	);
}
