import { getRouteApi } from "@tanstack/react-router";
import type { MovieVideos } from "@/modules/movie-details/dtos/movie-videos";
import { useMovieVideosQuery } from "@/modules/movie-details/queries/use-movie-videos-query";

const movieDetailRouteApi = getRouteApi("/_authenticated/movie/$id");

type Trailer = {
	title: string;
	youtubeKey: string;
};

function getPreferredTrailer(videos: MovieVideos | undefined) {
	const trailerCandidates =
		videos?.results.filter(
			(video) => video.site === "YouTube" && video.type === "Trailer",
		) ?? [];

	if (trailerCandidates.length === 0) {
		return null;
	}

	const fallbackTrailer = trailerCandidates[0];
	const officialTrailer = trailerCandidates.find((video) => video.official);

	return officialTrailer ?? fallbackTrailer;
}

export function useMovieDetailTrailer() {
	const { id } = movieDetailRouteApi.useParams();
	const movieId = Number(id);
	const videosQuery = useMovieVideosQuery(movieId);
	const preferredTrailer = getPreferredTrailer(videosQuery.data);

	const trailer: Trailer | null = preferredTrailer
		? {
				title: preferredTrailer.name,
				youtubeKey: preferredTrailer.key,
			}
		: null;

	function retry() {
		void videosQuery.refetch();
	}

	return {
		trailer,
		isLoading: videosQuery.isLoading,
		isError: videosQuery.isError,
		retry,
	};
}
