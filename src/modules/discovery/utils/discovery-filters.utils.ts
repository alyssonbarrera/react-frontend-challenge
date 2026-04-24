import {
	DEFAULT_DISCOVERY_GENRE,
	DEFAULT_DISCOVERY_MIN_RATING,
	DEFAULT_DISCOVERY_YEAR_FROM,
	DEFAULT_DISCOVERY_YEAR_TO,
} from "../constants/discovery-filters";
import type { DiscoveryFilters } from "../types/discovery-filters";

export function isGenreFilterActive(filters: DiscoveryFilters): boolean {
	return filters.genre !== DEFAULT_DISCOVERY_GENRE;
}

export function isYearRangeFilterActive(filters: DiscoveryFilters): boolean {
	return (
		filters.yearFrom !== DEFAULT_DISCOVERY_YEAR_FROM ||
		filters.yearTo !== DEFAULT_DISCOVERY_YEAR_TO
	);
}

export function isMinRatingFilterActive(filters: DiscoveryFilters): boolean {
	return filters.minRating !== DEFAULT_DISCOVERY_MIN_RATING;
}
