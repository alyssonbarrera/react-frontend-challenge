import { MovieCard } from "@/modules/discovery/components/movie-card";
import { useMovieDetailRelated } from "./movie-detail-related.hook";
import { MovieDetailRelatedError } from "./movie-detail-related-error";
import {
	MovieDetailRelatedShellEyebrow,
	MovieDetailRelatedShellGrid,
	MovieDetailRelatedShellHeader,
	MovieDetailRelatedShellHeaderContent,
	MovieDetailRelatedShellRoot,
	MovieDetailRelatedShellTitle,
} from "./movie-detail-related-shell";
import { MovieDetailRelatedSkeleton } from "./movie-detail-related-skeleton";

export function MovieDetailRelated() {
	const { retry, related, isError, isLoading } = useMovieDetailRelated();

	if (isError) {
		return <MovieDetailRelatedError onRetry={retry} />;
	}

	if (isLoading) {
		return <MovieDetailRelatedSkeleton />;
	}

	if (related.length === 0) {
		return null;
	}

	return (
		<MovieDetailRelatedShellRoot data-testid="movie-detail-related">
			<MovieDetailRelatedShellHeader data-testid="movie-detail-related-header">
				<MovieDetailRelatedShellHeaderContent>
					<MovieDetailRelatedShellEyebrow data-testid="movie-detail-related-eyebrow">
						You might also like
					</MovieDetailRelatedShellEyebrow>
					<MovieDetailRelatedShellTitle data-testid="movie-detail-related-title">
						Related films
					</MovieDetailRelatedShellTitle>
				</MovieDetailRelatedShellHeaderContent>
			</MovieDetailRelatedShellHeader>

			<MovieDetailRelatedShellGrid data-testid="movie-detail-related-grid">
				{related.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</MovieDetailRelatedShellGrid>
		</MovieDetailRelatedShellRoot>
	);
}
