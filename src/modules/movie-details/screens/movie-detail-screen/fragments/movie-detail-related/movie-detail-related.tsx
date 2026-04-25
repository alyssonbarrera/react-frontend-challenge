import { MovieCard } from "@/modules/discovery/components/movie-card";
import { useMovieDetailRelated } from "./movie-detail-related.hook";

type MovieDetailRelatedProps = {
	id: string;
};

export function MovieDetailRelated({ id }: MovieDetailRelatedProps) {
	const { related, handleBrowseAll } = useMovieDetailRelated({ id });

	return (
		<section
			className="flex flex-col gap-5 px-10 pt-5 pb-15"
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
				<button
					type="button"
					onClick={handleBrowseAll}
					className="text-[13px] text-secondary transition hover:text-foreground"
					data-testid="movie-detail-related-browse-all"
				>
					Browse all →
				</button>
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
