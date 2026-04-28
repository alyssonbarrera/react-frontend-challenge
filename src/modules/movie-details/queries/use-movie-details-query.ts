import { useQuery } from "@tanstack/react-query";
import {
	isValidMovieId,
	movieDetailsQueryOptions,
} from "./movie-details-query-options";

export function useMovieDetailsQuery(movieId: number) {
	return useQuery({
		...movieDetailsQueryOptions(movieId),
		enabled: isValidMovieId(movieId),
	});
}
