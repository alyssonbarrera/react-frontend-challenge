import { HttpResponse, http } from "msw";
import type { TmdbMovieDetailsResponse } from "@/modules/movie-details/dtos/movie-details";

export const MOVIE_DETAILS_URL = "https://api.themoviedb.org/3/movie/:movieId";

const tmdbMovieDetails: TmdbMovieDetailsResponse = {
	id: 1,
	title: "Tenet",
	original_title: "Tenet",
	overview: "",
	poster_path: "/poster.jpg",
	backdrop_path: null,
	release_date: "2020-08-26",
	vote_average: 7.3,
	vote_count: 100,
	popularity: 0,
	original_language: "en",
	adult: false,
	video: false,
	runtime: 150,
	tagline: "Time runs out.",
	status: "Released",
	homepage: "https://www.tenetfilm.com",
	imdb_id: "tt6723592",
	budget: 200_000_000,
	revenue: 365_300_000,
	genres: [
		{ id: 28, name: "Action" },
		{ id: 12, name: "Adventure" },
	],
};

export const movieDetailsHandlers = [
	http.get(MOVIE_DETAILS_URL, () =>
		HttpResponse.json<TmdbMovieDetailsResponse>(tmdbMovieDetails),
	),
];
