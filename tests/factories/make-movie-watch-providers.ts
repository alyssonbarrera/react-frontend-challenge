import type { MovieWatchProviders } from "@/modules/movie-details/dtos/movie-watch-providers";

export function makeMovieWatchProviders(
	override?: Partial<MovieWatchProviders>,
): MovieWatchProviders {
	return {
		movieId: 1,
		results: {
			US: {
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
			},
		},
		...override,
	};
}
