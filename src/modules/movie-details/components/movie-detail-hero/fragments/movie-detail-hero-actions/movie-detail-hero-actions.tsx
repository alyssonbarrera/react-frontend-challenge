import { Play } from "lucide-react";

import { Button } from "@/core/components/ui/button";
import type { Movie } from "@/modules/discovery/dtos/movie";
import { WatchlistToggleButton } from "@/modules/watchlist/components/watchlist-toggle-button";

type MovieDetailHeroActionsProps = {
	movie: Movie;
	onPlayTrailer: VoidFunction;
};

export function MovieDetailHeroActions({
	movie,
	onPlayTrailer,
}: MovieDetailHeroActionsProps) {
	return (
		<div
			className="flex flex-wrap items-center gap-2.5 pt-3"
			data-testid="movie-detail-hero-actions"
		>
			<Button
				className="gap-2.5 bg-accent-cyan px-5.5 py-3.5 font-heading font-bold text-[14px] text-surface-base hover:bg-accent-cyan-hover"
				data-testid="movie-detail-hero-actions-play"
				onClick={onPlayTrailer}
				type="button"
			>
				<Play className="size-3.5 fill-current" />
				Watch trailer
			</Button>
			<WatchlistToggleButton movie={movie} variant="pill" />
		</div>
	);
}
