import { Skeleton } from "@/core/components/ui/skeleton";

export function MovieDetailTrailerSkeleton() {
	return (
		<section
			className="flex flex-col gap-3.5"
			data-testid="movie-detail-trailer-skeleton"
		>
			<Skeleton className="h-3 w-16" />

			<div
				className="relative flex aspect-880/440 w-full flex-col overflow-hidden rounded-[18px] border border-border bg-surface-elevated"
				data-testid="movie-detail-trailer-skeleton-box"
			>
				<div className="relative flex flex-1 flex-col items-center justify-center gap-3.5">
					<Skeleton className="size-19.5 rounded-full" />
					<Skeleton className="h-4 w-60" />
				</div>

				<footer className="relative flex items-center justify-between px-5 py-4">
					<Skeleton className="h-3.5 w-48" />
					<Skeleton className="h-3 w-16" />
				</footer>
			</div>
		</section>
	);
}
