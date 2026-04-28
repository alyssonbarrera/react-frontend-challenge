import { makeWatchlistItem } from "@tests/factories/make-watchlist-item";
import { fireEvent, render, screen } from "@tests/utils";
import type { ReactElement } from "react";
import {
	buildColumns,
	createSortingState,
	getPaginationRange,
	mapWatchlistItemToRow,
	toSortQueryState,
	type WatchlistTableRow,
} from "./watchlist-table.utils";

const fixedNow = new Date("2026-04-25T12:00:00.000Z");

describe("watchlist-table.utils", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(fixedNow);
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should be able to create sorting state from sort query state", () => {
		const sortingState = createSortingState({
			sort: "title",
			direction: "asc",
		});

		expect(sortingState).toEqual([{ id: "title", desc: false }]);
	});

	it("should be able to create an empty sorting state when sort is not defined", () => {
		const sortingState = createSortingState({
			sort: null,
			direction: null,
		});

		expect(sortingState).toEqual([]);
	});

	it("should be able to convert sorting state to sort query state", () => {
		const sortQueryState = toSortQueryState([{ id: "rating", desc: true }]);

		expect(sortQueryState).toEqual({ sort: "rating", direction: "desc" });
	});

	it("should be able to convert release date sorting state to sort query state", () => {
		const sortQueryState = toSortQueryState([
			{ id: "release-date", desc: false },
		]);

		expect(sortQueryState).toEqual({
			sort: "release-date",
			direction: "asc",
		});
	});

	it("should be able to return null sort query state when sorting is empty", () => {
		const sortQueryState = toSortQueryState([]);

		expect(sortQueryState).toEqual({ sort: null, direction: null });
	});

	it("should be able to return null sort query state when sorting column is invalid", () => {
		const sortQueryState = toSortQueryState([
			{ id: "invalid-column", desc: false },
		]);

		expect(sortQueryState).toEqual({ sort: null, direction: null });
	});

	it("should be able to return pagination range without ellipsis for small page counts", () => {
		const paginationRange = getPaginationRange(2, 6);

		expect(paginationRange).toEqual([1, 2, 3, 4, 5, 6]);
	});

	it("should be able to return pagination range with both ellipsis for large page counts", () => {
		const paginationRange = getPaginationRange(5, 12);

		expect(paginationRange).toEqual([1, "ellipsis", 4, 5, 6, "ellipsis", 12]);
	});

	it("should be able to return empty pagination range when total pages is zero", () => {
		const paginationRange = getPaginationRange(1, 0);

		expect(paginationRange).toEqual([]);
	});

	it("should be able to map watchlist item to row with computed and normalized fields", () => {
		const watchlistItem = makeWatchlistItem({
			id: 7,
			title: "The Matrix",
			releaseDate: "1999-03-31",
			genreIds: [28],
			voteAverage: 8.7,
			posterPath: "/matrix.jpg",
			addedAt: "2026-04-24T12:00:00.000Z",
		});

		const tableRow = mapWatchlistItemToRow(watchlistItem);

		expect(tableRow).toMatchObject({
			id: 7,
			title: "The Matrix",
			releaseDateLabel: "31/03/1999",
			releaseDateValue: new Date("1999-03-31T00:00:00.000Z").getTime(),
			genreLabel: "Action",
			ratingValue: 8.7,
			ratingLabel: "8.7",
			posterPath: "/matrix.jpg",
		});
	});

	it("should be able to map watchlist item to row with fallback values", () => {
		const watchlistItem = makeWatchlistItem({
			genreIds: [],
			releaseDate: "",
			voteAverage: Number.NaN,
			posterPath: null,
			addedAt: "invalid-date",
		});

		const tableRow = mapWatchlistItemToRow(watchlistItem);

		expect(tableRow.genreLabel).toBe("Unknown");
		expect(tableRow.releaseDateLabel).toBe("—");
		expect(tableRow.releaseDateValue).toBe(0);
		expect(tableRow.ratingValue).toBe(0);
		expect(tableRow.ratingLabel).toBe("0.0");
		expect(tableRow.posterPath).toBeNull();
	});

	it("should be able to render poster fallback when title cell has no poster", () => {
		const onRemoveFromWatchlist = vi.fn();
		const onPlayMovie = vi.fn();
		const columns = buildColumns({
			onRemoveFromWatchlist,
			onPlayMovie,
		});
		const titleColumn = columns.find((column) => column.id === "title");
		const renderTitleCell = titleColumn?.cell as (params: {
			row: {
				original: WatchlistTableRow;
			};
		}) => ReactElement;

		render(
			renderTitleCell({
				row: {
					original: {
						id: 99,
						title: "Posterless Movie",
						posterPath: null,
						genreLabel: "Action",
						releaseDateLabel: "01/01/2024",
						releaseDateValue: 1704067200000,
						ratingLabel: "7.3",
						ratingValue: 7.3,
					},
				},
			}),
		);

		const watchlistTableRowPoster = screen.queryByTestId(
			"watchlist-table-row-poster",
		);
		const watchlistTableRowPosterFallback = screen.getByTestId(
			"watchlist-table-row-poster-fallback",
		);
		const watchlistTableRowTitle = screen.getByTestId(
			"watchlist-table-row-title",
		);

		expect(watchlistTableRowPoster).toBeNull();
		expect(watchlistTableRowPosterFallback).toBeDefined();
		expect(watchlistTableRowTitle.textContent).toBe("Posterless Movie");
	});

	it("should be able to build actions column and call remove callback", () => {
		const onRemoveFromWatchlist = vi.fn();
		const onPlayMovie = vi.fn();
		const columns = buildColumns({
			onRemoveFromWatchlist,
			onPlayMovie,
		});
		const actionsColumn = columns.find((column) => column.id === "actions");
		const renderActionsCell = actionsColumn?.cell as (params: {
			row: {
				original: {
					id: number;
					title: string;
				};
			};
		}) => ReactElement;

		render(
			renderActionsCell({
				row: {
					original: {
						id: 42,
						title: "The Matrix",
					},
				},
			}),
		);

		const watchlistTableRowActions = screen.getByTestId(
			"watchlist-table-row-actions",
		);
		fireEvent.pointerDown(watchlistTableRowActions);

		const watchlistTableRowRemove = screen.getByTestId(
			"watchlist-table-row-remove",
		);
		fireEvent.click(watchlistTableRowRemove);

		expect(watchlistTableRowActions).toBeDefined();
		expect(watchlistTableRowRemove).toBeDefined();
		expect(onRemoveFromWatchlist).toHaveBeenCalledTimes(1);
		expect(onRemoveFromWatchlist).toHaveBeenCalledWith(42);

		const watchlistTableRowPlay = screen.getByTestId(
			"watchlist-table-row-play",
		);
		fireEvent.click(watchlistTableRowPlay);

		expect(onPlayMovie).toHaveBeenCalledTimes(1);
		expect(onPlayMovie).toHaveBeenCalledWith(42);
	});
});
