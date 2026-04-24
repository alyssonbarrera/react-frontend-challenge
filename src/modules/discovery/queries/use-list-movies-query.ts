import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useDiscoveryFilters } from "../hooks/use-discovery-filters";
import { useDiscoverySearch } from "../hooks/use-discovery-search";
import { discoverMoviesRequest } from "../http/discover-movies-request";
import { searchMoviesRequest } from "../http/search-movies-request";
import type { DiscoveryFilters } from "../types/discovery-filters";

export const LIST_MOVIES_QUERY_KEY = "list-movies";

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
		queryKey: [LIST_MOVIES_QUERY_KEY, queryParams],
		queryFn: buildQueryFn(queryParams),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage.page >= lastPage.totalPages) {
				return undefined;
			}

			return lastPage.page + 1;
		},
		staleTime: 1000 * 60 * 5,
	});

	const movies = useMemo(
		() => query.data?.pages.flatMap((page) => page.results) ?? [],
		[query.data],
	);

	return {
		...query,
		movies,
		searchQuery: trimmedSearch,
		isSearching: queryParams.mode === "search",
	};
}
