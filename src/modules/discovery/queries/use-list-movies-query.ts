import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/core/constants/query-keys";
import type { Movie } from "../dtos/movie";
import { useDiscoveryFilters } from "../hooks/use-discovery-filters";
import { useDiscoverySearch } from "../hooks/use-discovery-search";
import { discoverMoviesRequest } from "../http/discover-movies-request";
import { searchMoviesRequest } from "../http/search-movies-request";
import type { DiscoveryFilters } from "../types/discovery-filters";

type ListMoviesQueryKeyParams =
	| { mode: "search"; query: string }
	| { mode: "discover"; filters: DiscoveryFilters };

function buildQueryFn(params: ListMoviesQueryKeyParams) {
	if (params.mode === "search") {
		return ({ pageParam }: { pageParam: number }) =>
			searchMoviesRequest({ query: params.query, page: pageParam });
	}

	return ({ pageParam }: { pageParam: number }) =>
		discoverMoviesRequest({ filters: params.filters, page: pageParam });
}

export function useListMoviesQuery() {
	const [filters] = useDiscoveryFilters();
	const [searchValue] = useDiscoverySearch();

	const trimmedSearch = searchValue.trim();
	const queryParams: ListMoviesQueryKeyParams = trimmedSearch
		? { mode: "search", query: trimmedSearch }
		: { mode: "discover", filters };

	const query = useInfiniteQuery({
		queryKey: queryKeys.discovery.listMovies(queryParams),
		queryFn: buildQueryFn(queryParams),
		select: (data) => ({
			...data,
			dedupedMovies: dedupeMoviesById(
				data.pages.flatMap((page) => page.results),
			),
		}),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage.page >= lastPage.totalPages) {
				return undefined;
			}

			return lastPage.page + 1;
		},
		staleTime: 1000 * 60 * 5,
	});

	const movies = query.data?.dedupedMovies ?? [];

	return {
		...query,
		movies,
		searchQuery: trimmedSearch,
		isSearching: queryParams.mode === "search",
	};
}

function dedupeMoviesById(movies: ReadonlyArray<Movie>): Movie[] {
	const uniqueMoviesById = new Map<number, Movie>();

	for (const movie of movies) {
		if (uniqueMoviesById.has(movie.id)) {
			continue;
		}

		uniqueMoviesById.set(movie.id, movie);
	}

	return Array.from(uniqueMoviesById.values());
}
