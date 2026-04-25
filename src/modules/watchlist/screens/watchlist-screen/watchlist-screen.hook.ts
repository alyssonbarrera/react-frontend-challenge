import { useWatchlistStore } from "../../stores/watchlist-store";

export function useWatchlistScreen() {
	const items = useWatchlistStore((state) => state.items);

	return {
		hasItems: items.length > 0,
	};
}
