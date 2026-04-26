/** biome-ignore-all lint/suspicious/noArrayIndexKey: error placeholders are static */

import {
	MovieDetailSectionHeaderRoot,
	MovieDetailSectionHeaderTitle,
} from "../movie-detail-section-header";
import { MovieDetailSectionLabel } from "../movie-detail-section-label";
import { MovieDetailCastCardError } from "./fragments/movie-detail-cast-card/movie-detail-cast-card-error";

const CAST_ERROR_CARD_COUNT = 8;

export function MovieDetailCastError() {
	return (
		<section
			className="flex flex-col gap-4.5"
			data-testid="movie-detail-cast-error"
		>
			<MovieDetailSectionHeaderRoot>
				<MovieDetailSectionHeaderTitle>
					<MovieDetailSectionLabel data-testid="movie-detail-cast-error-label">
						Cast
					</MovieDetailSectionLabel>
				</MovieDetailSectionHeaderTitle>
			</MovieDetailSectionHeaderRoot>

			<div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
				{Array.from({ length: CAST_ERROR_CARD_COUNT }).map((_, index) => (
					<MovieDetailCastCardError key={index} />
				))}
			</div>
		</section>
	);
}
