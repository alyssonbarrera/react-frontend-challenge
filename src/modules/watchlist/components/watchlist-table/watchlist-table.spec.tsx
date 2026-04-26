import { useNavigate } from "@tanstack/react-router";
import { makeWatchlistItem } from "@tests/factories/make-watchlist-item";
import { fireEvent, render, screen, waitFor } from "@tests/utils";
import { seedWatchlist } from "@tests/utils/seed-watchlist";
import type { UrlUpdateEvent } from "nuqs/adapters/testing";
import { WatchlistTable } from "./watchlist-table";

describe("WatchlistTable", () => {
	const navigateMock = vi.fn();

	beforeEach(() => {
		seedWatchlist();
		vi.mocked(useNavigate).mockReturnValue(navigateMock);
	});

	it("should be able to render the watchlist table correctly", () => {
		seedWatchlist([
			makeWatchlistItem({ id: 1, title: "The Matrix" }),
			makeWatchlistItem({ id: 2, title: "Inception" }),
		]);

		render(<WatchlistTable />);

		const watchlistTableHeaderTitle = screen.getByTestId(
			"watchlist-table-header-title",
		);
		const watchlistTableHeaderGenre = screen.getByTestId(
			"watchlist-table-header-genre",
		);
		const watchlistTableHeaderReleaseDate = screen.getByTestId(
			"watchlist-table-header-release-date",
		);
		const watchlistTableHeaderRating = screen.getByTestId(
			"watchlist-table-header-rating",
		);
		const watchlistTableHeaderActions = screen.getByTestId(
			"watchlist-table-header-actions",
		);
		const watchlistTableHeaderAdded = screen.queryByTestId(
			"watchlist-table-header-added",
		);

		const watchlistTable = screen.getByTestId("watchlist-table");
		const watchlistTableRows = screen.getAllByTestId("watchlist-table-row");

		expect(watchlistTable).toBeDefined();
		expect(watchlistTableRows).toHaveLength(2);

		expect(watchlistTableHeaderTitle).toBeDefined();
		expect(watchlistTableHeaderGenre).toBeDefined();
		expect(watchlistTableHeaderReleaseDate).toBeDefined();
		expect(watchlistTableHeaderRating).toBeDefined();
		expect(watchlistTableHeaderActions).toBeDefined();
		expect(watchlistTableHeaderAdded).toBeNull();
	});

	it("should be able to render the inline no-results message when the search returns nothing", () => {
		seedWatchlist([
			makeWatchlistItem({ id: 1, title: "The Matrix" }),
			makeWatchlistItem({ id: 2, title: "Inception" }),
		]);

		render(<WatchlistTable />, {
			searchParams: { q: "torrone" },
		});

		const noResultsRow = screen.getByTestId("watchlist-table-no-results-row");
		const noResultsMessage = screen.getByTestId(
			"watchlist-table-no-results-message",
		);
		const watchlistTableRows = screen.queryAllByTestId("watchlist-table-row");

		expect(noResultsRow).toBeDefined();
		expect(noResultsMessage.textContent).toContain("torrone");
		expect(watchlistTableRows).toHaveLength(0);
	});

	it("should not be able to render the no-results message when the watchlist is empty without an active search", () => {
		render(<WatchlistTable />);

		const noResultsRow = screen.queryByTestId("watchlist-table-no-results-row");
		const watchlistTableRows = screen.queryAllByTestId("watchlist-table-row");

		expect(noResultsRow).toBeNull();
		expect(watchlistTableRows).toHaveLength(0);
	});

	it("should be able to render only the rows that match the search query", () => {
		seedWatchlist([
			makeWatchlistItem({ id: 1, title: "The Matrix" }),
			makeWatchlistItem({ id: 2, title: "Inception" }),
			makeWatchlistItem({ id: 3, title: "The Matrix Reloaded" }),
		]);

		render(<WatchlistTable />, {
			searchParams: { q: "matrix" },
		});

		const watchlistTableRows = screen.getAllByTestId("watchlist-table-row");
		const noResultsRow = screen.queryByTestId("watchlist-table-no-results-row");

		expect(watchlistTableRows).toHaveLength(2);
		expect(noResultsRow).toBeNull();
	});

	it("should be able to move to the previous valid page when removing the last item from the current page", async () => {
		seedWatchlist(
			Array.from({ length: 21 }, (_, index) =>
				makeWatchlistItem({ id: index + 1, title: `Movie ${index + 1}` }),
			),
		);

		const urlUpdates: UrlUpdateEvent[] = [];
		const onUrlUpdate = (event: UrlUpdateEvent) => {
			urlUpdates.push(event);
		};

		render(<WatchlistTable />, {
			searchParams: { page: "3" },
			onUrlUpdate,
		});

		const watchlistTableRowActions = screen.getByTestId(
			"watchlist-table-row-actions",
		);
		fireEvent.pointerDown(watchlistTableRowActions);

		const watchlistTableRowRemove = screen.getByTestId(
			"watchlist-table-row-remove",
		);
		fireEvent.click(watchlistTableRowRemove);

		await waitFor(() => {
			const paginationInfo = screen.getByTestId(
				"watchlist-table-pagination-info",
			);
			expect(paginationInfo.textContent).toContain("11");
			expect(paginationInfo.textContent).toContain("20");
			expect(
				screen.queryByTestId("watchlist-table-pagination-page-3"),
			).toBeNull();
		});

		const pageUpdate = urlUpdates.find(
			(event) => event.searchParams.get("page") === "2",
		);

		expect(pageUpdate).toBeDefined();
	});

	it("should be able to navigate to movie details when play button is clicked", () => {
		seedWatchlist([makeWatchlistItem({ id: 42, title: "The Matrix" })]);

		render(<WatchlistTable />);

		const watchlistTableRowPlay = screen.getByTestId(
			"watchlist-table-row-play",
		);
		fireEvent.click(watchlistTableRowPlay);

		expect(navigateMock).toHaveBeenCalledTimes(1);
		expect(navigateMock).toHaveBeenCalledWith({
			to: "/movie/$id",
			params: { id: "42" },
		});
	});
});
