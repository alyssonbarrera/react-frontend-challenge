import { Film, RefreshCw, RotateCw } from "lucide-react";
import { Button } from "@/core/components/ui/button";

type MovieCardErrorFallbackProps = {
	resetErrorBoundary: VoidFunction;
};

export function MovieCardErrorFallback({
	resetErrorBoundary,
}: MovieCardErrorFallbackProps) {
	return (
		<article
			role="alert"
			className="flex h-full w-full flex-col items-center justify-center gap-3.5 rounded-2xl border border-border bg-card px-4 py-6"
			data-testid="movie-card-error-fallback"
		>
			<div className="flex size-14 items-center justify-center rounded-full border border-accent-amber/25 bg-accent-amber-soft">
				<Film className="size-6 text-accent-amber" />
			</div>

			<div className="flex flex-col items-center gap-1.5">
				<p
					className="font-heading font-semibold text-[16px] text-foreground"
					data-testid="movie-card-error-fallback-title"
				>
					Couldn't load movie
				</p>
				<p className="text-center text-[13px] text-muted-foreground leading-relaxed">
					This title is temporarily unavailable. Try again in a moment.
				</p>
			</div>

			<Button
				data-testid="movie-card-error-fallback-retry"
				onClick={resetErrorBoundary}
				type="button"
				variant="outline"
			>
				<RotateCw className="size-3.5" />
				Try again
			</Button>
		</article>
	);
}
