import { useQuery } from "@tanstack/react-query";
import {
	isValidMovieId,
	movieRecommendationsQueryOptions,
} from "./movie-details-query-options";

export function useMovieRecommendationsQuery(movieId: number) {
	return useQuery({
		...movieRecommendationsQueryOptions(movieId),
		enabled: isValidMovieId(movieId),
	});
}
