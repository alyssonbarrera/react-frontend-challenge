/** biome-ignore-all lint/suspicious/noArrayIndexKey: skeleton placeholders are static */
import { Skeleton } from "@/core/components/ui/skeleton";

const CREW_ROW_COUNT = 5;

export function MovieDetailKeyCrewSkeleton() {
	return (
		<section
			className="flex flex-col gap-4 rounded-[18px] border border-border bg-card p-6"
			data-testid="movie-detail-key-crew-skeleton"
		>
			<Skeleton className="h-3 w-20" />

			<dl className="flex flex-col gap-2.5">
				{Array.from({ length: CREW_ROW_COUNT }).map((_, index) => (
					<div
						key={index}
						className="flex items-center justify-between gap-4"
						data-testid="movie-detail-key-crew-skeleton-item"
					>
						<Skeleton className="h-3.5 w-24" />
						<Skeleton className="h-3.5 w-32" />
					</div>
				))}
			</dl>
		</section>
	);
}
