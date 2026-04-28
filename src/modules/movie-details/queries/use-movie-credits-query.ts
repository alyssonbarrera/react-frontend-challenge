import { useQuery } from "@tanstack/react-query";
import {
	isValidMovieId,
	movieCreditsQueryOptions,
} from "./movie-details-query-options";

export function useMovieCreditsQuery(movieId: number) {
	return useQuery({
		...movieCreditsQueryOptions(movieId),
		enabled: isValidMovieId(movieId),
	});
}
