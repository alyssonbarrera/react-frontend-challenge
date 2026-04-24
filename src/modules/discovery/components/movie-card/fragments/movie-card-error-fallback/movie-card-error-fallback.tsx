import { AlertTriangle } from "lucide-react";

export function MovieCardErrorFallback() {
	return (
		<div
			role="alert"
			className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl border border-border border-dashed bg-card/50 p-4 text-center text-muted-foreground"
			data-testid="movie-card-error-fallback"
		>
			<AlertTriangle className="size-5 text-destructive" />
			<p className="text-xs">Couldn't load this movie.</p>
		</div>
	);
}
