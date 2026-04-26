import { Player } from "@/core/components/player";
import { MovieDetailSectionLabel } from "../movie-detail-section-label";

type MovieDetailTrailerProps = {
	title: string;
	youtubeKey: string;
};

export function MovieDetailTrailer({
	title,
	youtubeKey,
}: MovieDetailTrailerProps) {
	return (
		<section
			className="flex scroll-mt-6 flex-col gap-3.5"
			data-testid="movie-detail-trailer"
			id="movie-detail-trailer"
		>
			<MovieDetailSectionLabel data-testid="movie-detail-trailer-label">
				Trailer
			</MovieDetailSectionLabel>

			<div
				className="relative flex aspect-880/440 w-full overflow-hidden rounded-[18px] border border-border bg-surface-elevated"
				data-testid="movie-detail-trailer-box"
			>
				<Player title={title} youtubeKey={youtubeKey} />
			</div>
		</section>
	);
}
