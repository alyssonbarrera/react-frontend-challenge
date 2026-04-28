import { Skeleton } from "@/core/components/ui/skeleton";
import {
	MovieDetailSectionShellContent,
	MovieDetailSectionShellLabel,
	MovieDetailSectionShellRoot,
} from "../movie-detail-section-shell";
import { MovieDetailSkeletonList } from "../movie-detail-skeleton-list";

const CREW_ROW_COUNT = 5;

export function MovieDetailKeyCrewSkeleton() {
	return (
		<MovieDetailSectionShellRoot
			className="gap-4 rounded-[18px] border border-border bg-card p-6"
			data-testid="movie-detail-key-crew-skeleton"
		>
			<MovieDetailSectionShellLabel>
				<Skeleton className="h-3 w-20" />
			</MovieDetailSectionShellLabel>
			<MovieDetailSectionShellContent>
				<dl className="flex flex-col gap-2.5">
					<MovieDetailSkeletonList
						count={CREW_ROW_COUNT}
						renderItem={() => (
							<div
								className="flex items-center justify-between gap-4"
								data-testid="movie-detail-key-crew-skeleton-item"
							>
								<Skeleton className="h-3.5 w-24" />
								<Skeleton className="h-3.5 w-32" />
							</div>
						)}
					/>
				</dl>
			</MovieDetailSectionShellContent>
		</MovieDetailSectionShellRoot>
	);
}
