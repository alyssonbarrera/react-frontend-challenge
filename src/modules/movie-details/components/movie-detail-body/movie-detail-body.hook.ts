import { getRouteApi } from "@tanstack/react-router";
import { useMovieCreditsQuery } from "../../queries/use-movie-credits-query";
import { useMovieDetailsQuery } from "../../queries/use-movie-details-query";
import { mapMovieDetailsToBodyData } from "./movie-detail-body.utils";

export type { MovieDetailBodyData } from "./movie-detail-body.utils";

const movieDetailRouteApi = getRouteApi("/_authenticated/movie/$id");

export function useMovieDetailBody() {
	const { id } = movieDetailRouteApi.useParams();
	const movieId = Number(id);

	const detailsQuery = useMovieDetailsQuery(movieId);
	const creditsQuery = useMovieCreditsQuery(movieId);

	const isLoading = detailsQuery.isLoading || creditsQuery.isLoading;

	const isError = detailsQuery.isError;
	const isKeyCrewError = creditsQuery.isError;

	const movie = detailsQuery.data;
	const credits = creditsQuery.data;

	const body = movie
		? mapMovieDetailsToBodyData({
				movie,
				credits,
			})
		: null;

	function retryKeyCrew() {
		creditsQuery.refetch();
	}

	return {
		body,
		isError,
		isLoading,
		retryKeyCrew,
		isKeyCrewError,
	};
}
