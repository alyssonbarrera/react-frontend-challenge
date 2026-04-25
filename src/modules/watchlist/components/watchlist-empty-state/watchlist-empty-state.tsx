import { Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { Button } from "@/core/components/ui/button";

export function WatchlistEmptyState() {
	return (
		<div
			className="flex w-full flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card p-16 text-center"
			data-testid="watchlist-empty-state"
		>
			<div className="flex size-14 items-center justify-center rounded-full bg-muted">
				<Bookmark className="size-6 text-muted-foreground" />
			</div>
			<div className="flex flex-col gap-1">
				<h2 className="font-heading font-semibold text-foreground text-lg">
					Your watchlist is empty.
				</h2>
				<p className="text-muted-foreground text-sm">
					Add films from Discover to see them here.
				</p>
			</div>
			<Button asChild size="sm">
				<Link to="/discovery">Browse Discover</Link>
			</Button>
		</div>
	);
}
