import { fireEvent, render, screen } from "@testing-library/react";
import {
	DEFAULT_DISCOVERY_GENRE,
	DEFAULT_DISCOVERY_MIN_RATING,
	DEFAULT_DISCOVERY_SORT,
	DEFAULT_DISCOVERY_YEAR_FROM,
	DEFAULT_DISCOVERY_YEAR_TO,
} from "../../constants/discovery-filters";
import { DiscoveryFilterBar } from "./discovery-filter-bar";
import { useDiscoveryFilterBar } from "./discovery-filter-bar.hook";

vi.mock("./discovery-filter-bar.hook");

describe("DiscoveryFilterBar", () => {
	let onGenreChangeMock: ReturnType<typeof vi.fn>;
	let onYearRangeChangeMock: ReturnType<typeof vi.fn>;
	let onMinRatingChangeMock: ReturnType<typeof vi.fn>;
	let onSortChangeMock: ReturnType<typeof vi.fn>;
	let onClearFiltersMock: ReturnType<typeof vi.fn>;
	let defaultUseDiscoveryFilterBarMock: ReturnType<
		typeof useDiscoveryFilterBar
	>;

	beforeEach(() => {
		onGenreChangeMock = vi.fn();
		onYearRangeChangeMock = vi.fn();
		onMinRatingChangeMock = vi.fn();
		onSortChangeMock = vi.fn();
		onClearFiltersMock = vi.fn();

		defaultUseDiscoveryFilterBarMock = {
			filters: {
				genre: DEFAULT_DISCOVERY_GENRE,
				yearFrom: DEFAULT_DISCOVERY_YEAR_FROM,
				yearTo: DEFAULT_DISCOVERY_YEAR_TO,
				minRating: DEFAULT_DISCOVERY_MIN_RATING,
				sort: DEFAULT_DISCOVERY_SORT,
			},
			isGenreActive: false,
			isYearRangeActive: false,
			isMinRatingActive: false,
			hasActiveFilters: false,
			isDisabled: false,
			onGenreChange: onGenreChangeMock,
			onYearRangeChange: onYearRangeChangeMock,
			onMinRatingChange: onMinRatingChangeMock,
			onSortChange: onSortChangeMock,
			onClearFilters: onClearFiltersMock,
		};

		vi.mocked(useDiscoveryFilterBar).mockReturnValue(
			defaultUseDiscoveryFilterBarMock,
		);
	});

	it("should be able to render every filter chip and the sort trigger", () => {
		render(<DiscoveryFilterBar />);

		const discoveryFilterBar = screen.getByTestId("discovery-filter-bar");
		const discoveryFilterBarGenre = screen.getByTestId(
			"discovery-filter-bar-genre",
		);
		const discoveryFilterBarYear = screen.getByTestId(
			"discovery-filter-bar-year",
		);
		const discoveryFilterBarRating = screen.getByTestId(
			"discovery-filter-bar-rating",
		);
		const discoveryFilterBarSort = screen.getByTestId(
			"discovery-filter-bar-sort",
		);

		expect(discoveryFilterBar).toBeDefined();
		expect(discoveryFilterBarGenre).toBeDefined();
		expect(discoveryFilterBarYear).toBeDefined();
		expect(discoveryFilterBarRating).toBeDefined();
		expect(discoveryFilterBarSort).toBeDefined();
	});

	it("should be able to display the formatted filter values when active", () => {
		vi.mocked(useDiscoveryFilterBar).mockReturnValueOnce({
			...defaultUseDiscoveryFilterBarMock,
			filters: {
				...defaultUseDiscoveryFilterBarMock.filters,
				yearFrom: 1990,
				yearTo: 1999,
				minRating: 7.5,
				sort: "rating-desc",
			},
			isYearRangeActive: true,
			isMinRatingActive: true,
		});

		render(<DiscoveryFilterBar />);

		const discoveryFilterBarYear = screen.getByTestId(
			"discovery-filter-bar-year",
		);
		const discoveryFilterBarRating = screen.getByTestId(
			"discovery-filter-bar-rating",
		);
		const discoveryFilterBarSort = screen.getByTestId(
			"discovery-filter-bar-sort",
		);

		expect(discoveryFilterBarYear.textContent).toContain("1990");
		expect(discoveryFilterBarYear.textContent).toContain("1999");
		expect(discoveryFilterBarRating.textContent).toContain("7.5+");
		expect(discoveryFilterBarSort.textContent).toContain("Highest Rated");
	});

	it("should not be able to render the clear button when there are no active filters", () => {
		render(<DiscoveryFilterBar />);

		const discoveryFilterBarClear = screen.queryByTestId(
			"discovery-filter-bar-clear",
		);

		expect(discoveryFilterBarClear).toBeNull();
	});

	it("should be able to render the clear button when there are active filters", () => {
		vi.mocked(useDiscoveryFilterBar).mockReturnValueOnce({
			...defaultUseDiscoveryFilterBarMock,
			isGenreActive: true,
			hasActiveFilters: true,
		});

		render(<DiscoveryFilterBar />);

		const discoveryFilterBarClear = screen.getByTestId(
			"discovery-filter-bar-clear",
		);

		expect(discoveryFilterBarClear).toBeDefined();
	});

	it("should be able to call onClearFilters when the clear button is clicked", () => {
		vi.mocked(useDiscoveryFilterBar).mockReturnValueOnce({
			...defaultUseDiscoveryFilterBarMock,
			isGenreActive: true,
			hasActiveFilters: true,
		});

		render(<DiscoveryFilterBar />);

		const discoveryFilterBarClear = screen.getByTestId(
			"discovery-filter-bar-clear",
		);

		fireEvent.click(discoveryFilterBarClear);

		expect(onClearFiltersMock).toHaveBeenCalled();
		expect(onClearFiltersMock).toHaveBeenCalledTimes(1);
	});

	it("should be able to disable every filter chip and the sort trigger when isDisabled is true", () => {
		vi.mocked(useDiscoveryFilterBar).mockReturnValueOnce({
			...defaultUseDiscoveryFilterBarMock,
			isDisabled: true,
		});

		render(<DiscoveryFilterBar />);

		const discoveryFilterBarGenre = screen.getByTestId(
			"discovery-filter-bar-genre",
		);
		const discoveryFilterBarYear = screen.getByTestId(
			"discovery-filter-bar-year",
		);
		const discoveryFilterBarRating = screen.getByTestId(
			"discovery-filter-bar-rating",
		);
		const discoveryFilterBarSort = screen.getByTestId(
			"discovery-filter-bar-sort",
		);

		expect(discoveryFilterBarGenre.hasAttribute("disabled")).toBe(true);
		expect(discoveryFilterBarYear.hasAttribute("disabled")).toBe(true);
		expect(discoveryFilterBarRating.hasAttribute("disabled")).toBe(true);
		expect(discoveryFilterBarSort.hasAttribute("disabled")).toBe(true);
	});

	it("should not be able to render the clear button when isDisabled is true even with active filters", () => {
		vi.mocked(useDiscoveryFilterBar).mockReturnValueOnce({
			...defaultUseDiscoveryFilterBarMock,
			isGenreActive: true,
			hasActiveFilters: true,
			isDisabled: true,
		});

		render(<DiscoveryFilterBar />);

		const discoveryFilterBarClear = screen.queryByTestId(
			"discovery-filter-bar-clear",
		);

		expect(discoveryFilterBarClear).toBeNull();
	});
});
