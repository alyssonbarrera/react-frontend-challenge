import { FileText } from "lucide-react";
import { MovieDetailSectionLabel } from "../movie-detail-section-label";

export function MovieDetailSynopsisError() {
	return (
		<section
			className="flex flex-col gap-3.5"
			data-testid="movie-detail-synopsis-error"
		>
			<MovieDetailSectionLabel data-testid="movie-detail-synopsis-error-label">
				Synopsis
			</MovieDetailSectionLabel>

			<div className="flex items-center gap-3.5 rounded-[14px] border border-border bg-card px-5 py-4.5">
				<div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-accent-amber/25 bg-accent-amber-soft">
					<FileText className="size-4.5 text-accent-amber" />
				</div>

				<div className="flex flex-col gap-1">
					<p
						className="font-heading font-semibold text-[14px] text-foreground"
						data-testid="movie-detail-synopsis-error-title"
					>
						Synopsis unavailable
					</p>
					<p
						className="text-[13px] text-muted-foreground leading-relaxed"
						data-testid="movie-detail-synopsis-error-description"
					>
						We couldn't load the synopsis for this title right now.
					</p>
				</div>
			</div>
		</section>
	);
}
