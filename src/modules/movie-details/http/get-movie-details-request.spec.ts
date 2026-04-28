import { makeMovieDetails } from "@tests/factories/make-movie-details";
import { getMovieDetailsRequest } from "./get-movie-details-request";

describe("getMovieDetailsRequest", () => {
	it("should be able to fetch movie details by id", async () => {
		const response = await getMovieDetailsRequest({ movieId: 1 });

		expect(response).toEqual(makeMovieDetails());
	});
});
