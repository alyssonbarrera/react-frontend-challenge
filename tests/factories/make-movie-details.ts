import type { MovieDetails } from "@/modules/movie-details/dtos/movie-details";

export function makeMovieDetails(
	override?: Partial<MovieDetails>,
): MovieDetails {
	const title = override?.title ?? "Tenet";

	return {
		id: 1,
		title,
		originalTitle: override?.originalTitle ?? title,
		overview: "",
		posterPath: "/poster.jpg",
		backdropPath: null,
		releaseDate: "2020-08-26",
		voteAverage: 7.3,
		voteCount: 100,
		popularity: 0,
		originalLanguage: "en",
		adult: false,
		video: false,
		runtime: 150,
		tagline: "Time runs out.",
		status: "Released",
		homepage: "https://www.tenetfilm.com",
		imdbId: "tt6723592",
		budget: 200_000_000,
		revenue: 365_300_000,
		genres: [
			{ id: 28, name: "Action" },
			{ id: 12, name: "Adventure" },
		],
		...override,
	};
}
