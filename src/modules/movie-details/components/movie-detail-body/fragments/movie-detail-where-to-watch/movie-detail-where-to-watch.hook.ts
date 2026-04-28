import { getRouteApi } from "@tanstack/react-router";
import { MOVIE_DETAIL_PROVIDERS_REGION } from "@/modules/movie-details/constants/movie-detail.constants";
import type {
	MovieWatchProviders,
	WatchProviderRegion,
} from "@/modules/movie-details/dtos/movie-watch-providers";
import { useMovieWatchProvidersQuery } from "@/modules/movie-details/queries/use-movie-watch-providers-query";

type StreamingOption = {
	id: string;
	label: string;
	icon: "play" | "download" | "shopping-bag";
};

type WhereToWatchData = {
	region: string;
	options: ReadonlyArray<StreamingOption>;
	footnote: string;
};

const PROVIDERS_LOCALE = "en-US";
const STREAMING_REDIRECT_FEATURES = "noopener,noreferrer";
const providersPluralRules = new Intl.PluralRules(PROVIDERS_LOCALE);
const movieDetailRouteApi = getRouteApi("/_authenticated/movie/$id");

function buildStreamingOptions(
	regionData: WatchProviderRegion | null,
): ReadonlyArray<StreamingOption> {
	if (!regionData) {
		return [];
	}

	const options: StreamingOption[] = [];

	if (regionData.flatrate.length > 0) {
		options.push({
			id: "stream",
			label: `Stream · ${regionData.flatrate[0].providerName}`,
			icon: "play",
		});
	}

	if (regionData.rent.length > 0) {
		options.push({
			id: "rent",
			label: `Rent · ${regionData.rent[0].providerName}`,
			icon: "download",
		});
	}

	if (regionData.buy.length > 0) {
		options.push({
			id: "buy",
			label: `Buy · ${regionData.buy[0].providerName}`,
			icon: "shopping-bag",
		});
	}

	return options;
}

function buildWhereToWatch(
	watchProviders: MovieWatchProviders | undefined,
): WhereToWatchData | null {
	const regionData =
		watchProviders?.results[MOVIE_DETAIL_PROVIDERS_REGION] ?? null;
	const options = buildStreamingOptions(regionData);

	if (!regionData || options.length === 0) {
		return null;
	}

	const totalProviders =
		regionData.flatrate.length + regionData.rent.length + regionData.buy.length;
	const providerLabel =
		providersPluralRules.select(totalProviders) === "one"
			? "platform"
			: "platforms";

	return {
		options,
		region: MOVIE_DETAIL_PROVIDERS_REGION,
		footnote: `Available on ${totalProviders} ${providerLabel} in your region.`,
	};
}

export function useMovieDetailWhereToWatch() {
	const { id } = movieDetailRouteApi.useParams();
	const movieId = Number(id);
	const watchProvidersQuery = useMovieWatchProvidersQuery(movieId);
	const regionData =
		watchProvidersQuery.data?.results[MOVIE_DETAIL_PROVIDERS_REGION] ?? null;

	const whereToWatch = buildWhereToWatch(watchProvidersQuery.data);

	function handleSelectStreamingOption(optionId: string) {
		if (!regionData?.link) {
			return;
		}

		const hasSelectableOption =
			whereToWatch?.options.some((option) => option.id === optionId) ?? false;

		if (!hasSelectableOption) {
			return;
		}

		window.open(regionData.link, "_blank", STREAMING_REDIRECT_FEATURES);
	}

	function retryWhereToWatch() {
		watchProvidersQuery.refetch();
	}

	return {
		whereToWatch,
		handleSelectStreamingOption,
		isLoading: watchProvidersQuery.isLoading,
		isError: watchProvidersQuery.isError,
		retryWhereToWatch,
	};
}
