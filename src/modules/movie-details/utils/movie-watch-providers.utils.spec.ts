import { makeTmdbMovieWatchProviders } from "@tests/factories/make-tmdb-movie-watch-providers";
import { mapTmdbMovieWatchProviders } from "./movie-watch-providers.utils";

describe("movieWatchProvidersUtils", () => {
	it("should be able to map tmdb watch providers into the app contract", () => {
		const rawWatchProviders = makeTmdbMovieWatchProviders();

		const watchProviders = mapTmdbMovieWatchProviders(rawWatchProviders);

		expect(watchProviders.movieId).toBe(1);
		expect(watchProviders.results.US).toEqual({
			link: "https://www.themoviedb.org/movie/1/watch?locale=US",
			flatrate: [
				{
					providerId: 8,
					providerName: "Netflix",
					logoPath: "/netflix.jpg",
					displayPriority: 1,
				},
			],
			rent: [
				{
					providerId: 2,
					providerName: "Apple TV",
					logoPath: "/apple-tv.jpg",
					displayPriority: 2,
				},
			],
			buy: [
				{
					providerId: 10,
					providerName: "Amazon Video",
					logoPath: "/amazon.jpg",
					displayPriority: 3,
				},
			],
		});
	});

	it("should be able to ignore undefined tmdb region entries", () => {
		const rawWatchProviders = makeTmdbMovieWatchProviders({
			results: {
				BR: undefined,
				US: {
					link: "https://www.themoviedb.org/movie/1/watch?locale=US",
				},
			},
		});

		const watchProviders = mapTmdbMovieWatchProviders(rawWatchProviders);

		expect(watchProviders.results.BR).toBeUndefined();
		expect(watchProviders.results.US?.flatrate).toEqual([]);
		expect(watchProviders.results.US?.rent).toEqual([]);
		expect(watchProviders.results.US?.buy).toEqual([]);
	});
});
