import { makeWatchlistItem } from "@tests/factories/make-watchlist-item";
import { render, screen } from "@tests/utils";
import { seedWatchlist } from "@tests/utils/seed-watchlist";
import { WatchlistTable } from "./watchlist-table";

describe("WatchlistTable", () => {
	beforeEach(() => {
		seedWatchlist();
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
});
