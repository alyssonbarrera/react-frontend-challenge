import { useQuery } from "@tanstack/react-query";
import { getMovieWatchProvidersRequest } from "../http/get-movie-watch-providers-request";

export const MOVIE_WATCH_PROVIDERS_QUERY_KEY = "movie-watch-providers";

export function useMovieWatchProvidersQuery(movieId: number) {
	return useQuery({
		queryKey: [MOVIE_WATCH_PROVIDERS_QUERY_KEY, movieId],
		queryFn: () => getMovieWatchProvidersRequest({ movieId }),
		staleTime: 1000 * 60 * 5,
		enabled: Number.isFinite(movieId) && movieId > 0,
	});
}
