import { Skeleton } from "@/core/components/ui/skeleton";

export function MovieDetailSynopsisSkeleton() {
	return (
		<section
			className="flex flex-col gap-3.5"
			data-testid="movie-detail-synopsis-skeleton"
		>
			<Skeleton className="h-4 w-24" />
			<div className="flex flex-col gap-2.5">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-2/3" />
			</div>
		</section>
	);
}
