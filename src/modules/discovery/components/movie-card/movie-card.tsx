import { Bookmark, Star } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import type { Movie } from "../../dtos/movie";
import { MovieCardErrorFallback } from "./fragments/movie-card-error-fallback";
import { useMovieCard } from "./movie-card.hook";

type MovieCardProps = {
	movie: Movie;
};

function MovieCardView({ movie }: MovieCardProps) {
	const { formattedRating, formattedYear, formattedGenre, posterUrl } =
		useMovieCard({ movie });

	return (
		<article
			className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
			data-testid="movie-card"
		>
			<div
				className="relative aspect-268/380 w-full overflow-hidden bg-muted"
				data-testid="movie-card-poster"
			>
				<img
					src={posterUrl}
					alt={movie.title}
					loading="lazy"
					className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>

				<div
					className="absolute top-3.5 left-3.5 flex items-center gap-1 rounded-lg border border-white/10 bg-black/90 px-2.5 py-1"
					data-testid="movie-card-rating"
				>
					<Star className="size-3 fill-amber-400 text-amber-400" />
					<span className="font-semibold text-[12px] text-amber-400">
						{formattedRating}
					</span>
				</div>

				<button
					type="button"
					aria-label={`Save ${movie.title} to watchlist`}
					tabIndex={-1}
					className="absolute top-3.5 right-3.5 flex size-9 items-center justify-center rounded-full border border-white/10 bg-black/70 text-foreground opacity-80 transition hover:opacity-100"
					data-testid="movie-card-bookmark"
				>
					<Bookmark className="size-4" />
				</button>
			</div>

			<div className="flex flex-col gap-2 px-4.5 pt-3.5 pb-4.5">
				<h3
					className="truncate font-heading font-semibold text-[17px] text-foreground tracking-tight"
					data-testid="movie-card-title"
				>
					{movie.title}
				</h3>
				<div
					className="flex items-center gap-2 text-[12px]"
					data-testid="movie-card-meta"
				>
					<span className="text-muted-foreground">{formattedGenre}</span>
					<span className="text-muted-foreground/60">·</span>
					<span className="text-muted-foreground">{formattedYear}</span>
				</div>
			</div>
		</article>
	);
}

export function MovieCard({ movie }: MovieCardProps) {
	return (
		<ErrorBoundary fallback={<MovieCardErrorFallback />}>
			<MovieCardView movie={movie} />
		</ErrorBoundary>
	);
}
