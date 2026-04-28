import type {
	MovieWatchProviders,
	TmdbMovieWatchProvidersResponse,
	TmdbWatchProviderRegionResponse,
	TmdbWatchProviderResponse,
	WatchProvider,
	WatchProviderRegion,
} from "../dtos/movie-watch-providers";

function mapWatchProvider(raw: TmdbWatchProviderResponse): WatchProvider {
	return {
		providerId: raw.provider_id,
		providerName: raw.provider_name,
		logoPath: raw.logo_path,
		displayPriority: raw.display_priority,
	};
}

function mapWatchProviderRegion(
	raw: TmdbWatchProviderRegionResponse,
): WatchProviderRegion {
	return {
		link: raw.link,
		flatrate: (raw.flatrate ?? []).map(mapWatchProvider),
		rent: (raw.rent ?? []).map(mapWatchProvider),
		buy: (raw.buy ?? []).map(mapWatchProvider),
	};
}

export function mapTmdbMovieWatchProviders(
	raw: TmdbMovieWatchProvidersResponse,
): MovieWatchProviders {
	const results: Record<string, WatchProviderRegion | undefined> = {};

	for (const [region, regionData] of Object.entries(raw.results)) {
		if (regionData) {
			results[region] = mapWatchProviderRegion(regionData);
		}
	}

	return {
		movieId: raw.id,
		results,
	};
}
