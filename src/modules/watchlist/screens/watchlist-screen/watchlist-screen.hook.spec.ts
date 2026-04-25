import { makeWatchlistItem } from "@tests/factories/make-watchlist-item";
import { renderHook } from "@tests/utils";
import { seedWatchlist } from "@tests/utils/seed-watchlist";
import { useWatchlistScreen } from "./watchlist-screen.hook";

describe("useWatchlistScreen", () => {
	beforeEach(() => {
		seedWatchlist();
	});

	it("should not be able to expose hasItems when the watchlist is empty", () => {
		const { result } = renderHook(() => useWatchlistScreen());

		expect(result.current.hasItems).toBe(false);
	});

	it("should be able to expose hasItems when the watchlist has at least one item", () => {
		seedWatchlist([
			makeWatchlistItem({ id: 1, title: "The Matrix" }),
			makeWatchlistItem({ id: 2, title: "Inception" }),
		]);

		const { result } = renderHook(() => useWatchlistScreen());

		expect(result.current.hasItems).toBe(true);
	});
});
