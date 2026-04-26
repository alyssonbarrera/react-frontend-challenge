/** biome-ignore-all lint/suspicious/noArrayIndexKey: skeleton placeholders are static */
import { Skeleton } from "@/core/components/ui/skeleton";

const STREAMING_OPTION_COUNT = 3;

export function MovieDetailWhereToWatchSkeleton() {
	return (
		<section
			className="flex flex-col gap-4 rounded-[18px] border border-border bg-card p-6"
			data-testid="movie-detail-where-to-watch-skeleton"
		>
			<header className="flex items-center justify-between">
				<Skeleton className="h-3 w-32" />
				<Skeleton className="h-5 w-10 rounded-full" />
			</header>

			<ul className="flex flex-col gap-2.5">
				{Array.from({ length: STREAMING_OPTION_COUNT }).map((_, index) => (
					<li
						key={index}
						className="flex w-full items-center gap-3 rounded-[14px] border border-border bg-surface-elevated px-4 py-3"
						data-testid="movie-detail-where-to-watch-skeleton-option"
					>
						<Skeleton className="size-4 rounded-full" />
						<Skeleton className="h-3.5 w-32" />
					</li>
				))}
			</ul>

			<Skeleton className="h-3 w-3/4" />
		</section>
	);
}
