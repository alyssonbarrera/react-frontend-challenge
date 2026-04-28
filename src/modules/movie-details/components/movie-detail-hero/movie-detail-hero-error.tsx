import { Link } from "@tanstack/react-router";
import { CircleAlert, ImageOff, RefreshCcw, TriangleAlert } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import {
	MovieDetailHeroShellBackdrop,
	MovieDetailHeroShellBackdropLayers,
	MovieDetailHeroShellContent,
	MovieDetailHeroShellContentRow,
	MovieDetailHeroShellMain,
	MovieDetailHeroShellMobileActions,
	MovieDetailHeroShellRoot,
} from "./movie-detail-hero-shell";

type MovieDetailHeroErrorProps = {
	onRetry: VoidFunction;
};

export function MovieDetailHeroError({ onRetry }: MovieDetailHeroErrorProps) {
	return (
		<MovieDetailHeroShellRoot
			data-testid="movie-detail-hero-error"
			role="alert"
		>
			<MovieDetailHeroShellBackdropLayers
				overlayProps={{ "data-testid": "movie-detail-hero-error-overlay" }}
			>
				<MovieDetailHeroShellBackdrop
					className="bg-surface-card"
					data-testid="movie-detail-hero-error-backdrop"
				/>
			</MovieDetailHeroShellBackdropLayers>

			<MovieDetailHeroShellContent>
				<MovieDetailHeroShellContentRow>
					<div
						className="flex aspect-280/400 w-32 shrink-0 flex-col items-center justify-center gap-3.5 overflow-hidden rounded-[12px] border border-white/10 bg-surface-input px-4 shadow-[0_24px_60px_rgba(0,0,0,0.5)] sm:w-48 sm:rounded-[14px] md:w-70 md:rounded-[18px] md:px-6"
						data-testid="movie-detail-hero-error-poster"
					>
						<div className="flex size-12 items-center justify-center rounded-full border border-error/25 bg-error/10 md:size-18">
							<ImageOff className="size-5 text-error md:size-8" />
						</div>
						<p className="hidden text-center font-heading font-bold text-[15px] text-foreground sm:block">
							Poster unavailable
						</p>
						<p className="hidden text-center text-[12px] text-muted-foreground leading-relaxed sm:block">
							We couldn't load this image.
						</p>
					</div>

					<MovieDetailHeroShellMain className="max-w-190">
						<div className="flex items-center">
							<span
								className="inline-flex items-center gap-1.5 rounded-full border border-error bg-error/10 px-3 py-1.5 font-heading font-bold text-[10px] text-error tracking-[0.15em]"
								data-testid="movie-detail-hero-error-eyebrow"
							>
								<TriangleAlert className="size-2.75" />
								SOMETHING WENT WRONG
							</span>
						</div>

						<h1
							className="font-heading font-bold text-[24px] text-foreground leading-[1.05] tracking-[-0.04em] sm:text-[45px] md:text-[60px]"
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
							className="hidden flex-wrap items-center gap-2.5 pt-3 sm:flex"
							data-testid="movie-detail-hero-error-actions"
						>
							<Button
								data-testid="movie-detail-hero-error-retry"
								onClick={onRetry}
								type="button"
							>
								<RefreshCcw className="size-3.5" />
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
					</MovieDetailHeroShellMain>
				</MovieDetailHeroShellContentRow>

				<MovieDetailHeroShellMobileActions className="flex flex-wrap items-center gap-2.5">
					<Button
						data-testid="movie-detail-hero-error-retry-mobile"
						onClick={onRetry}
						type="button"
					>
						<RefreshCcw className="size-3.5" />
						Try again
					</Button>

					<Button
						asChild
						variant="outline"
						data-testid="not-found-primary-action-mobile"
					>
						<Link to="/discovery">Go to Discover</Link>
					</Button>
				</MovieDetailHeroShellMobileActions>
			</MovieDetailHeroShellContent>
		</MovieDetailHeroShellRoot>
	);
}
