import { makeMovieWatchProviders } from "@tests/factories/make-movie-watch-providers";
import { getMovieWatchProvidersRequest } from "./get-movie-watch-providers-request";

describe("getMovieWatchProvidersRequest", () => {
	it("should be able to fetch movie watch providers by id", async () => {
		const response = await getMovieWatchProvidersRequest({ movieId: 1 });

		expect(response).toEqual(makeMovieWatchProviders());
	});
});
