import { HttpResponse, http } from "msw";
import type {
	TmdbMovieResponse,
	TmdbPaginatedResponse,
} from "@/modules/discovery/dtos/movie";

export const DISCOVER_MOVIES_URL =
	"https://api.themoviedb.org/3/discover/movie";
export const SEARCH_MOVIES_URL = "https://api.themoviedb.org/3/search/movie";

const tmdbMovie: TmdbMovieResponse = {
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
	genre_ids: [28, 12],
	original_language: "en",
	adult: false,
	video: false,
};

const paginatedResponse: TmdbPaginatedResponse<TmdbMovieResponse> = {
	page: 1,
	results: [tmdbMovie],
	total_pages: 1,
	total_results: 1,
};

export const discoveryHandlers = [
	http.get(DISCOVER_MOVIES_URL, () =>
		HttpResponse.json<TmdbPaginatedResponse<TmdbMovieResponse>>(
			paginatedResponse,
		),
	),
	http.get(SEARCH_MOVIES_URL, () =>
		HttpResponse.json<TmdbPaginatedResponse<TmdbMovieResponse>>(
			paginatedResponse,
		),
	),
];
