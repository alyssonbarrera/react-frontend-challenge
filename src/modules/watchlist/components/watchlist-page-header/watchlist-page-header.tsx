import {
	PageHeader,
	PageHeaderBadge,
	PageHeaderContent,
	PageHeaderSubtitle,
	PageHeaderTitle,
} from "@/core/components/page-header";
import { useWatchlistPageHeader } from "./watchlist-page-header.hook";

const WATCHLIST_LOCALE = "en-US";
const watchlistPluralRules = new Intl.PluralRules(WATCHLIST_LOCALE);

export function WatchlistPageHeader() {
	const { count, totalHoursLabel, lastAddedLabel } = useWatchlistPageHeader();
	const movieLabel =
		watchlistPluralRules.select(count) === "one" ? "movie" : "movies";
	const subtitle = `${count} ${movieLabel} · ${totalHoursLabel} of viewing${
		lastAddedLabel ? ` · last added ${lastAddedLabel}` : ""
	}`;

	return (
		<PageHeader
			className="flex w-full flex-col gap-1.5"
			data-testid="watchlist-page-header"
		>
			<PageHeaderContent>
				<PageHeaderBadge label="YOUR LIBRARY" />
				<PageHeaderTitle
					className="md:text-[34px]"
					data-testid="watchlist-page-header-title"
				>
					Watchlist
				</PageHeaderTitle>
				<PageHeaderSubtitle data-testid="watchlist-page-header-subtitle">
					{subtitle}
				</PageHeaderSubtitle>
			</PageHeaderContent>
		</PageHeader>
	);
}
