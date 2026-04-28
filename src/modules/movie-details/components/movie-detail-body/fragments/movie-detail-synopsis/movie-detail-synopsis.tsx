import { AsyncState } from "@/core/components/async-state";
import {
	MovieDetailSectionShellContent,
	MovieDetailSectionShellLabel,
	MovieDetailSectionShellRoot,
} from "../movie-detail-section-shell";
import { MovieDetailSynopsisError } from "./movie-detail-synopsis-error";
import { MovieDetailSynopsisSkeleton } from "./movie-detail-synopsis-skeleton";

type MovieDetailSynopsisProps = {
	synopsis?: string;
	isLoading: boolean;
	isError: boolean;
};

export function MovieDetailSynopsis({
	isError,
	synopsis,
	isLoading,
}: MovieDetailSynopsisProps) {
	return (
		<AsyncState
			errorComponent={<MovieDetailSynopsisError />}
			emptyComponent={null}
			isEmpty={!synopsis}
			isError={isError}
			isLoading={isLoading}
			loadingComponent={<MovieDetailSynopsisSkeleton />}
		>
			<MovieDetailSectionShellRoot data-testid="movie-detail-synopsis">
				<MovieDetailSectionShellLabel data-testid="movie-detail-synopsis-label">
					Synopsis
				</MovieDetailSectionShellLabel>
				<MovieDetailSectionShellContent>
					<p
						className="text-[15px] text-secondary leading-[1.65]"
						data-testid="movie-detail-synopsis-body"
					>
						{synopsis}
					</p>
				</MovieDetailSectionShellContent>
			</MovieDetailSectionShellRoot>
		</AsyncState>
	);
}
