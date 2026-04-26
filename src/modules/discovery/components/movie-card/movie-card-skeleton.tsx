import { Skeleton } from "@/core/components/ui/skeleton";

export function MovieCardSkeleton() {
	return (
		<div
			className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
			data-testid="movie-card-skeleton"
		>
			<Skeleton className="aspect-268/380 w-full rounded-none" />
			<div className="flex flex-col gap-2 px-4.5 pt-3.5 pb-4.5">
				<Skeleton className="h-4 w-3/4" />
				<Skeleton className="h-3 w-1/2" />
			</div>
		</div>
	);
}
