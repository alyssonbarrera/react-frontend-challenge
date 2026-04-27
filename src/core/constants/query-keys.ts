export const queryKeys = {
	discovery: {
		listMovies: <TParams>(params: TParams) => ["list-movies", params] as const,
	},
	movieDetails: {
		details: (movieId: number) => ["movie-details", movieId] as const,
		credits: (movieId: number) => ["movie-credits", movieId] as const,
		videos: (movieId: number) => ["movie-videos", movieId] as const,
		watchProviders: (movieId: number) =>
			["movie-watch-providers", movieId] as const,
		recommendations: (movieId: number) =>
			["movie-recommendations", movieId] as const,
	},
} as const;
