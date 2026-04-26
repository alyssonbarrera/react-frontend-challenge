import { useQuery } from "@tanstack/react-query";
import { getMovieCreditsRequest } from "../http/get-movie-credits-request";

export const MOVIE_CREDITS_QUERY_KEY = "movie-credits";

export function useMovieCreditsQuery(movieId: number) {
	return useQuery({
		queryKey: [MOVIE_CREDITS_QUERY_KEY, movieId],
		queryFn: () => getMovieCreditsRequest({ movieId }),
		staleTime: 1000 * 60 * 5,
		enabled: Number.isFinite(movieId) && movieId > 0,
	});
}
