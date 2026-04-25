import { makeWatchlistItem } from "@tests/factories/make-watchlist-item";
import { render, screen } from "@tests/utils";
import { seedWatchlist } from "@tests/utils/seed-watchlist";
import { WatchlistPageHeader } from "./watchlist-page-header";

const fixedNow = new Date("2026-04-25T12:00:00.000Z");

describe("WatchlistPageHeader", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(fixedNow);
		seedWatchlist();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should be able to render the base subtitle when there are no items", () => {
		render(<WatchlistPageHeader />);

		const watchlistPageHeader = screen.getByTestId("watchlist-page-header");
		const watchlistPageHeaderTitle = screen.getByTestId(
			"watchlist-page-header-title",
		);
		const watchlistPageHeaderSubtitle = screen.getByTestId(
			"watchlist-page-header-subtitle",
		);

		expect(watchlistPageHeader).toBeDefined();
		expect(watchlistPageHeaderTitle.textContent).toBe("Watchlist");
		expect(watchlistPageHeaderSubtitle.textContent).toBe(
			"0 films · 0 hours of viewing",
		);
	});

	it("should be able to render count, viewing hours and last added text when items exist", () => {
		seedWatchlist([
			makeWatchlistItem({
				id: 1,
				title: "The Matrix",
				addedAt: "2026-04-24T10:00:00.000Z",
			}),
			makeWatchlistItem({
				id: 2,
				title: "Inception",
				addedAt: "2026-04-20T10:00:00.000Z",
			}),
		]);

		render(<WatchlistPageHeader />);

		const watchlistPageHeaderSubtitle = screen.getByTestId(
			"watchlist-page-header-subtitle",
		);

		expect(watchlistPageHeaderSubtitle.textContent).toContain("2 films");
		expect(watchlistPageHeaderSubtitle.textContent).toContain(
			"4 hours of viewing",
		);
		expect(watchlistPageHeaderSubtitle.textContent).toContain(
			"last added 1 day ago",
		);
	});
});
