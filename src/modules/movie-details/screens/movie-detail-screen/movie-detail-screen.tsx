import { MovieDetailBody } from "../../components/movie-detail-body";
import { MovieDetailHero } from "../../components/movie-detail-hero";
import { MovieDetailRelated } from "../../components/movie-detail-related";

export function MovieDetailScreen() {
	return (
		<div className="relative flex flex-col" data-testid="movie-detail-screen">
			<MovieDetailHero />
			<MovieDetailBody />
			<MovieDetailRelated />
		</div>
	);
}
