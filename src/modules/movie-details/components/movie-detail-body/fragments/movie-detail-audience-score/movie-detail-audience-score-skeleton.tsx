import { Skeleton } from "@/core/components/ui/skeleton";
import {
	MovieDetailSectionShellContent,
	MovieDetailSectionShellLabel,
	MovieDetailSectionShellRoot,
} from "../movie-detail-section-shell";

export function MovieDetailAudienceScoreSkeleton() {
	return (
		<MovieDetailSectionShellRoot
			className="flex flex-col gap-4 rounded-[18px] border border-border bg-card p-6"
			data-testid="movie-detail-audience-score-skeleton"
		>
			<MovieDetailSectionShellLabel>
				<Skeleton className="h-3 w-28" />
			</MovieDetailSectionShellLabel>

			<MovieDetailSectionShellContent className="space-y-4">
				<div className="flex items-baseline gap-2">
					<Skeleton className="h-11 w-20" />
					<Skeleton className="h-4 w-10" />
					<Skeleton className="ml-auto h-3 w-24" />
				</div>

				<ul className="flex flex-col gap-3">
					<li
						className="flex flex-col gap-1.5"
						data-testid="movie-detail-audience-score-skeleton-bar"
					>
						<div className="flex items-center justify-between">
							<Skeleton className="h-3 w-16" />
							<Skeleton className="h-3 w-8" />
						</div>
						<Skeleton className="h-1.5 w-full rounded-full" />
					</li>
				</ul>
			</MovieDetailSectionShellContent>
		</MovieDetailSectionShellRoot>
	);
}
