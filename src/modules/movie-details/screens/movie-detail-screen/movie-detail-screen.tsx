import { MovieDetailBody } from "./fragments/movie-detail-body";
import { MovieDetailHero } from "./fragments/movie-detail-hero";
import { MovieDetailRelated } from "./fragments/movie-detail-related";

type MovieDetailScreenProps = {
	id: string;
};

export function MovieDetailScreen({ id }: MovieDetailScreenProps) {
	return (
		<div className="flex flex-col" data-testid="movie-detail-screen">
			<MovieDetailHero id={id} />
			<MovieDetailBody id={id} />
			<MovieDetailRelated id={id} />
		</div>
	);
}
