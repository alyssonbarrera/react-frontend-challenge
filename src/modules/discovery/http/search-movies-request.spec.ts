import { searchMoviesRequest } from "./search-movies-request";

describe("searchMoviesRequest", () => {
	it("should be able to search movies", async () => {
		const searchMoviesRequestResponse = await searchMoviesRequest({
			query: "tenet",
		});

		expect(searchMoviesRequestResponse.page).toBe(1);
		expect(searchMoviesRequestResponse.totalPages).toBe(1);
		expect(searchMoviesRequestResponse.totalResults).toBe(1);
		expect(searchMoviesRequestResponse.results).toHaveLength(1);
		expect(searchMoviesRequestResponse.results[0]).toEqual({
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
