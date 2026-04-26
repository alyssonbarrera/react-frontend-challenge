import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/movie")({
	beforeLoad: ({ location }) => {
		const isMovieBaseRoute =
			location.pathname === "/movie" || location.pathname === "/movie/";

		if (isMovieBaseRoute) {
			throw redirect({ to: "/discovery" });
		}
	},
});
