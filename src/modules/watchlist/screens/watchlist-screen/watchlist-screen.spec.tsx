import { makeWatchlistItem } from "@tests/factories/make-watchlist-item";
import { render, screen } from "@tests/utils";
import { seedWatchlist } from "@tests/utils/seed-watchlist";
import { WatchlistScreen } from "./watchlist-screen";

describe("WatchlistScreen", () => {
	beforeEach(() => {
		seedWatchlist();
	});

	it("should be able to render the empty state when there are no watchlist items", () => {
		render(<WatchlistScreen />);

		const watchlistScreen = screen.getByTestId("watchlist-screen");
		const watchlistPageHeader = screen.getByTestId("watchlist-page-header");
		const watchlistEmptyState = screen.getByTestId("watchlist-empty-state");
		const watchlistTable = screen.queryByTestId("watchlist-table");

		expect(watchlistScreen).toBeDefined();
		expect(watchlistPageHeader).toBeDefined();
		expect(watchlistEmptyState).toBeDefined();
		expect(watchlistTable).toBeNull();
	});

	it("should be able to render the table when there are watchlist items", () => {
		seedWatchlist([
			makeWatchlistItem({ id: 1, title: "The Matrix" }),
			makeWatchlistItem({ id: 2, title: "Inception" }),
		]);

		render(<WatchlistScreen />);

		const watchlistScreen = screen.getByTestId("watchlist-screen");
		const watchlistPageHeader = screen.getByTestId("watchlist-page-header");
		const watchlistTable = screen.getByTestId("watchlist-table");
		const watchlistEmptyState = screen.queryByTestId("watchlist-empty-state");

		expect(watchlistScreen).toBeDefined();
		expect(watchlistPageHeader).toBeDefined();
		expect(watchlistTable).toBeDefined();
		expect(watchlistEmptyState).toBeNull();
	});
});
