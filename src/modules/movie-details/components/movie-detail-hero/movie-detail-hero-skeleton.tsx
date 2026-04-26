import { Skeleton } from "@/core/components/ui/skeleton";
import {
	MovieDetailHeroShellBackdrop,
	MovieDetailHeroShellBackdropLayers,
	MovieDetailHeroShellContent,
	MovieDetailHeroShellContentRow,
	MovieDetailHeroShellMain,
	MovieDetailHeroShellMobileActions,
	MovieDetailHeroShellRoot,
} from "./movie-detail-hero-shell";

const SKELETON_TONE = "bg-strong/70";

export function MovieDetailHeroSkeleton() {
	return (
		<MovieDetailHeroShellRoot data-testid="movie-detail-hero-skeleton">
			<MovieDetailHeroShellBackdropLayers
				overlayProps={{ "data-testid": "movie-detail-hero-skeleton-overlay" }}
			>
				<MovieDetailHeroShellBackdrop
					className="animate-pulse bg-surface-card"
					data-testid="movie-detail-hero-skeleton-backdrop"
				/>
			</MovieDetailHeroShellBackdropLayers>

			<header
				className="flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-6 md:px-10"
				data-testid="movie-detail-hero-skeleton-header"
			>
				<Skeleton className={`h-9 w-20.25 rounded-full ${SKELETON_TONE}`} />
				<Skeleton className={`size-9 rounded-full ${SKELETON_TONE}`} />
			</header>

			<MovieDetailHeroShellContent data-testid="movie-detail-hero-skeleton-content">
				<MovieDetailHeroShellContentRow>
					<div
						className="aspect-280/400 w-32 shrink-0 overflow-hidden rounded-[12px] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.5)] sm:w-48 sm:rounded-[14px] md:w-70 md:rounded-[18px]"
						data-testid="movie-detail-hero-skeleton-poster"
					>
						<Skeleton className={`h-full w-full ${SKELETON_TONE}`} />
					</div>

					<MovieDetailHeroShellMain>
						<div className="flex max-w-190 flex-col gap-5">
							<Skeleton
								className={`h-7.25 w-17.25 rounded-full ${SKELETON_TONE}`}
							/>
							<Skeleton className={`h-10 w-3/4 ${SKELETON_TONE}`} />
							<div className="flex flex-wrap items-center gap-x-4.5 gap-y-1">
								<Skeleton className={`h-4 w-16 ${SKELETON_TONE}`} />
								<Skeleton className={`h-4 w-12 ${SKELETON_TONE}`} />
								<Skeleton className={`h-4 w-14 ${SKELETON_TONE}`} />
								<Skeleton className={`h-4 w-32 ${SKELETON_TONE}`} />
							</div>
						</div>

						<div className="hidden flex-wrap items-center gap-2.5 pt-3 sm:flex">
							<Skeleton className={`h-11 w-40 rounded-xl ${SKELETON_TONE}`} />
							<Skeleton className={`h-11 w-40 rounded-xl ${SKELETON_TONE}`} />
						</div>
					</MovieDetailHeroShellMain>
				</MovieDetailHeroShellContentRow>

				<MovieDetailHeroShellMobileActions className="flex flex-wrap items-center gap-2.5 pt-3">
					<Skeleton className={`h-11 flex-1 rounded-xl ${SKELETON_TONE}`} />
					<Skeleton className={`h-11 flex-1 rounded-xl ${SKELETON_TONE}`} />
				</MovieDetailHeroShellMobileActions>
			</MovieDetailHeroShellContent>
		</MovieDetailHeroShellRoot>
	);
}
