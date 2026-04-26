import { MovieDetailSectionLabel } from "../movie-detail-section-label";
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
	if (isError) {
		return <MovieDetailSynopsisError />;
	}

	if (isLoading) {
		return <MovieDetailSynopsisSkeleton />;
	}

	if (!synopsis) {
		return null;
	}

	return (
		<section
			className="flex flex-col gap-3.5"
			data-testid="movie-detail-synopsis"
		>
			<MovieDetailSectionLabel data-testid="movie-detail-synopsis-label">
				Synopsis
			</MovieDetailSectionLabel>
			<p
				className="text-[15px] text-secondary leading-[1.65]"
				data-testid="movie-detail-synopsis-body"
			>
				{synopsis}
			</p>
		</section>
	);
}
