import { makeTmdbMovieCredits } from "@tests/factories/make-tmdb-movie-credits";
import { mapTmdbMovieCredits } from "./movie-credits.utils";

describe("movieCreditsUtils", () => {
	it("should be able to map tmdb movie credits into the app contract", () => {
		const rawMovieCredits = makeTmdbMovieCredits();

		const movieCredits = mapTmdbMovieCredits(rawMovieCredits);

		expect(movieCredits.movieId).toBe(1);
		expect(movieCredits.cast[0]).toEqual({
			id: 101,
			name: "John Doe",
			character: "The Protagonist",
			order: 0,
			profilePath: "/profile-1.jpg",
		});
		expect(movieCredits.crew[0]).toEqual({
			id: 201,
			name: "Christopher Nolan",
			job: "Director",
			department: "Directing",
			profilePath: "/director.jpg",
		});
	});

	it("should be able to map tmdb movie credits with empty cast and crew", () => {
		const rawMovieCredits = makeTmdbMovieCredits({
			cast: [],
			crew: [],
		});

		const movieCredits = mapTmdbMovieCredits(rawMovieCredits);

		expect(movieCredits.cast).toEqual([]);
		expect(movieCredits.crew).toEqual([]);
	});
});
