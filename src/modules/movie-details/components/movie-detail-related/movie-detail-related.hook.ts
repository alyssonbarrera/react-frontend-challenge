import { getRouteApi } from "@tanstack/react-router";
import { useMovieRecommendationsQuery } from "../../queries/use-movie-recommendations-query";

const MAX_RELATED_MOVIES = 8;
const movieDetailRouteApi = getRouteApi("/_authenticated/movie/$id");

export function useMovieDetailRelated() {
	const { id } = movieDetailRouteApi.useParams();
	const movieId = Number(id);
	const recommendationsQuery = useMovieRecommendationsQuery(movieId);

	const related =
		recommendationsQuery.data?.results.slice(0, MAX_RELATED_MOVIES) ?? [];

	return {
		related,
		isError: recommendationsQuery.isError,
		isLoading: recommendationsQuery.isLoading,
	};
}
