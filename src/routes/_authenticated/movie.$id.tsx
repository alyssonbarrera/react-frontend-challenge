import { createFileRoute } from "@tanstack/react-router";
import { MovieDetailScreen } from "@/modules/movie-details/screens/movie-detail-screen";

export const Route = createFileRoute("/_authenticated/movie/$id")({
	component: MovieDetailsComponent,
});

function MovieDetailsComponent() {
	const { id } = Route.useParams();
	return <MovieDetailScreen id={id} />;
}
