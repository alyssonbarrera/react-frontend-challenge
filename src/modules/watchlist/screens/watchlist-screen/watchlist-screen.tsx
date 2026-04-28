import { WatchlistEmptyState } from "../../components/watchlist-empty-state";
import { WatchlistPageHeader } from "../../components/watchlist-page-header";
import { WatchlistTable } from "../../components/watchlist-table";
import { useWatchlistScreen } from "./watchlist-screen.hook";

export function WatchlistScreen() {
	const { hasItems } = useWatchlistScreen();

	return (
		<main
			className="mx-auto flex w-full max-w-384 flex-col gap-6"
			data-testid="watchlist-screen"
		>
			<WatchlistPageHeader />
			{hasItems ? <WatchlistTable /> : <WatchlistEmptyState />}
		</main>
	);
}
