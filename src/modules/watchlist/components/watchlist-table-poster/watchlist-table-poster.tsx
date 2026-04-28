import { ImageOff } from "lucide-react";
import { buildPosterUrl } from "@/modules/discovery/utils/movie.utils";

type WatchlistTablePosterProps = {
	posterPath: string | null;
	title: string;
};

export function WatchlistTablePoster({
	posterPath,
	title,
}: WatchlistTablePosterProps) {
	const posterUrl = buildPosterUrl(posterPath, "w185");

	if (!posterUrl) {
		return (
			<div
				className="flex h-14 w-10 shrink-0 items-center justify-center rounded-md bg-surface-elevated"
				data-testid="watchlist-table-row-poster-fallback"
			>
				<ImageOff className="size-4 text-muted-foreground" />
			</div>
		);
	}

	return (
		<img
			src={posterUrl}
			alt={title}
			loading="lazy"
			className="h-14 w-10 shrink-0 rounded-md object-cover"
			data-testid="watchlist-table-row-poster"
		/>
	);
}
