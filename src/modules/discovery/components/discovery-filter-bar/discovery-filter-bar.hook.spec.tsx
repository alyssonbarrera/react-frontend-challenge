import { act, renderHook } from "@tests/utils";
import type { UrlUpdateEvent } from "nuqs/adapters/testing";
import {
	DEFAULT_DISCOVERY_GENRE,
	DEFAULT_DISCOVERY_MIN_RATING,
	DEFAULT_DISCOVERY_SORT,
	DEFAULT_DISCOVERY_YEAR_FROM,
	DEFAULT_DISCOVERY_YEAR_TO,
} from "../../constants/discovery-filters";
import { useDiscoveryFilterBar } from "./discovery-filter-bar.hook";

describe("useDiscoveryFilterBar", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should be able to expose the default filters when URL is empty", () => {
		const { result } = renderHook(() => useDiscoveryFilterBar());

		const filters = result.current.filters;

		expect(filters).toEqual({
			genre: DEFAULT_DISCOVERY_GENRE,
			yearFrom: DEFAULT_DISCOVERY_YEAR_FROM,
			yearTo: DEFAULT_DISCOVERY_YEAR_TO,
			minRating: DEFAULT_DISCOVERY_MIN_RATING,
			sort: DEFAULT_DISCOVERY_SORT,
		});
	});

	it("should be able to read filters seeded by the URL", () => {
		const { result } = renderHook(() => useDiscoveryFilterBar(), {
			searchParams: {
				genre: "Drama",
				yearFrom: "1990",
				yearTo: "1999",
				minRating: "8",
				sort: "rating-desc",
			},
		});

		const filters = result.current.filters;

		expect(filters).toEqual({
			genre: "Drama",
			yearFrom: 1990,
			yearTo: 1999,
			minRating: 8,
			sort: "rating-desc",
		});
	});

	it("should be able to flag active filters", () => {
		const { result } = renderHook(() => useDiscoveryFilterBar(), {
			searchParams: {
				genre: "Drama",
				yearFrom: "1990",
				yearTo: "1999",
				minRating: "8",
			},
		});

		const {
			isGenreActive,
			isYearRangeActive,
			isMinRatingActive,
			hasActiveFilters,
		} = result.current;

		expect(isGenreActive).toBe(true);
		expect(isYearRangeActive).toBe(true);
		expect(isMinRatingActive).toBe(true);
		expect(hasActiveFilters).toBe(true);
	});

	it("should not be able to flag active filters when defaults are used", () => {
		const { result } = renderHook(() => useDiscoveryFilterBar());

		const {
			isGenreActive,
			isYearRangeActive,
			isMinRatingActive,
			hasActiveFilters,
		} = result.current;

		expect(isGenreActive).toBe(false);
		expect(isYearRangeActive).toBe(false);
		expect(isMinRatingActive).toBe(false);
		expect(hasActiveFilters).toBe(false);
	});

	it("should be able to write a non-default genre to the URL", () => {
		const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();

		const { result } = renderHook(() => useDiscoveryFilterBar(), {
			onUrlUpdate,
		});

		act(() => {
			result.current.onGenreChange("Horror");
			vi.runAllTimers();
		});

		expect(onUrlUpdate).toHaveBeenCalledTimes(1);

		const updatedSearchParams = onUrlUpdate.mock.calls[0][0].searchParams;

		expect(updatedSearchParams.get("genre")).toBe("Horror");
	});

	it("should be able to clear the genre param when the default is selected", () => {
		const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();

		const { result } = renderHook(() => useDiscoveryFilterBar(), {
			searchParams: { genre: "Horror" },
			onUrlUpdate,
		});

		act(() => {
			result.current.onGenreChange(DEFAULT_DISCOVERY_GENRE);
			vi.runAllTimers();
		});

		expect(onUrlUpdate).toHaveBeenCalledTimes(1);

		const updatedSearchParams = onUrlUpdate.mock.calls[0][0].searchParams;

		expect(updatedSearchParams.get("genre")).toBeNull();
	});

	it("should be able to write a custom year range to the URL", () => {
		const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();

		const { result } = renderHook(() => useDiscoveryFilterBar(), {
			onUrlUpdate,
		});

		act(() => {
			result.current.onYearRangeChange(1990, 1999);
			vi.runAllTimers();
		});

		const updatedSearchParams = onUrlUpdate.mock.calls[0][0].searchParams;

		expect(onUrlUpdate).toHaveBeenCalled();
		expect(onUrlUpdate).toHaveBeenCalledTimes(1);

		expect(updatedSearchParams.get("yearFrom")).toBe("1990");
		expect(updatedSearchParams.get("yearTo")).toBe("1999");
	});

	it("should be able to clear the year range when default values are selected", () => {
		const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();

		const { result } = renderHook(() => useDiscoveryFilterBar(), {
			searchParams: { yearFrom: "1990", yearTo: "1999" },
			onUrlUpdate,
		});

		act(() => {
			result.current.onYearRangeChange(
				DEFAULT_DISCOVERY_YEAR_FROM,
				DEFAULT_DISCOVERY_YEAR_TO,
			);
			vi.runAllTimers();
		});

		const updatedSearchParams = onUrlUpdate.mock.calls[0][0].searchParams;

		expect(onUrlUpdate).toHaveBeenCalled();
		expect(onUrlUpdate).toHaveBeenCalledTimes(1);

		expect(updatedSearchParams.get("yearFrom")).toBeNull();
		expect(updatedSearchParams.get("yearTo")).toBeNull();
	});

	it("should be able to write a non-default min rating to the URL", () => {
		const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();

		const { result } = renderHook(() => useDiscoveryFilterBar(), {
			onUrlUpdate,
		});

		act(() => {
			result.current.onMinRatingChange(7.5);
			vi.runAllTimers();
		});

		expect(onUrlUpdate).toHaveBeenCalled();
		expect(onUrlUpdate).toHaveBeenCalledTimes(1);

		const updatedSearchParams = onUrlUpdate.mock.calls[0][0].searchParams;

		expect(updatedSearchParams.get("minRating")).toBe("7.5");
	});

	it("should be able to write a non-default sort to the URL", () => {
		const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();

		const { result } = renderHook(() => useDiscoveryFilterBar(), {
			onUrlUpdate,
		});

		act(() => {
			result.current.onSortChange("rating-desc");
			vi.runAllTimers();
		});

		expect(onUrlUpdate).toHaveBeenCalled();
		expect(onUrlUpdate).toHaveBeenCalledTimes(1);

		const updatedSearchParams = onUrlUpdate.mock.calls[0][0].searchParams;

		expect(updatedSearchParams.get("sort")).toBe("rating-desc");
	});

	it("should be able to clear all filters at once", () => {
		const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();

		const { result } = renderHook(() => useDiscoveryFilterBar(), {
			searchParams: {
				genre: "Drama",
				yearFrom: "1990",
				yearTo: "1999",
				minRating: "8",
				sort: "rating-desc",
			},
			onUrlUpdate,
		});

		act(() => {
			result.current.onClearFilters();
			vi.runAllTimers();
		});

		const updatedSearchParams = onUrlUpdate.mock.calls[0][0].searchParams;

		expect(onUrlUpdate).toHaveBeenCalled();
		expect(onUrlUpdate).toHaveBeenCalledTimes(1);

		expect(updatedSearchParams.get("genre")).toBeNull();
		expect(updatedSearchParams.get("yearFrom")).toBeNull();
		expect(updatedSearchParams.get("yearTo")).toBeNull();
		expect(updatedSearchParams.get("minRating")).toBeNull();
		expect(updatedSearchParams.get("sort")).toBeNull();
	});

	it("should be able to notify the consumer when a filter changes", () => {
		const onFiltersChange = vi.fn();

		const { result } = renderHook(
			() => useDiscoveryFilterBar({ onFiltersChange }),
			{},
		);

		act(() => {
			result.current.onGenreChange("Horror");
		});

		expect(onFiltersChange).toHaveBeenCalled();
		expect(onFiltersChange).toHaveBeenCalledTimes(1);
		expect(onFiltersChange).toHaveBeenCalledWith(
			expect.objectContaining({ genre: "Horror" }),
		);
	});

	it("should be able to notify the consumer with the default filters when cleared", () => {
		const onFiltersChange = vi.fn();

		const { result } = renderHook(
			() => useDiscoveryFilterBar({ onFiltersChange }),
			{
				searchParams: { genre: "Drama", minRating: "8" },
			},
		);

		act(() => {
			result.current.onClearFilters();
		});

		expect(onFiltersChange).toHaveBeenCalled();
		expect(onFiltersChange).toHaveBeenCalledTimes(1);
		expect(onFiltersChange).toHaveBeenCalledWith({
			genre: DEFAULT_DISCOVERY_GENRE,
			yearFrom: DEFAULT_DISCOVERY_YEAR_FROM,
			yearTo: DEFAULT_DISCOVERY_YEAR_TO,
			minRating: DEFAULT_DISCOVERY_MIN_RATING,
			sort: DEFAULT_DISCOVERY_SORT,
		});
	});

	it("should not be able to flag isDisabled when there is no active search", () => {
		const { result } = renderHook(() => useDiscoveryFilterBar());

		expect(result.current.isDisabled).toBe(false);
	});

	it("should be able to flag isDisabled when a search query is present in the URL", () => {
		const { result } = renderHook(() => useDiscoveryFilterBar(), {
			searchParams: { q: "matrix" },
		});

		expect(result.current.isDisabled).toBe(true);
	});

	it("should not be able to flag isDisabled when the search query is only whitespace", () => {
		const { result } = renderHook(() => useDiscoveryFilterBar(), {
			searchParams: { q: "   " },
		});

		expect(result.current.isDisabled).toBe(false);
	});
});
