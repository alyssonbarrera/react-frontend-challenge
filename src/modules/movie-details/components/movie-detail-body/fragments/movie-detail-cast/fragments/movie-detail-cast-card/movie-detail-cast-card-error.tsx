import { ImageOff } from "lucide-react";

export function MovieDetailCastCardError() {
	return (
		<article
			className="flex flex-col items-center gap-2.5 rounded-[14px] border border-border bg-card p-4.5"
			data-testid="movie-detail-cast-card-error"
		>
			<div className="flex size-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
				<ImageOff className="size-5 text-accent-amber" />
			</div>

			<div className="flex flex-col items-center">
				<span className="font-heading font-semibold text-[13px] text-muted-foreground">
					Unavailable
				</span>
				<span className="text-[11px] text-muted-foreground/70">
					Couldn't load
				</span>
			</div>
		</article>
	);
}
