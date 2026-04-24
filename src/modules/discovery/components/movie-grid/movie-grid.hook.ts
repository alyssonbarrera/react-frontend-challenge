import { useListMoviesQuery } from "../../queries/use-list-movies-query";

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
		isFetchingNextPage,
	};
}
