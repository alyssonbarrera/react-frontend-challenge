import { Play } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { useWatchlistTablePlayButton } from "./watchlist-table-play-button.hook";

type WatchlistTablePlayButtonProps = {
	movieId: number;
	movieTitle: string;
	onPlayMovie: (movieId: number) => void;
};

export function WatchlistTablePlayButton({
	movieId,
	movieTitle,
	onPlayMovie,
}: WatchlistTablePlayButtonProps) {
	const {
		handleMouseEnter,
		handleMouseLeave,
		handleFocus,
		handleTouchStart,
		handleClick,
	} = useWatchlistTablePlayButton({
		movieId,
		onPlayMovie,
	});

	return (
		<Button
			type="button"
			size="icon"
			variant="outline"
			className="size-8 rounded-lg"
			aria-label={`Play ${movieTitle}`}
			data-testid="watchlist-table-row-play"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onFocus={handleFocus}
			onTouchStart={handleTouchStart}
			onClick={handleClick}
		>
			<Play className="size-3.5" />
		</Button>
	);
}
