import type { MouseEvent } from "react";
import type { Movie } from "@/modules/discovery/dtos/movie";
import { useWatchlistStore } from "../../stores/watchlist-store";

type UseWatchlistToggleButtonParams = {
	movie: Movie;
};

export function useWatchlistToggleButton({
	movie,
}: UseWatchlistToggleButtonParams) {
	const isInWatchlist = useWatchlistStore((state) =>
		state.isInWatchlist(movie.id),
	);
	const toggle = useWatchlistStore((state) => state.toggle);

	const ariaLabel = isInWatchlist
		? `Remove ${movie.title} from watchlist`
		: `Save ${movie.title} to watchlist`;

	function handleClick(event: MouseEvent<HTMLButtonElement>) {
		event.stopPropagation();
		toggle(movie);
	}

	return {
		isInWatchlist,
		ariaLabel,
		handleClick,
	};
}
