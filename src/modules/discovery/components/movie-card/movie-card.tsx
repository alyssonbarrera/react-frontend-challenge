import { Bookmark, Star } from "lucide-react";
import type { MouseEvent } from "react";
import { ErrorBoundary } from "react-error-boundary";
import type { Movie } from "../../dtos/movie";
import { MovieCardErrorFallback } from "./fragments/movie-card-error-fallback";
import { useMovieCard } from "./movie-card.hook";

type MovieCardProps = {
	movie: Movie;
};

function MovieCardView({ movie }: MovieCardProps) {
	const {
		posterUrl,
		formattedYear,
		isInWatchlist,
		formattedGenre,
		formattedRating,
		handleToggleWatchlist,
		handleNavigateToDetails,
	} = useMovieCard({ movie });

	function handleBookmarkClick(event: MouseEvent<HTMLButtonElement>) {
		event.stopPropagation();
		handleToggleWatchlist();
	}

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: keyboard navigation is intentionally out of scope here
		<article
			className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
			data-testid="movie-card"
			onClick={handleNavigateToDetails}
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
					className="absolute top-3.5 left-3.5 flex items-center gap-1 rounded-lg border border-white/10 bg-surface-base/90 px-2.5 py-1"
					data-testid="movie-card-rating"
				>
					<Star className="size-3 fill-accent-amber text-accent-amber" />
					<span className="font-semibold text-xs text-accent-amber">
						{formattedRating}
					</span>
				</div>

				<button
					type="button"
					aria-label={
						isInWatchlist
							? `Remove ${movie.title} from watchlist`
							: `Save ${movie.title} to watchlist`
					}
					onClick={handleBookmarkClick}
					className="absolute top-3.5 right-3.5 flex size-9 items-center justify-center rounded-full border border-white/10 bg-surface-base/70 text-foreground opacity-80 transition hover:opacity-100"
					data-testid="movie-card-bookmark"
				>
					<Bookmark
						className={
							isInWatchlist ? "size-4 fill-primary text-primary" : "size-4"
						}
					/>
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
					<span className="text-secondary">{formattedGenre}</span>
					<span className="text-muted-foreground">·</span>
					<span className="text-secondary">{formattedYear}</span>
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
