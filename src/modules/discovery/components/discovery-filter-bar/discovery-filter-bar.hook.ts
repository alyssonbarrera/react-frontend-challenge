import {
	DEFAULT_DISCOVERY_GENRE,
	DEFAULT_DISCOVERY_MIN_RATING,
	DEFAULT_DISCOVERY_SORT,
	DEFAULT_DISCOVERY_YEAR_FROM,
	DEFAULT_DISCOVERY_YEAR_TO,
} from "../../constants/discovery-filters";
import { useDiscoveryFilters } from "../../hooks/use-discovery-filters";
import { useDiscoverySearch } from "../../hooks/use-discovery-search";
import type {
	DiscoveryFilters,
	DiscoveryGenre,
	DiscoverySortValue,
} from "../../types/discovery-filters";
import {
	isGenreFilterActive,
	isMinRatingFilterActive,
	isYearRangeFilterActive,
} from "../../utils/discovery-filters.utils";

type UseDiscoveryFilterBarParams = {
	onFiltersChange?: (filters: DiscoveryFilters) => void;
};

export function useDiscoveryFilterBar({
	onFiltersChange,
}: UseDiscoveryFilterBarParams = {}) {
	const [filters, setFilters] = useDiscoveryFilters();
	const [searchValue] = useDiscoverySearch();
	const isDisabled = searchValue.trim().length > 0;

	function notifyFiltersChange(nextFilters: DiscoveryFilters) {
		onFiltersChange?.(nextFilters);
	}

	function onGenreChange(genre: DiscoveryGenre) {
		const isDefault = genre === DEFAULT_DISCOVERY_GENRE;
		setFilters({ genre: isDefault ? null : genre });
		notifyFiltersChange({ ...filters, genre });
	}

	function onYearRangeChange(yearFrom: number, yearTo: number) {
		const isDefault =
			yearFrom === DEFAULT_DISCOVERY_YEAR_FROM &&
			yearTo === DEFAULT_DISCOVERY_YEAR_TO;
		setFilters({
			yearFrom: isDefault ? null : yearFrom,
			yearTo: isDefault ? null : yearTo,
		});
		notifyFiltersChange({ ...filters, yearFrom, yearTo });
	}

	function onMinRatingChange(minRating: number) {
		const isDefault = minRating === DEFAULT_DISCOVERY_MIN_RATING;
		setFilters({ minRating: isDefault ? null : minRating });
		notifyFiltersChange({ ...filters, minRating });
	}

	function onSortChange(sort: DiscoverySortValue) {
		const isDefault = sort === DEFAULT_DISCOVERY_SORT;
		setFilters({ sort: isDefault ? null : sort });
		notifyFiltersChange({ ...filters, sort });
	}

	function onClearFilters() {
		setFilters({
			genre: null,
			yearFrom: null,
			yearTo: null,
			minRating: null,
			sort: null,
		});
		notifyFiltersChange({
			genre: DEFAULT_DISCOVERY_GENRE,
			yearFrom: DEFAULT_DISCOVERY_YEAR_FROM,
			yearTo: DEFAULT_DISCOVERY_YEAR_TO,
			minRating: DEFAULT_DISCOVERY_MIN_RATING,
			sort: DEFAULT_DISCOVERY_SORT,
		});
	}

	const isGenreActive = isGenreFilterActive(filters);
	const isYearRangeActive = isYearRangeFilterActive(filters);
	const isMinRatingActive = isMinRatingFilterActive(filters);
	const hasActiveFilters =
		isGenreActive || isYearRangeActive || isMinRatingActive;

	return {
		filters,
		isGenreActive,
		isYearRangeActive,
		isMinRatingActive,
		hasActiveFilters,
		isDisabled,
		onGenreChange,
		onYearRangeChange,
		onMinRatingChange,
		onSortChange,
		onClearFilters,
	};
}
