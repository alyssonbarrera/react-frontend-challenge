import { Play } from "lucide-react";
import { MovieDetailSectionLabel } from "../movie-detail-section-label";

type MovieDetailTrailerProps = {
	title: string;
	quality: string;
	duration: string;
};

export function MovieDetailTrailer({
	title,
	quality,
	duration,
}: MovieDetailTrailerProps) {
	return (
		<section
			className="flex flex-col gap-3.5"
			data-testid="movie-detail-trailer"
		>
			<MovieDetailSectionLabel data-testid="movie-detail-trailer-label">
				Trailer
			</MovieDetailSectionLabel>

			<div
				className="relative flex aspect-880/440 w-full flex-col overflow-hidden rounded-[18px] border border-border bg-surface-elevated"
				data-testid="movie-detail-trailer-box"
			>
				<div
					aria-hidden
					className="absolute inset-0 bg-linear-to-b from-surface-elevated via-surface-elevated to-[#0A0B0E]/80"
					data-testid="movie-detail-trailer-placeholder"
				/>

				<div className="relative flex flex-1 flex-col items-center justify-center gap-3.5">
					<div
						className="flex size-19.5 items-center justify-center rounded-full border border-white/25 bg-white/8 shadow-[0_0_40px_rgba(77,216,230,0.25)] backdrop-blur"
						data-testid="movie-detail-trailer-play"
					>
						<Play className="size-7 fill-foreground text-foreground" />
					</div>
					<span
						className="font-heading font-semibold text-[14px] text-foreground"
						data-testid="movie-detail-trailer-cta"
					>
						Watch Official Trailer · {duration}
					</span>
				</div>

				<footer
					className="relative flex items-center justify-between px-5 py-4"
					data-testid="movie-detail-trailer-caption"
				>
					<span className="font-semibold text-[12px] text-foreground">
						{title}
					</span>
					<span className="text-[11px] text-muted-foreground">{quality}</span>
				</footer>
			</div>
		</section>
	);
}
