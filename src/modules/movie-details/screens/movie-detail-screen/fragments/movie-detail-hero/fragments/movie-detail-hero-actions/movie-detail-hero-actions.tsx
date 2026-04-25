import { Bookmark, Play } from "lucide-react";

import { Button } from "@/core/components/ui/button";

type MovieDetailHeroActionsProps = {
	onPlayTrailer: VoidFunction;
	onAddToWatchlist: VoidFunction;
};

export function MovieDetailHeroActions({
	onPlayTrailer,
	onAddToWatchlist,
}: MovieDetailHeroActionsProps) {
	return (
		<div
			className="flex flex-wrap items-center gap-2.5 pt-3"
			data-testid="movie-detail-hero-actions"
		>
			<Button
				type="button"
				onClick={onPlayTrailer}
				className="gap-2.5 bg-accent-cyan px-5.5 py-3.5 font-heading font-bold text-[14px] text-surface-base hover:bg-accent-cyan-hover"
				data-testid="movie-detail-hero-actions-play"
			>
				<Play className="size-3.5 fill-current" />
				Watch trailer
			</Button>
			<Button
				type="button"
				onClick={onAddToWatchlist}
				className="gap-2.5 border-white/15 bg-white/5 px-5.5 py-3.5 font-heading font-semibold text-[14px] text-foreground hover:bg-white/10"
				data-testid="movie-detail-hero-actions-watchlist"
			>
				<Bookmark className="size-3.5" />
				Add to watchlist
			</Button>
		</div>
	);
}
