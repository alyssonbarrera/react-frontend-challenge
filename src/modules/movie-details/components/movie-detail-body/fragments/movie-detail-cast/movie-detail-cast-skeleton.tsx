/** biome-ignore-all lint/suspicious/noArrayIndexKey: skeleton placeholders are static */
import { Skeleton } from "@/core/components/ui/skeleton";
import { MovieDetailCastCardSkeleton } from "./fragments/movie-detail-cast-card/movie-detail-cast-card-skeleton";

const CAST_PLACEHOLDER_COUNT = 8;

export function MovieDetailCastSkeleton() {
	return (
		<section
			className="flex flex-col gap-4.5"
			data-testid="movie-detail-cast-skeleton"
		>
			<header className="flex items-center justify-between">
				<Skeleton className="h-4 w-16" />
			</header>
			<div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
				{Array.from({ length: CAST_PLACEHOLDER_COUNT }).map((_, index) => (
					<MovieDetailCastCardSkeleton key={index} />
				))}
			</div>
		</section>
	);
}
