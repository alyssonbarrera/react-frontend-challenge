import type { Movie } from "@/modules/discovery/dtos/movie";

export function makeMovie(override?: Partial<Movie>): Movie {
	const title = override?.title ?? "Movie Title";

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
		genreIds: [28, 12],
		originalLanguage: "en",
		adult: false,
		video: false,
		...override,
	};
}
