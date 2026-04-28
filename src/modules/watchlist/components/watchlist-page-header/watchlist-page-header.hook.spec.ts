import { makeWatchlistItem } from "@tests/factories/make-watchlist-item";
import { renderHook } from "@tests/utils";
import { seedWatchlist } from "@tests/utils/seed-watchlist";
import { useWatchlistPageHeader } from "./watchlist-page-header.hook";

const fixedNow = new Date("2026-04-25T12:00:00.000Z");

describe("useWatchlistPageHeader", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(fixedNow);
		seedWatchlist();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should be able to expose zero-count labels when the watchlist is empty", () => {
		const { result } = renderHook(() => useWatchlistPageHeader());

		expect(result.current.count).toBe(0);
		expect(result.current.totalHoursLabel).toBe("0 hours");
		expect(result.current.lastAddedLabel).toBeNull();
	});

	it("should be able to expose count, hours and lastAddedLabel for a non-empty watchlist", () => {
		const newestWatchlistItem = makeWatchlistItem({
			id: 1,
			title: "The Matrix",
			addedAt: "2026-04-24T10:00:00.000Z",
		});

		const olderWatchlistItem = makeWatchlistItem({
			id: 2,
			title: "Inception",
			addedAt: "2026-04-20T10:00:00.000Z",
		});

		seedWatchlist([newestWatchlistItem, olderWatchlistItem]);

		const { result } = renderHook(() => useWatchlistPageHeader());

		expect(result.current.count).toBe(2);
		expect(result.current.totalHoursLabel).toBe("4 hours");
		expect(result.current.lastAddedLabel).toBe("1 day ago");
	});
});
