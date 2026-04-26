import { getRouteApi } from "@tanstack/react-router";
import { MOVIE_DETAIL_RATING_MAX } from "@/modules/movie-details/constants/movie-detail.constants";
import { useMovieDetailsQuery } from "@/modules/movie-details/queries/use-movie-details-query";
import {
	formatAudienceScore,
	formatAudienceScoreMax,
	formatAudienceVotes,
	toAudienceScorePercentage,
} from "../../movie-detail-body.utils";

const movieDetailRouteApi = getRouteApi("/_authenticated/movie/$id");

export function useMovieDetailAudienceScore() {
	const { id } = movieDetailRouteApi.useParams();
	const movieId = Number(id);
	const detailsQuery = useMovieDetailsQuery(movieId);
	const movie = detailsQuery.data;

	const formattedScore = movie ? formatAudienceScore(movie.voteAverage) : "";
	const formattedScoreMax = movie
		? formatAudienceScoreMax(MOVIE_DETAIL_RATING_MAX)
		: "";
	const formattedVotes = movie ? formatAudienceVotes(movie.voteCount) : "";
	const scorePercentage = movie
		? toAudienceScorePercentage(movie.voteAverage, MOVIE_DETAIL_RATING_MAX)
		: 0;

	function retryAudienceScore() {
		detailsQuery.refetch();
	}

	return {
		formattedScore,
		formattedVotes,
		scorePercentage,
		formattedScoreMax,
		retryAudienceScore,
		isError: detailsQuery.isError,
	};
}
