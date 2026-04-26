import { useQuery } from "@tanstack/react-query";
import { getMovieDetailsRequest } from "../http/get-movie-details-request";

export const MOVIE_DETAILS_QUERY_KEY = "movie-details";

export function useMovieDetailsQuery(movieId: number) {
	return useQuery({
		queryKey: [MOVIE_DETAILS_QUERY_KEY, movieId],
		queryFn: () => getMovieDetailsRequest({ movieId }),
		staleTime: 1000 * 60 * 5,
		enabled: Number.isFinite(movieId) && movieId > 0,
	});
}
