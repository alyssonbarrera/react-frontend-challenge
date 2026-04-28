import { useQuery } from "@tanstack/react-query";
import {
	isValidMovieId,
	movieVideosQueryOptions,
} from "./movie-details-query-options";

export function useMovieVideosQuery(movieId: number) {
	return useQuery({
		...movieVideosQueryOptions(movieId),
		enabled: isValidMovieId(movieId),
	});
}
