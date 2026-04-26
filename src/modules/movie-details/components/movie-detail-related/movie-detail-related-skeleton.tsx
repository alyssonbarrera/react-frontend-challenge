/** biome-ignore-all lint/suspicious/noArrayIndexKey: skeleton placeholders are static */
import { Skeleton } from "@/core/components/ui/skeleton";
import { MovieCardSkeleton } from "@/modules/discovery/components/movie-card";

const RELATED_CARD_COUNT = 4;

export function MovieDetailRelatedSkeleton() {
	return (
		<section
			className="flex flex-col gap-5 px-10 pt-5 pb-15"
			data-testid="movie-detail-related-skeleton"
		>
			<header className="flex items-end justify-between gap-4">
				<div className="flex flex-col gap-1.5">
					<Skeleton className="h-3 w-40" />
					<Skeleton className="h-7 w-48" />
				</div>
				<Skeleton className="h-3.5 w-24" />
			</header>

			<div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
				{Array.from({ length: RELATED_CARD_COUNT }).map((_, index) => (
					<MovieCardSkeleton key={index} />
				))}
			</div>
		</section>
	);
}
