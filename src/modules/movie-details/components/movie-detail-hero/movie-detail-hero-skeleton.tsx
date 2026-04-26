import { Skeleton } from "@/core/components/ui/skeleton";

const SKELETON_TONE = "bg-strong/70";

export function MovieDetailHeroSkeleton() {
	return (
		<section
			className="relative isolate flex min-h-160 w-full flex-col overflow-hidden bg-surface-elevated md:h-[80vh] md:max-h-205"
			data-testid="movie-detail-hero-skeleton"
		>
			<div
				aria-hidden
				className="-z-20 absolute inset-0 animate-pulse bg-surface-card"
				data-testid="movie-detail-hero-skeleton-backdrop"
			/>
			<div
				aria-hidden
				className="-z-10 absolute inset-0 bg-linear-to-t from-[#0A0B0E] via-[#0A0B0E]/70 via-40% to-transparent"
				data-testid="movie-detail-hero-skeleton-overlay"
			/>
			<div
				aria-hidden
				className="-z-10 absolute inset-0 bg-linear-to-r from-[#0A0B0E]/90 via-[#0A0B0E]/40 via-40% to-transparent"
			/>
			<div
				aria-hidden
				className="-z-10 absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[#0A0B0E]/70 to-transparent"
			/>

			<header
				className="flex items-center justify-between px-10 pt-6"
				data-testid="movie-detail-hero-skeleton-header"
			>
				<Skeleton className={`h-9 w-20.25 rounded-full ${SKELETON_TONE}`} />
				<div className="flex items-center gap-2">
					<Skeleton className={`size-9 rounded-full ${SKELETON_TONE}`} />
					<Skeleton className={`size-9 rounded-full ${SKELETON_TONE}`} />
				</div>
			</header>

			<div
				className="mt-auto flex flex-row items-end gap-10 px-10 pb-10"
				data-testid="movie-detail-hero-skeleton-content"
			>
				<Skeleton
					className={`aspect-280/400 w-70 rounded-xl border border-border ${SKELETON_TONE}`}
					data-testid="movie-detail-hero-skeleton-poster"
				/>

				<div className="flex flex-1 flex-col gap-5">
					<div className="flex flex-col gap-5">
						<Skeleton
							className={`h-7.25 w-17.25 rounded-full ${SKELETON_TONE}`}
						/>
						<Skeleton className={`h-10 w-3/4 ${SKELETON_TONE}`} />
						<div className="flex items-center gap-3">
							<Skeleton className={`h-4 w-16 ${SKELETON_TONE}`} />
							<Skeleton className={`h-4 w-12 ${SKELETON_TONE}`} />
							<Skeleton className={`h-4 w-14 ${SKELETON_TONE}`} />
							<Skeleton className={`h-4 w-32 ${SKELETON_TONE}`} />
						</div>
					</div>

					<div className="flex items-center gap-3">
						<Skeleton className={`h-11 w-40 rounded-xl ${SKELETON_TONE}`} />
						<Skeleton className={`h-11 w-40 rounded-xl ${SKELETON_TONE}`} />
					</div>
				</div>
			</div>
		</section>
	);
}
