import { Skeleton } from "@/core/components/ui/skeleton";
import { MovieCardSkeleton } from "@/modules/discovery/components/movie-card";
import { MovieDetailSkeletonList } from "../movie-detail-body/fragments/movie-detail-skeleton-list";
import {
	MovieDetailRelatedShellGrid,
	MovieDetailRelatedShellHeader,
	MovieDetailRelatedShellHeaderContent,
	MovieDetailRelatedShellRoot,
} from "./movie-detail-related-shell";

const RELATED_CARD_COUNT = 4;

export function MovieDetailRelatedSkeleton() {
	return (
		<MovieDetailRelatedShellRoot
			className="pt-5"
			data-testid="movie-detail-related-skeleton"
		>
			<MovieDetailRelatedShellHeader>
				<MovieDetailRelatedShellHeaderContent>
					<Skeleton className="h-3 w-40" />
					<Skeleton className="h-7 w-48" />
				</MovieDetailRelatedShellHeaderContent>
				<Skeleton className="h-3.5 w-24" />
			</MovieDetailRelatedShellHeader>

			<MovieDetailRelatedShellGrid>
				<MovieDetailSkeletonList
					count={RELATED_CARD_COUNT}
					renderItem={() => <MovieCardSkeleton />}
				/>
			</MovieDetailRelatedShellGrid>
		</MovieDetailRelatedShellRoot>
	);
}
