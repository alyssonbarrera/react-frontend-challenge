import { api } from "@/infra/http/api-client";
import type {
	MoviesPage,
	TmdbMovieResponse,
	TmdbPaginatedResponse,
} from "../dtos/movie";
import { mapTmdbMovie } from "../utils/movie.utils";
import { buildSearchMoviesSearchParams } from "../utils/movie-search-params.utils";

export type SearchMoviesRequestParams = {
	query: string;
	page?: number;
	year?: number;
	language?: string;
};

export async function searchMoviesRequest({
	year,
	query,
	page = 1,
	language = "en-US",
}: SearchMoviesRequestParams): Promise<MoviesPage> {
	const searchParams = buildSearchMoviesSearchParams({
		query,
		page,
		year,
		language,
	});

	const response = await api
		.get("search/movie", { searchParams })
		.json<TmdbPaginatedResponse<TmdbMovieResponse>>();

	return {
		page: response.page,
		totalPages: response.total_pages,
		totalResults: response.total_results,
		results: response.results.map(mapTmdbMovie),
	};
}
