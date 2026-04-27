import type { TmdbMovieDetailsResponse } from "../dtos/movie-details";
import {
	isValidMovieIdParam,
	mapTmdbMovieDetails,
} from "./movie-details.utils";

describe("movieDetailsUtils", () => {
	it("should be able to map tmdb movie details into the app contract", () => {
		const rawMovieDetails: TmdbMovieDetailsResponse = {
			id: 1,
			title: "Tenet",
			original_title: "Tenet",
			overview: "Time inversion.",
			poster_path: "/poster.jpg",
			backdrop_path: "/backdrop.jpg",
			release_date: "2020-08-26",
			vote_average: 7.3,
			vote_count: 100,
			popularity: 10,
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

		const movieDetails = mapTmdbMovieDetails(rawMovieDetails);

		expect(movieDetails).toEqual({
			id: 1,
			title: "Tenet",
			originalTitle: "Tenet",
			overview: "Time inversion.",
			posterPath: "/poster.jpg",
			backdropPath: "/backdrop.jpg",
			releaseDate: "2020-08-26",
			voteAverage: 7.3,
			voteCount: 100,
			popularity: 10,
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
		});
	});

	it("should be able to map movie details with empty genres", () => {
		const rawMovieDetails: TmdbMovieDetailsResponse = {
			id: 2,
			title: "Untitled",
			original_title: "Untitled",
			overview: "",
			poster_path: null,
			backdrop_path: null,
			release_date: "",
			vote_average: 0,
			vote_count: 0,
			popularity: 0,
			original_language: "en",
			adult: false,
			video: false,
			runtime: null,
			tagline: "",
			status: "",
			homepage: "",
			imdb_id: null,
			budget: 0,
			revenue: 0,
			genres: [],
		};

		const movieDetails = mapTmdbMovieDetails(rawMovieDetails);

		expect(movieDetails.genres).toEqual([]);
		expect(movieDetails.runtime).toBeNull();
		expect(movieDetails.posterPath).toBeNull();
	});

	it("should be able to validate a positive integer id param", () => {
		expect(isValidMovieIdParam("1")).toBe(true);
		expect(isValidMovieIdParam("42")).toBe(true);
		expect(isValidMovieIdParam("999999")).toBe(true);
	});

	it("should not be able to validate non-numeric id params", () => {
		expect(isValidMovieIdParam("abc")).toBe(false);
		expect(isValidMovieIdParam("")).toBe(false);
		expect(isValidMovieIdParam("1abc")).toBe(false);
	});

	it("should not be able to validate zero or negative id params", () => {
		expect(isValidMovieIdParam("0")).toBe(false);
		expect(isValidMovieIdParam("-1")).toBe(false);
		expect(isValidMovieIdParam("-999")).toBe(false);
	});

	it("should not be able to validate non-integer id params", () => {
		expect(isValidMovieIdParam("1.5")).toBe(false);
		expect(isValidMovieIdParam("3.14")).toBe(false);
	});
});
