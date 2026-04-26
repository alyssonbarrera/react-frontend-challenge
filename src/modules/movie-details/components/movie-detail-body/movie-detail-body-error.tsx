import { ChartBar, FileText } from "lucide-react";

export function MovieDetailBodyError() {
	return (
		<section
			className="flex flex-col gap-8 px-10 pt-10 pb-15 lg:flex-row"
			data-testid="movie-detail-body-error"
		>
			<div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-3.5 rounded-[18px] border border-border bg-card px-8 py-10">
				<div className="flex size-14 items-center justify-center rounded-full border border-accent-amber/25 bg-accent-amber-soft">
					<FileText className="size-6 text-accent-amber" />
				</div>

				<div className="flex flex-col items-center gap-1.5">
					<p
						className="font-heading font-semibold text-[16px] text-foreground"
						data-testid="movie-detail-body-error-left-title"
					>
						Story details unavailable
					</p>
					<p
						className="text-center text-[13px] text-muted-foreground leading-relaxed"
						data-testid="movie-detail-body-error-left-description"
					>
						Synopsis, cast and trailer couldn't be fetched.
					</p>
				</div>
			</div>

			<aside className="flex w-full shrink-0 flex-col items-center justify-center gap-3.5 rounded-[18px] border border-border bg-card px-6 py-10 lg:w-md">
				<div className="flex size-14 items-center justify-center rounded-full border border-accent-amber/25 bg-accent-amber-soft">
					<ChartBar className="size-6 text-accent-amber" />
				</div>

				<div className="flex flex-col items-center gap-1.5">
					<p
						className="font-heading font-semibold text-[16px] text-foreground"
						data-testid="movie-detail-body-error-right-title"
					>
						Ratings & crew unavailable
					</p>
					<p
						className="text-center text-[13px] text-muted-foreground leading-relaxed"
						data-testid="movie-detail-body-error-right-description"
					>
						Audience score and key crew couldn't be loaded.
					</p>
				</div>
			</aside>
		</section>
	);
}
