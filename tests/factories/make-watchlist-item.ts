import { makeMovie } from "@tests/mocks/factories/make-movie";
import type { WatchlistItem } from "@/modules/watchlist/dtos/watchlist-item";

export function makeWatchlistItem(
	override?: Partial<WatchlistItem>,
): WatchlistItem {
	const movie = makeMovie(override);

	return {
		...movie,
		addedAt:
			override?.addedAt ?? new Date("2024-01-01T00:00:00.000Z").toISOString(),
	};
}
