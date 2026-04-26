export type TmdbWatchProviderResponse = {
	provider_id: number;
	provider_name: string;
	logo_path: string;
	display_priority: number;
};

export type TmdbWatchProviderRegionResponse = {
	link: string;
	flatrate?: TmdbWatchProviderResponse[];
	rent?: TmdbWatchProviderResponse[];
	buy?: TmdbWatchProviderResponse[];
};

export type TmdbMovieWatchProvidersResponse = {
	id: number;
	results: Record<string, TmdbWatchProviderRegionResponse | undefined>;
};

export type WatchProvider = {
	providerId: number;
	providerName: string;
	logoPath: string;
	displayPriority: number;
};

export type WatchProviderRegion = {
	link: string;
	flatrate: ReadonlyArray<WatchProvider>;
	rent: ReadonlyArray<WatchProvider>;
	buy: ReadonlyArray<WatchProvider>;
};

export type MovieWatchProviders = {
	movieId: number;
	results: Record<string, WatchProviderRegion | undefined>;
};
