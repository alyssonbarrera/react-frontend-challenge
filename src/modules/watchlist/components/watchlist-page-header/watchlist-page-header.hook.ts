import { useWatchlistStore } from "../../stores/watchlist-store";
import { timeAgo } from "../../utils/time-ago";

const ESTIMATED_MINUTES_PER_FILM = 110;
const MINUTES_PER_HOUR = 60;

export function useWatchlistPageHeader() {
	const items = useWatchlistStore((state) => state.items);

	const count = items.length;
	const totalMinutes = count * ESTIMATED_MINUTES_PER_FILM;
	const totalHours = Math.round(totalMinutes / MINUTES_PER_HOUR);
	const totalHoursLabel = `${totalHours} ${totalHours === 1 ? "hour" : "hours"}`;

	const mostRecent = items[0];
	const lastAddedLabel = mostRecent ? timeAgo(mostRecent.addedAt) : null;

	return {
		count,
		totalHoursLabel,
		lastAddedLabel,
	};
}
