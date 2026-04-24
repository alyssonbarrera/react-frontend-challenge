import {
	DEFAULT_DISCOVERY_GENRE,
	DEFAULT_DISCOVERY_MIN_RATING,
	DEFAULT_DISCOVERY_SORT,
	DEFAULT_DISCOVERY_YEAR_FROM,
	DEFAULT_DISCOVERY_YEAR_TO,
} from "../constants/discovery-filters";
import type { DiscoveryFilters } from "../types/discovery-filters";
import {
	isGenreFilterActive,
	isMinRatingFilterActive,
	isYearRangeFilterActive,
} from "./discovery-filters.utils";

const defaultDiscoveryFilters: DiscoveryFilters = {
	genre: DEFAULT_DISCOVERY_GENRE,
	yearFrom: DEFAULT_DISCOVERY_YEAR_FROM,
	yearTo: DEFAULT_DISCOVERY_YEAR_TO,
	minRating: DEFAULT_DISCOVERY_MIN_RATING,
	sort: DEFAULT_DISCOVERY_SORT,
};

describe("discoveryFiltersUtils", () => {
	it("should be able to flag genre filter as active", async () => {
		const isDiscoveryGenreFilterActive = isGenreFilterActive({
			...defaultDiscoveryFilters,
			genre: "Action",
		});

		expect(isDiscoveryGenreFilterActive).toBe(true);
	});

	it("should not be able to flag genre filter as active with default value", async () => {
		const isDiscoveryGenreFilterActive = isGenreFilterActive(
			defaultDiscoveryFilters,
		);

		expect(isDiscoveryGenreFilterActive).toBe(false);
	});

	it("should be able to flag year range filter as active", async () => {
		const isDiscoveryYearRangeFilterActive = isYearRangeFilterActive({
			...defaultDiscoveryFilters,
			yearFrom: 1990,
			yearTo: 1999,
		});

		expect(isDiscoveryYearRangeFilterActive).toBe(true);
	});

	it("should not be able to flag year range filter as active with default values", async () => {
		const isDiscoveryYearRangeFilterActive = isYearRangeFilterActive(
			defaultDiscoveryFilters,
		);

		expect(isDiscoveryYearRangeFilterActive).toBe(false);
	});

	it("should be able to flag min rating filter as active", async () => {
		const isDiscoveryMinRatingFilterActive = isMinRatingFilterActive({
			...defaultDiscoveryFilters,
			minRating: 8,
		});

		expect(isDiscoveryMinRatingFilterActive).toBe(true);
	});

	it("should not be able to flag min rating filter as active with default value", async () => {
		const isDiscoveryMinRatingFilterActive = isMinRatingFilterActive(
			defaultDiscoveryFilters,
		);

		expect(isDiscoveryMinRatingFilterActive).toBe(false);
	});
});
