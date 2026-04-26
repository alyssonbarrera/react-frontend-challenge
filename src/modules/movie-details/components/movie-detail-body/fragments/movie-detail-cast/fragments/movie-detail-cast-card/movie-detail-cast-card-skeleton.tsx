import { Skeleton } from "@/core/components/ui/skeleton";

export function MovieDetailCastCardSkeleton() {
	return (
		<article
			className="flex flex-col items-center gap-2.5 rounded-[14px] border border-border bg-card p-4.5"
			data-testid="movie-detail-cast-skeleton-card"
		>
			<Skeleton className="size-16 rounded-full" />
			<Skeleton className="h-3.5 w-20" />
			<Skeleton className="h-3 w-14" />
		</article>
	);
}
