import { Loader2 } from "lucide-react";

type MovieGridFooterProps = {
	isFetchingNextPage: boolean;
	hasNextPage: boolean;
};

export function MovieGridFooter({
	isFetchingNextPage,
	hasNextPage,
}: MovieGridFooterProps) {
	if (isFetchingNextPage) {
		return (
			<div
				className="flex items-center justify-center gap-2 py-6 text-muted-foreground text-sm"
				data-testid="movie-grid-loading-more"
			>
				<Loader2 className="size-4 animate-spin" />
				<span>Loading more movies…</span>
			</div>
		);
	}

	if (!hasNextPage) {
		return (
			<div
				className="py-6 text-center text-muted-foreground text-sm"
				data-testid="movie-grid-end"
			>
				You've reached the end.
			</div>
		);
	}

	return null;
}
