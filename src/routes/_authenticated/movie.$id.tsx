import { createFileRoute } from "@tanstack/react-router";
import { MovieDetailBodySkeleton } from "@/modules/movie-details/components/movie-detail-body/movie-detail-body-skeleton";
import { MovieDetailHeroSkeleton } from "@/modules/movie-details/components/movie-detail-hero/movie-detail-hero-skeleton";
import { MovieDetailRelatedSkeleton } from "@/modules/movie-details/components/movie-detail-related/movie-detail-related-skeleton";
import { getMovieDetailsRequest } from "@/modules/movie-details/http/get-movie-details-request";
import { MOVIE_DETAILS_QUERY_KEY } from "@/modules/movie-details/queries/use-movie-details-query";
import { MovieDetailScreen } from "@/modules/movie-details/screens/movie-detail-screen";

export const Route = createFileRoute("/_authenticated/movie/$id")({
	loader: async ({ context, params }) => {
		const movieId = Number(params.id);

		if (!Number.isFinite(movieId) || movieId <= 0) {
			return null;
		}

		try {
			return await context.queryClient.ensureQueryData({
				queryKey: [MOVIE_DETAILS_QUERY_KEY, movieId],
				queryFn: () => getMovieDetailsRequest({ movieId }),
				staleTime: 1000 * 60 * 5,
			});
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
	component: () => <MovieDetailsComponent />,
});

function MovieDetailsComponent() {
	return <MovieDetailScreen />;
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
