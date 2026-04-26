import type { TmdbMovieWatchProvidersResponse } from "@/modules/movie-details/dtos/movie-watch-providers";

export function makeTmdbMovieWatchProviders(
	override?: Partial<TmdbMovieWatchProvidersResponse>,
): TmdbMovieWatchProvidersResponse {
	return {
		id: 1,
		results: {
			US: {
				link: "https://www.themoviedb.org/movie/1/watch?locale=US",
				flatrate: [
					{
						provider_id: 8,
						provider_name: "Netflix",
						logo_path: "/netflix.jpg",
						display_priority: 1,
					},
				],
				rent: [
					{
						provider_id: 2,
						provider_name: "Apple TV",
						logo_path: "/apple-tv.jpg",
						display_priority: 2,
					},
				],
				buy: [
					{
						provider_id: 10,
						provider_name: "Amazon Video",
						logo_path: "/amazon.jpg",
						display_priority: 3,
					},
				],
			},
		},
		...override,
	};
}
