import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import {
	movieCreditsQueryOptions,
	movieDetailsQueryOptions,
	movieRecommendationsQueryOptions,
	movieVideosQueryOptions,
	movieWatchProvidersQueryOptions,
} from "@/modules/movie-details/queries/movie-details-query-options";
import { MovieDetailScreen } from "@/modules/movie-details/screens/movie-detail-screen";
import { MovieDetailScreenSkeleton } from "@/modules/movie-details/screens/movie-detail-screen/movie-detail-screen-skeleton";
import { isValidMovieIdParam } from "@/modules/movie-details/utils/movie-details.utils";

const movieDetailRouteApi = getRouteApi("/_authenticated/movie/$id");

export const Route = createFileRoute("/_authenticated/movie/$id")({
	loader: async ({ context, params, preload }) => {
		if (!isValidMovieIdParam(params.id)) {
			return null;
		}

		const movieId = Number(params.id);

		try {
			const movieDetails = await context.queryClient.ensureQueryData(
				movieDetailsQueryOptions(movieId),
			);

			if (!preload) {
				context.queryClient.prefetchQuery(movieCreditsQueryOptions(movieId));
				context.queryClient.prefetchQuery(movieVideosQueryOptions(movieId));
				context.queryClient.prefetchQuery(
					movieWatchProvidersQueryOptions(movieId),
				);
				context.queryClient.prefetchQuery(
					movieRecommendationsQueryOptions(movieId),
				);
			}

			return movieDetails;
		} catch {
			return null;
		}
	},
	head: ({ loaderData }) => ({
		meta: [
			{
				title: loaderData?.title
					? `CineDash | ${loaderData.title}`
					: "CineDash",
			},
		],
	}),
	pendingMs: 0,
	component: MovieDetailsComponent,
	pendingComponent: MovieDetailScreenSkeleton,
});

function MovieDetailsComponent() {
	const { id } = movieDetailRouteApi.useParams();

	return <MovieDetailScreen id={id} />;
}
