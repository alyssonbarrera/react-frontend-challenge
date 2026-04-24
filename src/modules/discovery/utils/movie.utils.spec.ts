import type { TmdbMovieResponse } from "../dtos/movie";
import { buildPosterUrl, mapTmdbMovie } from "./movie.utils";

describe("movieUtils", () => {
	it("should be able to build poster URL with default size", async () => {
		const moviePosterUrl = buildPosterUrl("/poster.jpg");

		expect(moviePosterUrl).toBe("https://image.tmdb.org/t/p/w500/poster.jpg");
	});

	it("should be able to build poster URL with custom size", async () => {
		const moviePosterUrl = buildPosterUrl("/poster.jpg", "w185");

		expect(moviePosterUrl).toBe("https://image.tmdb.org/t/p/w185/poster.jpg");
	});

	it("should be able to return placeholder poster URL when path is null", async () => {
		const moviePosterUrl = buildPosterUrl(null);

		expect(moviePosterUrl.startsWith("data:image/svg+xml")).toBe(true);
	});

	it("should be able to return placeholder poster URL when path is empty", async () => {
		const moviePosterUrl = buildPosterUrl("");

		expect(moviePosterUrl.startsWith("data:image/svg+xml")).toBe(true);
	});

	it("should be able to map tmdb movie response", async () => {
		const tmdbMovieResponse: TmdbMovieResponse = {
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

		const mappedMovie = mapTmdbMovie(tmdbMovieResponse);

		expect(mappedMovie).toEqual({
			id: 1,
			title: "Tenet",
			originalTitle: "Tenet",
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
		});
	});
});
