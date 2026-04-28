import { LayoutGrid, RefreshCcw } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import {
	MovieDetailRelatedShellEyebrow,
	MovieDetailRelatedShellHeader,
	MovieDetailRelatedShellHeaderContent,
	MovieDetailRelatedShellRoot,
	MovieDetailRelatedShellTitle,
} from "./movie-detail-related-shell";

type MovieDetailRelatedErrorProps = {
	onRetry: VoidFunction;
};

export function MovieDetailRelatedError({
	onRetry,
}: MovieDetailRelatedErrorProps) {
	return (
		<MovieDetailRelatedShellRoot data-testid="movie-detail-related-error">
			<MovieDetailRelatedShellHeader
				className="flex-col items-start justify-start"
				data-testid="movie-detail-related-error-header"
			>
				<MovieDetailRelatedShellHeaderContent>
					<MovieDetailRelatedShellEyebrow data-testid="movie-detail-related-error-eyebrow">
						You might also like
					</MovieDetailRelatedShellEyebrow>
					<MovieDetailRelatedShellTitle
						className="font-bold text-[22px] tracking-[-0.02em]"
						data-testid="movie-detail-related-error-title"
					>
						Related movies
					</MovieDetailRelatedShellTitle>
				</MovieDetailRelatedShellHeaderContent>
			</MovieDetailRelatedShellHeader>

			<div
				className="flex min-h-40 items-center justify-between gap-4.5 rounded-[18px] border border-border bg-card px-8 py-9"
				data-testid="movie-detail-related-error-card"
			>
				<div className="flex items-center gap-4.5">
					<div className="flex size-12 shrink-0 items-center justify-center rounded-3xl border border-accent-amber/25 bg-accent-amber-soft">
						<LayoutGrid className="size-5.5 text-accent-amber" />
					</div>

					<div className="flex flex-col gap-1">
						<p
							className="font-heading font-semibold text-[16px] text-foreground"
							data-testid="movie-detail-related-error-card-title"
						>
							Related movies unavailable
						</p>
						<p
							className="text-[13px] text-muted-foreground leading-relaxed"
							data-testid="movie-detail-related-error-card-description"
						>
							We couldn't fetch recommendations right now.
						</p>
					</div>
				</div>

				<Button
					type="button"
					onClick={onRetry}
					variant="outline"
					data-testid="movie-detail-related-error-retry"
				>
					<RefreshCcw className="size-3.5" />
					Try again
				</Button>
			</div>
		</MovieDetailRelatedShellRoot>
	);
}
