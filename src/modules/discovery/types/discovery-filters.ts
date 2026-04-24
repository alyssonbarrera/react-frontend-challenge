import type {
	DISCOVERY_GENRES,
	DISCOVERY_SORT_OPTIONS,
} from "../constants/discovery-filters";

export type DiscoverySortValue =
	(typeof DISCOVERY_SORT_OPTIONS)[number]["value"];

export type DiscoveryGenre = (typeof DISCOVERY_GENRES)[number];

export type DiscoveryFilters = {
	genre: DiscoveryGenre;
	yearFrom: number;
	yearTo: number;
	minRating: number;
	sort: DiscoverySortValue;
};
