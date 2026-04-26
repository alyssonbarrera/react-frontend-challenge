import { createFileRoute } from "@tanstack/react-router";
import { getMovieDetailsRequest } from "@/modules/movie-details/http/get-movie-details-request";
import { MOVIE_DETAILS_QUERY_KEY } from "@/modules/movie-details/queries/use-movie-details-query";
import { MovieDetailScreen } from "@/modules/movie-details/screens/movie-detail-screen";

export const Route = createFileRoute("/_authenticated/movie/$id")({
	head: ({ loaderData }) => ({
		meta: [
			{
				title: "CineDash",
			},
		],
	}),
	component: MovieDetailsComponent,
});

function MovieDetailsComponent() {
	return <MovieDetailScreen />;
}
