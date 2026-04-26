import { makeMovieCredits } from "@tests/factories/make-movie-credits";
import { getMovieCreditsRequest } from "./get-movie-credits-request";

describe("getMovieCreditsRequest", () => {
	it("should be able to fetch movie credits by id", async () => {
		const response = await getMovieCreditsRequest({ movieId: 1 });

		expect(response).toEqual(makeMovieCredits());
	});
});
