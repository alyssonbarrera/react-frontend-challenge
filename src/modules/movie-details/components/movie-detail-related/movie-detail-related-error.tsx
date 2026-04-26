import { LayoutGrid, RotateCw } from "lucide-react";
import { Button } from "@/core/components/ui/button";

type MovieDetailRelatedErrorProps = {
	onRetry: VoidFunction;
};

export function MovieDetailRelatedError({
	onRetry,
}: MovieDetailRelatedErrorProps) {
	return (
		<section
			className="flex items-center justify-center gap-4.5 rounded-[18px] border border-border bg-card px-8 py-9 mx-10 mb-15"
			data-testid="movie-detail-related-error"
		>
			<div className="flex size-12 items-center justify-center rounded-[24px] border border-accent-amber/25 bg-accent-amber-soft">
				<LayoutGrid className="size-5.5 text-accent-amber" />
			</div>

			<div className="flex flex-col gap-3">
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

				<Button
					data-testid="movie-detail-related-error-retry"
					onClick={onRetry}
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
