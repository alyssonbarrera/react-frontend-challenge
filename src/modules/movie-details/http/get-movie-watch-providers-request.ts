import { api } from "@/infra/http/api-client";
import type {
	MovieWatchProviders,
	TmdbMovieWatchProvidersResponse,
} from "../dtos/movie-watch-providers";
import { mapTmdbMovieWatchProviders } from "../utils/movie-watch-providers.utils";

export type GetMovieWatchProvidersRequestParams = {
	movieId: number;
};

export async function getMovieWatchProvidersRequest({
	movieId,
}: GetMovieWatchProvidersRequestParams): Promise<MovieWatchProviders> {
	const response = await api
		.get(`movie/${movieId}/watch/providers`)
		.json<TmdbMovieWatchProvidersResponse>();

	return mapTmdbMovieWatchProviders(response);
}
