import { useMovieDetailsPrefetchIntent } from "@/core/hooks/use-movie-details-prefetch-intent";

type UseWatchlistTablePlayButtonParams = {
	movieId: number;
	onPlayMovie: (movieId: number) => void;
};

export function useWatchlistTablePlayButton({
	movieId,
	onPlayMovie,
}: UseWatchlistTablePlayButtonParams) {
	const {
		handleMovieMouseEnterIntentPrefetch,
		handleMovieMouseLeaveIntentPrefetch,
		handleMovieFocusIntentPrefetch,
		handleMovieTouchStartIntentPrefetch,
	} = useMovieDetailsPrefetchIntent();

	function handleMouseEnter() {
		handleMovieMouseEnterIntentPrefetch(movieId);
	}

	function handleMouseLeave() {
		handleMovieMouseLeaveIntentPrefetch(movieId);
	}

	function handleFocus() {
		handleMovieFocusIntentPrefetch(movieId);
	}

	function handleTouchStart() {
		handleMovieTouchStartIntentPrefetch(movieId);
	}

	function handleClick() {
		onPlayMovie(movieId);
	}

	return {
		handleMouseEnter,
		handleMouseLeave,
		handleFocus,
		handleTouchStart,
		handleClick,
	};
}
