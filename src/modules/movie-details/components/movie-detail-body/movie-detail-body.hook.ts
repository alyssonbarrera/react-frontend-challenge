import { getRouteApi } from "@tanstack/react-router";
import { useMovieCreditsQuery } from "../../queries/use-movie-credits-query";
import { useMovieDetailsQuery } from "../../queries/use-movie-details-query";
import { useMovieVideosQuery } from "../../queries/use-movie-videos-query";
import { useMovieWatchProvidersQuery } from "../../queries/use-movie-watch-providers-query";
import {
	formatAudienceScore,
	formatAudienceScoreMax,
	formatAudienceVotes,
	mapMovieDetailsToBodyData,
	toAudienceScorePercentage,
} from "./movie-detail-body.utils";

export type { MovieDetailBodyData } from "./movie-detail-body.utils";

const movieDetailRouteApi = getRouteApi("/_authenticated/movie/$id");

export function useMovieDetailBody() {
	const { id } = movieDetailRouteApi.useParams();
	const movieId = Number(id);

	const detailsQuery = useMovieDetailsQuery(movieId);
	const creditsQuery = useMovieCreditsQuery(movieId);
	const videosQuery = useMovieVideosQuery(movieId);
	const watchProvidersQuery = useMovieWatchProvidersQuery(movieId);

	const isLoading =
		detailsQuery.isLoading ||
		creditsQuery.isLoading ||
		videosQuery.isLoading ||
		watchProvidersQuery.isLoading;

	const isError = detailsQuery.isError;

	const movie = detailsQuery.data;
	const credits = creditsQuery.data;
	const videos = videosQuery.data;
	const watchProviders = watchProvidersQuery.data;

	const body = movie
		? mapMovieDetailsToBodyData({
				movie,
				credits,
				videos,
				watchProviders,
			})
		: null;

	const formattedScore = body
		? formatAudienceScore(body.audienceScore.score)
		: "";
	const formattedScoreMax = body
		? formatAudienceScoreMax(body.audienceScore.max)
		: "";
	const formattedVotes = body
		? formatAudienceVotes(body.audienceScore.votes)
		: "";
	const scorePercentage = body
		? toAudienceScorePercentage(
				body.audienceScore.score,
				body.audienceScore.max,
			)
		: 0;

	function handlePlayTrailer() {
		// Placeholder for the trailer modal trigger.
	}

	function handleSelectStreamingOption(_optionId: string) {
		// Placeholder for streaming deep link.
	}

	return {
		body,
		isError,
		isLoading,
		formattedScore,
		formattedScoreMax,
		formattedVotes,
		scorePercentage,
		handlePlayTrailer,
		handleSelectStreamingOption,
	};
}
