import { api } from "@/infra/http/api-client";
import type {
	MovieDetails,
	TmdbMovieDetailsResponse,
} from "../dtos/movie-details";
import { mapTmdbMovieDetails } from "../utils/movie-details.utils";

export type GetMovieDetailsRequestParams = {
	movieId: number;
	language?: string;
};

export async function getMovieDetailsRequest({
	movieId,
	language = "en-US",
}: GetMovieDetailsRequestParams): Promise<MovieDetails> {
	const response = await api
		.get(`movie/${movieId}`, { searchParams: { language } })
		.json<TmdbMovieDetailsResponse>();

	return mapTmdbMovieDetails(response);
}
