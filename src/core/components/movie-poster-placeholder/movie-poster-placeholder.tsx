import { ImageOff } from "lucide-react";

export function MoviePosterPlaceholder() {
	return (
		<div
			className="flex h-full w-full flex-col items-center justify-center gap-2.5 bg-surface-elevated"
			data-testid="movie-poster-placeholder"
		>
			<div className="flex size-14 items-center justify-center rounded-full border border-border bg-surface-muted">
				<ImageOff className="size-6 text-muted-foreground" />
			</div>
			<span className="font-medium text-[12px] text-muted-foreground">
				No poster available
			</span>
		</div>
	);
}
