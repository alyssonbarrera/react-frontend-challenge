import { LayoutGrid } from "lucide-react";

export function MovieDetailRelatedError() {
	return (
		<section
			className="flex items-center justify-center gap-[18px] rounded-[18px] border border-border bg-card px-8 py-9 mx-10 mb-15"
			data-testid="movie-detail-related-error"
		>
			<div className="flex size-12 items-center justify-center rounded-[24px] border border-accent-amber/25 bg-accent-amber-soft">
				<LayoutGrid className="size-[22px] text-accent-amber" />
			</div>

			<div className="flex flex-col gap-1">
				<p
					className="font-heading font-semibold text-[16px] text-foreground"
					data-testid="movie-detail-related-error-title"
				>
					Related movies unavailable
				</p>
				<p
					className="text-[13px] text-muted-foreground leading-relaxed"
					data-testid="movie-detail-related-error-description"
				>
					We couldn't fetch recommendations right now.
				</p>
			</div>
		</section>
	);
}
