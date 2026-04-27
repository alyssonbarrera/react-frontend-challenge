import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { NotFound } from "@/core/components/not-found";
import { MovieDetailBodySkeleton } from "@/modules/movie-details/components/movie-detail-body/movie-detail-body-skeleton";
import { MovieDetailHeroSkeleton } from "@/modules/movie-details/components/movie-detail-hero/movie-detail-hero-skeleton";
import { MovieDetailRelatedSkeleton } from "@/modules/movie-details/components/movie-detail-related/movie-detail-related-skeleton";
import {
	movieCreditsQueryOptions,
	movieDetailsQueryOptions,
	movieRecommendationsQueryOptions,
	movieVideosQueryOptions,
	movieWatchProvidersQueryOptions,
} from "@/modules/movie-details/queries/movie-details-query-options";
import { MovieDetailScreen } from "@/modules/movie-details/screens/movie-detail-screen";

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
	pendingComponent: MovieDetailsPendingComponent,
	pendingMs: 0,
	head: ({ loaderData }) => ({
		meta: [
			{
				title: loaderData?.title
					? `CineDash | ${loaderData.title}`
					: "CineDash",
			},
		],
	}),
	component: MovieDetailsComponent,
});

function MovieDetailsComponent() {
	const { id } = movieDetailRouteApi.useParams();

	if (!isValidMovieIdParam(id)) {
		return (
			<NotFound
				title="This movie reel is missing."
				description="The movie ID in the URL is invalid. Pick another title from Discover to keep watching."
			/>
		);
	}

	return <MovieDetailScreen />;
}

function isValidMovieIdParam(id: string): boolean {
	const movieId = Number(id);
	return Number.isInteger(movieId) && movieId > 0;
}

function MovieDetailsPendingComponent() {
	return (
		<div
			className="relative flex flex-col"
			data-testid="movie-details-route-pending"
		>
			<MovieDetailHeroSkeleton />
			<MovieDetailBodySkeleton />
			<MovieDetailRelatedSkeleton />
		</div>
	);
}
