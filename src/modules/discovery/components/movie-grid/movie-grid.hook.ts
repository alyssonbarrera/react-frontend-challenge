import { useRef } from "react";
import type { ListRange } from "react-virtuoso";
import { useListMoviesQuery } from "../../queries/use-list-movies-query";

const restoredIndexCache = new Map<string, number>();

function buildCacheKey(searchQuery: string) {
	if (searchQuery) {
		return null;
	}

	return "discover";
}

export function useMovieGrid() {
	const {
		movies,
		refetch,
		isError,
		isPending,
		isFetching,
		hasNextPage,
		isSearching,
		searchQuery,
		fetchNextPage,
		isFetchingNextPage,
	} = useListMoviesQuery();

	const cacheKey = buildCacheKey(searchQuery);
	const restoredIndex = cacheKey ? (restoredIndexCache.get(cacheKey) ?? 0) : 0;
	const initialItemIndexRef = useRef(restoredIndex);
	const initialItemIndex = initialItemIndexRef.current;

	const totalCount = movies.length;
	const hasMovies = totalCount > 0;

	function handleEndReached() {
		if (!hasNextPage || isFetchingNextPage) {
			return;
		}

		fetchNextPage();
	}

	function handleRetry() {
		refetch();
	}

	function handleRangeChanged(range: ListRange) {
		if (!cacheKey) {
			return;
		}

		restoredIndexCache.set(cacheKey, Math.max(0, range.startIndex));
	}

	return {
		movies,
		isError,
		isPending,
		hasMovies,
		totalCount,
		isFetching,
		hasNextPage,
		isSearching,
		searchQuery,
		handleRetry,
		handleEndReached,
		initialItemIndex,
		handleRangeChanged,
		isFetchingNextPage,
	};
}
