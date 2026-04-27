import { useQuery } from "@tanstack/react-query";
import {
	isValidMovieId,
	movieWatchProvidersQueryOptions,
} from "./movie-details-query-options";

export function useMovieWatchProvidersQuery(movieId: number) {
	return useQuery({
		...movieWatchProvidersQueryOptions(movieId),
		enabled: isValidMovieId(movieId),
	});
}
