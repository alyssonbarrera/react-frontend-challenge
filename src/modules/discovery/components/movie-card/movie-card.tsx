import { Star } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import { MoviePosterPlaceholder } from "@/core/components/movie-poster-placeholder";
import { WatchlistToggleButton } from "@/modules/watchlist/components/watchlist-toggle-button";
import type { Movie } from "../../dtos/movie";
import { useMovieCard } from "./movie-card.hook";
import { MovieCardError } from "./movie-card-error";

type MovieCardProps = {
	movie: Movie;
};

function MovieCardView({ movie }: MovieCardProps) {
	const {
		posterUrl,
		formattedYear,
		formattedGenre,
		formattedRating,
		handleCardFocus,
		handleCardKeyDown,
		handleCardMouseEnter,
		handleCardMouseLeave,
		handleNavigateToDetails,
	} = useMovieCard({ movie });

	const shouldRenderPosterImage = !!posterUrl;

	return (
		<div
			className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card cursor-pointer"
			data-testid="movie-card"
			onFocus={handleCardFocus}
			onClick={handleNavigateToDetails}
			onKeyDown={handleCardKeyDown}
			onMouseEnter={handleCardMouseEnter}
			onMouseLeave={handleCardMouseLeave}
			role="button"
			tabIndex={0}
		>
			<div
				className="relative aspect-268/380 w-full overflow-hidden bg-muted"
				data-testid="movie-card-poster"
			>
				{shouldRenderPosterImage && (
					<img
						src={posterUrl}
						alt={movie.title}
						className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>
				)}

				{!shouldRenderPosterImage && <MoviePosterPlaceholder />}

				<div
					className="absolute top-3.5 left-3.5 flex items-center gap-1 rounded-lg border border-white/10 bg-surface-base/90 px-2.5 py-1"
					data-testid="movie-card-rating"
				>
					<Star className="size-3 fill-accent-amber text-accent-amber" />
					<span className="font-semibold text-xs text-accent-amber">
						{formattedRating}
					</span>
				</div>

				<WatchlistToggleButton
					className="absolute top-3.5 right-3.5"
					movie={movie}
					variant="icon"
				/>
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
		</div>
	);
}

export function MovieCard({ movie }: MovieCardProps) {
	return (
		<ErrorBoundary
			fallbackRender={({ resetErrorBoundary }) => (
				<MovieCardError onRetry={resetErrorBoundary} />
			)}
		>
			<MovieCardView movie={movie} />
		</ErrorBoundary>
	);
}
