import { getRouteApi } from "@tanstack/react-router";
import { useMovieVideosQuery } from "@/modules/movie-details/queries/use-movie-videos-query";

const movieDetailRouteApi = getRouteApi("/_authenticated/movie/$id");

export function useMovieDetailHeroActions() {
	const { id } = movieDetailRouteApi.useParams();
	const movieId = Number(id);
	const videosQuery = useMovieVideosQuery(movieId);
	const hasNoVideos = (videosQuery.data?.results.length ?? 0) === 0;

	const isWatchTrailerDisabled =
		videosQuery.isLoading || videosQuery.isError || hasNoVideos;

	const hasNoTrailer =
		!videosQuery.isLoading && !videosQuery.isError && hasNoVideos;

	return {
		hasNoTrailer,
		isWatchTrailerDisabled,
		isWatchTrailerLoading: videosQuery.isLoading,
	};
}
