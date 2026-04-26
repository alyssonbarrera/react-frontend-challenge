import { MovieCard } from "@/modules/discovery/components/movie-card";
import { useMovieDetailRelated } from "./movie-detail-related.hook";
import { MovieDetailRelatedError } from "./movie-detail-related-error";
import { MovieDetailRelatedSkeleton } from "./movie-detail-related-skeleton";

export function MovieDetailRelated() {
	const { related, isError, isLoading } = useMovieDetailRelated();

	if (isError) {
		return <MovieDetailRelatedError />;
	}

	if (isLoading) {
		return <MovieDetailRelatedSkeleton />;
	}

	if (related.length === 0) {
		return null;
	}

	return (
		<section
			className="flex flex-col gap-5 px-10 pb-15"
			data-testid="movie-detail-related"
		>
			<header
				className="flex items-end justify-between gap-4"
				data-testid="movie-detail-related-header"
			>
				<div className="flex flex-col gap-1.5">
					<span
						className="font-heading font-semibold text-[11px] text-accent-cyan uppercase tracking-[0.18em]"
						data-testid="movie-detail-related-eyebrow"
					>
						You might also like
					</span>
					<h2
						className="font-heading font-semibold text-[24px] text-foreground"
						data-testid="movie-detail-related-title"
					>
						Related films
					</h2>
				</div>
			</header>

			<div
				className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4"
				data-testid="movie-detail-related-grid"
			>
				{related.map((movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</div>
		</section>
	);
}
