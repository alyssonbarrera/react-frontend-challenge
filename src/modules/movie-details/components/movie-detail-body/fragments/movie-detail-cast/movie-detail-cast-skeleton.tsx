import { Skeleton } from "@/core/components/ui/skeleton";
import {
	MovieDetailSectionHeaderRoot,
	MovieDetailSectionHeaderTitle,
} from "../movie-detail-section-header";
import { MovieDetailSkeletonList } from "../movie-detail-skeleton-list";
import { MovieDetailCastCardSkeleton } from "./fragments/movie-detail-cast-card/movie-detail-cast-card-skeleton";

const CAST_PLACEHOLDER_COUNT = 8;

export function MovieDetailCastSkeleton() {
	return (
		<section
			className="flex flex-col gap-4.5"
			data-testid="movie-detail-cast-skeleton"
		>
			<MovieDetailSectionHeaderRoot>
				<MovieDetailSectionHeaderTitle>
					<Skeleton className="h-4 w-16" />
				</MovieDetailSectionHeaderTitle>
			</MovieDetailSectionHeaderRoot>
			<div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
				<MovieDetailSkeletonList
					count={CAST_PLACEHOLDER_COUNT}
					renderItem={() => <MovieDetailCastCardSkeleton />}
				/>
			</div>
		</section>
	);
}
