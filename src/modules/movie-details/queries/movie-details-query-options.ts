import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "@/core/constants/query-keys";
import { getMovieCreditsRequest } from "../http/get-movie-credits-request";
import { getMovieDetailsRequest } from "../http/get-movie-details-request";
import { getMovieRecommendationsRequest } from "../http/get-movie-recommendations-request";
import { getMovieVideosRequest } from "../http/get-movie-videos-request";
import { getMovieWatchProvidersRequest } from "../http/get-movie-watch-providers-request";

export const MOVIE_DETAILS_QUERY_STALE_TIME = 1000 * 60 * 5; // 5 minutes;

export function isValidMovieId(movieId: number): boolean {
	return Number.isFinite(movieId) && movieId > 0;
}

export function movieDetailsQueryOptions(movieId: number) {
	return queryOptions({
		queryKey: queryKeys.movieDetails.details(movieId),
		queryFn: () => getMovieDetailsRequest({ movieId }),
		staleTime: MOVIE_DETAILS_QUERY_STALE_TIME,
	});
}

export function movieCreditsQueryOptions(movieId: number) {
	return queryOptions({
		queryKey: queryKeys.movieDetails.credits(movieId),
		queryFn: () => getMovieCreditsRequest({ movieId }),
		staleTime: MOVIE_DETAILS_QUERY_STALE_TIME,
	});
}

export function movieVideosQueryOptions(movieId: number) {
	return queryOptions({
		queryKey: queryKeys.movieDetails.videos(movieId),
		queryFn: () => getMovieVideosRequest({ movieId }),
		staleTime: MOVIE_DETAILS_QUERY_STALE_TIME,
	});
}

export function movieWatchProvidersQueryOptions(movieId: number) {
	return queryOptions({
		queryKey: queryKeys.movieDetails.watchProviders(movieId),
		queryFn: () => getMovieWatchProvidersRequest({ movieId }),
		staleTime: MOVIE_DETAILS_QUERY_STALE_TIME,
	});
}

export function movieRecommendationsQueryOptions(movieId: number) {
	return queryOptions({
		queryKey: queryKeys.movieDetails.recommendations(movieId),
		queryFn: () => getMovieRecommendationsRequest({ movieId }),
		staleTime: MOVIE_DETAILS_QUERY_STALE_TIME,
	});
}
