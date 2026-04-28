import { Skeleton } from "@/core/components/ui/skeleton";
import {
	MovieDetailSectionShellContent,
	MovieDetailSectionShellLabel,
	MovieDetailSectionShellRoot,
} from "../movie-detail-section-shell";

export function MovieDetailSynopsisSkeleton() {
	return (
		<MovieDetailSectionShellRoot data-testid="movie-detail-synopsis-skeleton">
			<MovieDetailSectionShellLabel>
				<Skeleton className="h-4 w-24" />
			</MovieDetailSectionShellLabel>
			<MovieDetailSectionShellContent className="flex flex-col gap-2.5">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-2/3" />
			</MovieDetailSectionShellContent>
		</MovieDetailSectionShellRoot>
	);
}
