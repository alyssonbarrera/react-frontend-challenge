/** biome-ignore-all lint/suspicious/noArrayIndexKey: skeleton placeholders are static */
import { MovieCardSkeleton } from "../movie-card";

type MovieGridSkeletonProps = {
	count?: number;
};

export function MovieGridSkeleton({ count = 12 }: MovieGridSkeletonProps) {
	return (
		<div
			className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4"
			data-testid="movie-grid-skeleton"
		>
			{Array.from({ length: count }).map((_, index) => (
				<MovieCardSkeleton key={index} />
			))}
		</div>
	);
}
