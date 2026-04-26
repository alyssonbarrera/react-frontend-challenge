import { makeTmdbMovieCredits } from "@tests/factories/make-tmdb-movie-credits";
import { makeTmdbMovieVideos } from "@tests/factories/make-tmdb-movie-videos";
import { makeTmdbMovieWatchProviders } from "@tests/factories/make-tmdb-movie-watch-providers";
import { HttpResponse, http } from "msw";
import type {
	TmdbMovieResponse,
	TmdbPaginatedResponse,
} from "@/modules/discovery/dtos/movie";
import type { TmdbMovieCreditsResponse } from "@/modules/movie-details/dtos/movie-credits";
import type { TmdbMovieDetailsResponse } from "@/modules/movie-details/dtos/movie-details";
import type { TmdbMovieVideosResponse } from "@/modules/movie-details/dtos/movie-videos";
import type { TmdbMovieWatchProvidersResponse } from "@/modules/movie-details/dtos/movie-watch-providers";

export const MOVIE_DETAILS_URL = "https://api.themoviedb.org/3/movie/:movieId";
export const MOVIE_CREDITS_URL =
	"https://api.themoviedb.org/3/movie/:movieId/credits";
export const MOVIE_VIDEOS_URL =
	"https://api.themoviedb.org/3/movie/:movieId/videos";
export const MOVIE_WATCH_PROVIDERS_URL =
	"https://api.themoviedb.org/3/movie/:movieId/watch/providers";
export const MOVIE_RECOMMENDATIONS_URL =
	"https://api.themoviedb.org/3/movie/:movieId/recommendations";

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

const recommendation: TmdbMovieResponse = {
	id: 2,
	title: "Inception",
	original_title: "Inception",
	overview: "",
	poster_path: "/inception.jpg",
	backdrop_path: null,
	release_date: "2010-07-16",
	vote_average: 8.4,
	vote_count: 200,
	popularity: 0,
	genre_ids: [28, 878],
	original_language: "en",
	adult: false,
	video: false,
};

const recommendationsPage: TmdbPaginatedResponse<TmdbMovieResponse> = {
	page: 1,
	results: [recommendation],
	total_pages: 1,
	total_results: 1,
};

export const movieDetailsHandlers = [
	http.get(MOVIE_DETAILS_URL, () =>
		HttpResponse.json<TmdbMovieDetailsResponse>(tmdbMovieDetails),
	),
	http.get(MOVIE_CREDITS_URL, () =>
		HttpResponse.json<TmdbMovieCreditsResponse>(makeTmdbMovieCredits()),
	),
	http.get(MOVIE_VIDEOS_URL, () =>
		HttpResponse.json<TmdbMovieVideosResponse>(makeTmdbMovieVideos()),
	),
	http.get(MOVIE_WATCH_PROVIDERS_URL, () =>
		HttpResponse.json<TmdbMovieWatchProvidersResponse>(
			makeTmdbMovieWatchProviders(),
		),
	),
	http.get(MOVIE_RECOMMENDATIONS_URL, () =>
		HttpResponse.json<TmdbPaginatedResponse<TmdbMovieResponse>>(
			recommendationsPage,
		),
	),
];
