import { CloudOff, RefreshCw, RotateCw } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { MovieDetailSectionLabel } from "../../../movie-detail-section-label";

type MovieDetailAudienceScoreErrorFallbackProps = {
	resetErrorBoundary: VoidFunction;
};

export function MovieDetailAudienceScoreErrorFallback({
	resetErrorBoundary,
}: MovieDetailAudienceScoreErrorFallbackProps) {
	return (
		<section
			className="flex flex-col gap-4 rounded-[18px] border border-border bg-card p-6"
			data-testid="movie-detail-audience-score-error-fallback"
		>
			<MovieDetailSectionLabel>Audience Score</MovieDetailSectionLabel>

			<div className="flex flex-col items-center gap-3.5 px-3 pt-2 pb-3">
				<div className="flex size-14 items-center justify-center rounded-full border border-accent-amber/25 bg-accent-amber-soft">
					<CloudOff className="size-6 text-accent-amber" />
				</div>

				<div className="flex flex-col items-center gap-1.5">
					<p
						className="font-heading font-semibold text-[16px] text-foreground"
						data-testid="movie-detail-audience-score-error-fallback-title"
					>
						Couldn't load score
					</p>
					<p className="text-center text-[13px] text-muted-foreground leading-relaxed">
						We couldn't reach the ratings service. Check your connection and try
						again.
					</p>
				</div>

				<Button
					data-testid="movie-detail-audience-score-error-fallback-retry"
					onClick={resetErrorBoundary}
					type="button"
					variant="outline"
				>
					<RotateCw className="size-3.5" />
					Try again
				</Button>
			</div>
		</section>
	);
}
