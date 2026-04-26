import { makeTmdbMovieVideos } from "@tests/factories/make-tmdb-movie-videos";
import { mapTmdbMovieVideos } from "./movie-videos.utils";

describe("movieVideosUtils", () => {
	it("should be able to map tmdb movie videos into the app contract", () => {
		const rawMovieVideos = makeTmdbMovieVideos();

		const movieVideos = mapTmdbMovieVideos(rawMovieVideos);

		expect(movieVideos.movieId).toBe(1);
		expect(movieVideos.results).toHaveLength(1);
		expect(movieVideos.results[0]).toEqual({
			id: "v1",
			key: "L3pk_TBkihU",
			name: "Tenet — Official Trailer",
			site: "YouTube",
			type: "Trailer",
			size: 1080,
			official: true,
			publishedAt: "2020-05-21T13:00:00.000Z",
		});
	});

	it("should be able to map tmdb movie videos with empty results", () => {
		const rawMovieVideos = makeTmdbMovieVideos({ results: [] });

		const movieVideos = mapTmdbMovieVideos(rawMovieVideos);

		expect(movieVideos.results).toEqual([]);
	});
});
