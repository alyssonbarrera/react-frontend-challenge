import { ErrorBoundary } from "react-error-boundary";

import { MovieDetailHeroActions } from "./fragments/movie-detail-hero-actions";
import { MovieDetailHeroHeader } from "./fragments/movie-detail-hero-header";
import { MovieDetailHeroInfo } from "./fragments/movie-detail-hero-info";
import { MovieDetailHeroPoster } from "./fragments/movie-detail-hero-poster";
import { useMovieDetailHero } from "./movie-detail-hero.hook";
import { MovieDetailHeroError } from "./movie-detail-hero-error";
import { MovieDetailHeroSkeleton } from "./movie-detail-hero-skeleton";

function MovieDetailHeroView() {
	const {
		hero,
		movie,
		isError,
		isLoading,
		handleBack,
		handleRetry,
		handleShare,
		formattedRating,
		handlePlayTrailer,
		formattedRatingMax,
	} = useMovieDetailHero();

	if (isError) {
		return <MovieDetailHeroError onRetry={handleRetry} />;
	}

	if (isLoading) {
		return <MovieDetailHeroSkeleton />;
	}

	if (!hero || !movie) {
		return null;
	}

	return (
		<section
			className="relative isolate flex min-h-160 w-full flex-col overflow-hidden bg-surface-elevated md:h-[80vh] md:max-h-205"
			data-testid="movie-detail-hero"
		>
			<img
				loading="eager"
				fetchPriority="high"
				key={hero.backdropUrl}
				src={hero.backdropUrl}
				alt={`Backdrop from ${hero.title}`}
				className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_20%]"
				data-testid="movie-detail-hero-backdrop"
			/>
			<div
				aria-hidden
				className="-z-10 absolute inset-0 bg-linear-to-t from-[#0A0B0E] via-[#0A0B0E]/70 via-40% to-transparent"
				data-testid="movie-detail-hero-overlay"
			/>
			<div
				aria-hidden
				className="-z-10 absolute inset-0 bg-linear-to-r from-[#0A0B0E]/90 via-[#0A0B0E]/40 via-40% to-transparent"
			/>
			<div
				aria-hidden
				className="-z-10 absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[#0A0B0E]/70 to-transparent"
			/>

			<MovieDetailHeroHeader onBack={handleBack} onShare={handleShare} />

			<div className="mt-auto flex flex-row items-end gap-10 px-10 pb-10">
				<MovieDetailHeroPoster src={hero.posterUrl} alt={hero.title} />

				<div className="flex flex-1 flex-col gap-5">
					<MovieDetailHeroInfo
						primaryGenre={hero.primaryGenre}
						title={hero.title}
						formattedRating={formattedRating}
						formattedRatingMax={formattedRatingMax}
						year={hero.year}
						runtime={hero.runtime}
						director={hero.director}
					/>
					<MovieDetailHeroActions
						movie={movie}
						onPlayTrailer={handlePlayTrailer}
					/>
				</div>
			</div>
		</section>
	);
}

export function MovieDetailHero() {
	return (
		<ErrorBoundary
			fallbackRender={({ resetErrorBoundary }) => (
				<MovieDetailHeroError onRetry={resetErrorBoundary} />
			)}
		>
			<MovieDetailHeroView />
		</ErrorBoundary>
	);
}
