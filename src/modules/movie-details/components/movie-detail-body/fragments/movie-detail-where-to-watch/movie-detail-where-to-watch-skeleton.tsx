import { Skeleton } from "@/core/components/ui/skeleton";
import {
	MovieDetailSectionShellContent,
	MovieDetailSectionShellLabel,
	MovieDetailSectionShellRoot,
} from "../movie-detail-section-shell";
import { MovieDetailSkeletonList } from "../movie-detail-skeleton-list";

const STREAMING_OPTION_COUNT = 3;

export function MovieDetailWhereToWatchSkeleton() {
	return (
		<MovieDetailSectionShellRoot
			className="gap-4 rounded-[18px] border border-border bg-card p-6"
			data-testid="movie-detail-where-to-watch-skeleton"
		>
			<MovieDetailSectionShellLabel
				rightSlot={<Skeleton className="h-5 w-10 rounded-full" />}
			>
				<Skeleton className="h-3 w-32" />
			</MovieDetailSectionShellLabel>
			<MovieDetailSectionShellContent>
				<ul className="flex flex-col gap-2.5">
					<MovieDetailSkeletonList
						count={STREAMING_OPTION_COUNT}
						renderItem={() => (
							<li
								className="flex w-full items-center gap-3 rounded-[14px] border border-border bg-surface-elevated px-4 py-3"
								data-testid="movie-detail-where-to-watch-skeleton-option"
							>
								<Skeleton className="size-4 rounded-full" />
								<Skeleton className="h-3.5 w-32" />
							</li>
						)}
					/>
				</ul>

				<Skeleton className="h-3 w-3/4" />
			</MovieDetailSectionShellContent>
		</MovieDetailSectionShellRoot>
	);
}
