import { useQuery } from "@tanstack/react-query";
import { getMovieRecommendationsRequest } from "../http/get-movie-recommendations-request";

export const MOVIE_RECOMMENDATIONS_QUERY_KEY = "movie-recommendations";

export function useMovieRecommendationsQuery(movieId: number) {
	return useQuery({
		queryKey: [MOVIE_RECOMMENDATIONS_QUERY_KEY, movieId],
		queryFn: () => getMovieRecommendationsRequest({ movieId }),
		staleTime: 1000 * 60 * 5,
		enabled: Number.isFinite(movieId) && movieId > 0,
	});
}
