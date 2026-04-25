import type { WatchlistItem } from "@/modules/watchlist/dtos/watchlist-item";
import { useWatchlistStore } from "@/modules/watchlist/stores/watchlist-store";

export function seedWatchlist(items: WatchlistItem[] = []) {
	useWatchlistStore.setState({ items });
}
