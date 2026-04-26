import { getMovieRecommendationsRequest } from "./get-movie-recommendations-request";

describe("getMovieRecommendationsRequest", () => {
	it("should be able to fetch movie recommendations by id", async () => {
		const response = await getMovieRecommendationsRequest({ movieId: 1 });

		expect(response.page).toBe(1);
		expect(response.totalPages).toBe(1);
		expect(response.totalResults).toBe(1);
		expect(response.results).toHaveLength(1);
		expect(response.results[0]).toEqual({
			id: 2,
			title: "Inception",
			originalTitle: "Inception",
			overview: "",
			posterPath: "/inception.jpg",
			backdropPath: null,
			releaseDate: "2010-07-16",
			voteAverage: 8.4,
			voteCount: 200,
			popularity: 0,
			genreIds: [28, 878],
			originalLanguage: "en",
			adult: false,
			video: false,
		});
	});
});
