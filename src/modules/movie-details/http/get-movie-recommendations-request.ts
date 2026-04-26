import { api } from "@/infra/http/api-client";
import type {
	MoviesPage,
	TmdbMovieResponse,
	TmdbPaginatedResponse,
} from "@/modules/discovery/dtos/movie";
import { mapTmdbMovie } from "@/modules/discovery/utils/movie.utils";

export type GetMovieRecommendationsRequestParams = {
	movieId: number;
	page?: number;
	language?: string;
};

export async function getMovieRecommendationsRequest({
	movieId,
	page = 1,
	language = "en-US",
}: GetMovieRecommendationsRequestParams): Promise<MoviesPage> {
	const response = await api
		.get(`movie/${movieId}/recommendations`, {
			searchParams: { page, language },
		})
		.json<TmdbPaginatedResponse<TmdbMovieResponse>>();

	return {
		page: response.page,
		results: response.results.map(mapTmdbMovie),
		totalPages: response.total_pages,
		totalResults: response.total_results,
	};
}
