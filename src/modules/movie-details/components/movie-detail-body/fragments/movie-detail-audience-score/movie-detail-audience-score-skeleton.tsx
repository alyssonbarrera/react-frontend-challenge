/** biome-ignore-all lint/suspicious/noArrayIndexKey: skeleton placeholders are static */
import { Skeleton } from "@/core/components/ui/skeleton";

const SCORE_BAR_COUNT = 4;

export function MovieDetailAudienceScoreSkeleton() {
	return (
		<section
			className="flex flex-col gap-4 rounded-[18px] border border-border bg-card p-6"
			data-testid="movie-detail-audience-score-skeleton"
		>
			<Skeleton className="h-3 w-28" />

			<div className="flex items-baseline gap-2">
				<Skeleton className="h-11 w-20" />
				<Skeleton className="h-4 w-10" />
				<Skeleton className="ml-auto h-3 w-24" />
			</div>

			<ul className="flex flex-col gap-3">
				{Array.from({ length: SCORE_BAR_COUNT }).map((_, index) => (
					<li
						key={index}
						className="flex flex-col gap-1.5"
						data-testid="movie-detail-audience-score-skeleton-bar"
					>
						<div className="flex items-center justify-between">
							<Skeleton className="h-3 w-16" />
							<Skeleton className="h-3 w-8" />
						</div>
						<Skeleton className="h-1.5 w-full rounded-full" />
					</li>
				))}
			</ul>
		</section>
	);
}
