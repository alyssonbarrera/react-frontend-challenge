import { api } from "@/infra/http/api-client";
import type {
	MovieCredits,
	TmdbMovieCreditsResponse,
} from "../dtos/movie-credits";
import { mapTmdbMovieCredits } from "../utils/movie-credits.utils";

export type GetMovieCreditsRequestParams = {
	movieId: number;
	language?: string;
};

export async function getMovieCreditsRequest({
	movieId,
	language = "en-US",
}: GetMovieCreditsRequestParams): Promise<MovieCredits> {
	const response = await api
		.get(`movie/${movieId}/credits`, { searchParams: { language } })
		.json<TmdbMovieCreditsResponse>();

	return mapTmdbMovieCredits(response);
}
