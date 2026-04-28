import { makeMovieVideos } from "@tests/factories/make-movie-videos";
import { getMovieVideosRequest } from "./get-movie-videos-request";

describe("getMovieVideosRequest", () => {
	it("should be able to fetch movie videos by id", async () => {
		const response = await getMovieVideosRequest({ movieId: 1 });

		expect(response).toEqual(makeMovieVideos());
	});
});
