import { getGenreId, getGenreName } from "./movie-genres.utils";

describe("movieGenresUtils", () => {
	it("should be able to get genre name by id", async () => {
		const movieGenreName = getGenreName(28);

		expect(movieGenreName).toBe("Action");
	});

	it("should not be able to get genre name for unknown id", async () => {
		const movieGenreName = getGenreName(999_999);

		expect(movieGenreName).toBeUndefined();
	});

	it("should be able to get genre id by name", async () => {
		const movieGenreId = getGenreId("Action");

		expect(movieGenreId).toBe(28);
	});

	it("should not be able to get genre id for unknown name", async () => {
		const movieGenreId = getGenreId("Unknown genre");

		expect(movieGenreId).toBeUndefined();
	});
});
