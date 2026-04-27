import { NotFound } from "@/core/components/not-found";
import { MovieDetailBody } from "../../components/movie-detail-body";
import { MovieDetailHero } from "../../components/movie-detail-hero";
import { MovieDetailRelated } from "../../components/movie-detail-related";
import { isValidMovieIdParam } from "../../utils/movie-details.utils";

type MovieDetailScreenProps = {
	id: string;
};

export function MovieDetailScreen({ id }: MovieDetailScreenProps) {
	if (!isValidMovieIdParam(id)) {
		return (
			<NotFound
				title="This movie reel is missing."
				description="The movie ID in the URL is invalid. Pick another title from Discover to keep watching."
			/>
		);
	}

	return (
		<div className="relative flex flex-col" data-testid="movie-detail-screen">
			<MovieDetailHero />
			<MovieDetailBody />
			<MovieDetailRelated />
		</div>
	);
}
