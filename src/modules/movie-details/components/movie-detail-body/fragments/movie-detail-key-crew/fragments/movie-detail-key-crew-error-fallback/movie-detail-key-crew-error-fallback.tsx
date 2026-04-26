import { RefreshCw, RotateCw, UsersRound } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { MovieDetailSectionLabel } from "../../../movie-detail-section-label";

type MovieDetailKeyCrewErrorFallbackProps = {
	resetErrorBoundary: VoidFunction;
};

export function MovieDetailKeyCrewErrorFallback({
	resetErrorBoundary,
}: MovieDetailKeyCrewErrorFallbackProps) {
	return (
		<section
			className="flex flex-col gap-3.5 rounded-[18px] border border-border bg-card p-6"
			data-testid="movie-detail-key-crew-error-fallback"
		>
			<MovieDetailSectionLabel>Key Crew</MovieDetailSectionLabel>

			<div className="flex flex-col items-center gap-3.5 px-3 pt-2 pb-3">
				<div className="flex size-14 items-center justify-center rounded-full border border-accent-amber/25 bg-accent-amber-soft">
					<UsersRound className="size-6 text-accent-amber" />
				</div>

				<div className="flex flex-col items-center gap-1.5">
					<p
						className="font-heading font-semibold text-[16px] text-foreground"
						data-testid="movie-detail-key-crew-error-fallback-title"
					>
						Couldn't load crew
					</p>
					<p className="text-center text-[13px] text-muted-foreground leading-relaxed">
						Crew details are temporarily unavailable. Try again in a moment.
					</p>
				</div>

				<Button
					data-testid="movie-detail-key-crew-error-fallback-retry"
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
