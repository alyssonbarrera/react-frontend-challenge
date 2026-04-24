import { api } from "@/infra/http/api-client";
import type {
	MoviesPage,
	TmdbMovieResponse,
	TmdbPaginatedResponse,
} from "../dtos/movie";
import type { DiscoveryFilters } from "../types/discovery-filters";
import { mapTmdbMovie } from "../utils/movie.utils";
import { buildDiscoverMoviesSearchParams } from "../utils/movie-search-params.utils";

export type DiscoverMoviesRequestParams = {
	page?: number;
	language?: string;
	filters: DiscoveryFilters;
};

export async function discoverMoviesRequest({
	filters,
	page = 1,
	language = "en-US",
}: DiscoverMoviesRequestParams): Promise<MoviesPage> {
	const searchParams = buildDiscoverMoviesSearchParams({
		page,
		filters,
		language,
	});

	const response = await api
		.get("discover/movie", { searchParams })
		.json<TmdbPaginatedResponse<TmdbMovieResponse>>();

	return {
		page: response.page,
		results: response.results.map(mapTmdbMovie),
		totalPages: response.total_pages,
		totalResults: response.total_results,
	};
}
