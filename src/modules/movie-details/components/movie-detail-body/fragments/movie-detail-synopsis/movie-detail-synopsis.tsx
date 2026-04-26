import { MovieDetailSectionLabel } from "../movie-detail-section-label";

type MovieDetailSynopsisProps = {
	synopsis: string;
};

export function MovieDetailSynopsis({ synopsis }: MovieDetailSynopsisProps) {
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
