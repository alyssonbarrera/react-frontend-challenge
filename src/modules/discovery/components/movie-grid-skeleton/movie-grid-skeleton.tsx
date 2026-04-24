/** biome-ignore-all lint/suspicious/noArrayIndexKey: skeleton placeholders are static */
import { Skeleton } from "@/core/components/ui/skeleton";

type MovieGridSkeletonProps = {
	count?: number;
};

export function MovieGridSkeleton({ count = 12 }: MovieGridSkeletonProps) {
	return (
		<div
			className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
			data-testid="movie-grid-skeleton"
		>
			{Array.from({ length: count }).map((_, index) => (
				<div
					key={index}
					className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
				>
					<Skeleton className="aspect-268/380 w-full rounded-none" />
					<div className="flex flex-col gap-2 px-4.5 pt-3.5 pb-4.5">
						<Skeleton className="h-4 w-3/4" />
						<Skeleton className="h-3 w-1/2" />
					</div>
				</div>
			))}
		</div>
	);
}
