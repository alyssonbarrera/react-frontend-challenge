import { api } from "@/infra/http/api-client";
import type {
	MovieVideos,
	TmdbMovieVideosResponse,
} from "../dtos/movie-videos";
import { mapTmdbMovieVideos } from "../utils/movie-videos.utils";

export type GetMovieVideosRequestParams = {
	movieId: number;
	language?: string;
};

export async function getMovieVideosRequest({
	movieId,
	language = "en-US",
}: GetMovieVideosRequestParams): Promise<MovieVideos> {
	const response = await api
		.get(`movie/${movieId}/videos`, { searchParams: { language } })
		.json<TmdbMovieVideosResponse>();

	return mapTmdbMovieVideos(response);
}
