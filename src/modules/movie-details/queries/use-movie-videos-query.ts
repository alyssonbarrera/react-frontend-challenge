import { useQuery } from "@tanstack/react-query";
import { getMovieVideosRequest } from "../http/get-movie-videos-request";

export const MOVIE_VIDEOS_QUERY_KEY = "movie-videos";

export function useMovieVideosQuery(movieId: number) {
	return useQuery({
		queryKey: [MOVIE_VIDEOS_QUERY_KEY, movieId],
		queryFn: () => getMovieVideosRequest({ movieId }),
		staleTime: 1000 * 60 * 5,
		enabled: Number.isFinite(movieId) && movieId > 0,
	});
}
