import { Play } from "lucide-react";

import { Button } from "@/core/components/ui/button";
import { Spinner } from "@/core/components/ui/spinner";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/core/components/ui/tooltip";
import type { Movie } from "@/modules/discovery/dtos/movie";
import { WatchlistToggleButton } from "@/modules/watchlist/components/watchlist-toggle-button";
import { useMovieDetailHeroActions } from "./movie-detail-hero-actions.hook";

type MovieDetailHeroActionsProps = {
	movie: Movie;
	variant?: "mobile" | "desktop";
	onPlayTrailer: VoidFunction;
};

export function MovieDetailHeroActions({
	movie,
	onPlayTrailer,
	variant = "desktop",
}: MovieDetailHeroActionsProps) {
	const { isWatchTrailerDisabled, isWatchTrailerLoading, hasNoTrailer } =
		useMovieDetailHeroActions();

	const watchTrailerButton = (
		<Button
			className="cursor-pointer gap-2.5 bg-accent-cyan px-5.5 py-3.5 font-heading font-bold text-[14px] text-surface-base hover:bg-accent-cyan-hover"
			data-testid={`movie-detail-hero-actions-play-${variant}`}
			disabled={isWatchTrailerDisabled}
			onClick={onPlayTrailer}
			type="button"
		>
			{isWatchTrailerLoading ? (
				<Spinner
					className="size-3.5"
					data-testid={`movie-detail-hero-actions-play-spinner-${variant}`}
				/>
			) : (
				<Play className="size-3.5 fill-current" />
			)}
			Watch trailer
		</Button>
	);

	return (
		<div
			className="flex flex-wrap items-center gap-2.5 pt-3"
			data-testid={`movie-detail-hero-actions-${variant}`}
		>
			{hasNoTrailer ? (
				<Tooltip>
					<TooltipTrigger asChild>
						<span>{watchTrailerButton}</span>
					</TooltipTrigger>
					<TooltipContent
						side="bottom"
						data-testid={`movie-detail-hero-actions-no-trailer-tooltip-${variant}`}
					>
						No trailer available for this movie.
					</TooltipContent>
				</Tooltip>
			) : (
				watchTrailerButton
			)}

			<WatchlistToggleButton movie={movie} variant="pill" />
		</div>
	);
}
