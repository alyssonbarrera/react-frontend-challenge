/** biome-ignore-all lint/suspicious/noArrayIndexKey: skeleton placeholders are static */
import { Skeleton } from "@/core/components/ui/skeleton";

const CAST_PLACEHOLDER_COUNT = 8;

export function MovieDetailCastSkeleton() {
	return (
		<section
			className="flex flex-col gap-4.5"
			data-testid="movie-detail-cast-skeleton"
		>
			<header className="flex items-center justify-between">
				<Skeleton className="h-3 w-16" />
			</header>
			<div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
				{Array.from({ length: CAST_PLACEHOLDER_COUNT }).map((_, index) => (
					<article
						key={index}
						className="flex flex-col items-center gap-2.5 rounded-[14px] border border-border bg-card p-4.5"
						data-testid="movie-detail-cast-skeleton-card"
					>
						<Skeleton className="size-16 rounded-full" />
						<Skeleton className="h-3.5 w-20" />
						<Skeleton className="h-3 w-14" />
					</article>
				))}
			</div>
		</section>
	);
}
