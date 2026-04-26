import { Link } from "@tanstack/react-router";
import { CircleAlert, ImageOff, RotateCw, TriangleAlert } from "lucide-react";
import { Button } from "@/core/components/ui/button";

type MovieDetailHeroErrorProps = {
	onRetry: VoidFunction;
};

export function MovieDetailHeroError({ onRetry }: MovieDetailHeroErrorProps) {
	return (
		<section
			className="relative isolate flex min-h-160 w-full flex-col overflow-hidden bg-surface-elevated md:h-[80vh] md:max-h-205"
			data-testid="movie-detail-hero-error"
			role="alert"
		>
			<div
				aria-hidden
				className="-z-20 absolute inset-0 bg-surface-card"
				data-testid="movie-detail-hero-error-backdrop"
			/>
			<div
				aria-hidden
				className="-z-10 absolute inset-0 bg-linear-to-t from-[#0A0B0E] via-[#0A0B0E]/70 via-40% to-transparent"
				data-testid="movie-detail-hero-error-overlay"
			/>
			<div
				aria-hidden
				className="-z-10 absolute inset-0 bg-linear-to-r from-[#0A0B0E]/90 via-[#0A0B0E]/40 via-40% to-transparent"
			/>
			<div
				aria-hidden
				className="-z-10 absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[#0A0B0E]/70 to-transparent"
			/>

			<div className="mt-auto flex flex-row items-end gap-10 px-10 pb-10">
				<div
					className="flex aspect-280/400 w-70 shrink-0 flex-col items-center justify-center gap-3.5 overflow-hidden rounded-[18px] border border-white/10 bg-surface-input px-6 shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
					data-testid="movie-detail-hero-error-poster"
				>
					<div className="flex size-18 items-center justify-center rounded-full border border-error/25 bg-error/10">
						<ImageOff className="size-8 text-error" />
					</div>
					<p className="text-center font-heading font-bold text-[15px] text-foreground">
						Poster unavailable
					</p>
					<p className="text-center text-[12px] text-muted-foreground leading-relaxed">
						We couldn't load this image.
					</p>
				</div>

				<div className="flex max-w-190 flex-1 flex-col gap-5">
					<div className="flex items-center gap-2.5">
						<span
							className="inline-flex items-center gap-1.5 rounded-full border border-error bg-error/10 px-3 py-1.5 font-heading font-bold text-[10px] text-error tracking-[0.15em]"
							data-testid="movie-detail-hero-error-eyebrow"
						>
							<TriangleAlert className="size-2.75" />
							SOMETHING WENT WRONG
						</span>
						<span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-heading font-bold text-[10px] text-foreground tracking-[0.15em]">
							ERROR
						</span>
					</div>

					<h1
						className="font-heading font-bold text-[60px] text-foreground leading-[1.05] tracking-[-0.04em]"
						data-testid="movie-detail-hero-error-title"
					>
						We couldn't load this movie
					</h1>

					<div
						className="flex flex-wrap items-center gap-x-4.5 gap-y-1 text-[13px]"
						data-testid="movie-detail-hero-error-meta"
					>
						<span className="inline-flex items-center gap-1.5">
							<CircleAlert className="size-3.5 text-error" />
							<span className="font-heading font-bold text-foreground text-sm">
								Unexpected error
							</span>
						</span>
						<span className="text-muted-foreground">·</span>
						<span className="text-secondary">
							The movie details failed to render. Please try again.
						</span>
					</div>

					<div
						className="flex flex-wrap items-center gap-2.5 pt-3"
						data-testid="movie-detail-hero-error-actions"
					>
						<Button
							data-testid="movie-detail-hero-error-retry"
							onClick={onRetry}
							type="button"
						>
							<RotateCw className="size-3.5" />
							Try again
						</Button>

						<Button
							asChild
							variant="outline"
							data-testid="not-found-primary-action"
						>
							<Link to="/discovery">Go to Discover</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
