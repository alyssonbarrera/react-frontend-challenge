import { ErrorBoundary } from "react-error-boundary";

import { MovieDetailHeroActions } from "./fragments/movie-detail-hero-actions";
import { MovieDetailHeroHeader } from "./fragments/movie-detail-hero-header";
import { MovieDetailHeroInfo } from "./fragments/movie-detail-hero-info";
import { MovieDetailHeroPoster } from "./fragments/movie-detail-hero-poster";
import { useMovieDetailHero } from "./movie-detail-hero.hook";
import { MovieDetailHeroError } from "./movie-detail-hero-error";
import {
	MovieDetailHeroShellBackdropImage,
	MovieDetailHeroShellBackdropLayers,
	MovieDetailHeroShellContent,
	MovieDetailHeroShellContentRow,
	MovieDetailHeroShellMain,
	MovieDetailHeroShellMobileActions,
	MovieDetailHeroShellRoot,
} from "./movie-detail-hero-shell";
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
		<MovieDetailHeroShellRoot data-testid="movie-detail-hero">
			<MovieDetailHeroShellBackdropLayers
				overlayProps={{ "data-testid": "movie-detail-hero-overlay" }}
			>
				<MovieDetailHeroShellBackdropImage
					loading="eager"
					fetchPriority="high"
					key={hero.backdropUrl}
					src={hero.backdropUrl}
					alt={`Backdrop from ${hero.title}`}
					data-testid="movie-detail-hero-backdrop"
				/>
			</MovieDetailHeroShellBackdropLayers>

			<MovieDetailHeroHeader onBack={handleBack} onShare={handleShare} />

			<MovieDetailHeroShellContent>
				<MovieDetailHeroShellContentRow>
					<MovieDetailHeroPoster src={hero.posterUrl} alt={hero.title} />

					<MovieDetailHeroShellMain>
						<MovieDetailHeroInfo
							primaryGenre={hero.primaryGenre}
							title={hero.title}
							formattedRating={formattedRating}
							formattedRatingMax={formattedRatingMax}
							year={hero.year}
							runtime={hero.runtime}
							director={hero.director}
						/>
						<div className="hidden sm:flex">
							<MovieDetailHeroActions
								movie={movie}
								variant="desktop"
								onPlayTrailer={handlePlayTrailer}
							/>
						</div>
					</MovieDetailHeroShellMain>
				</MovieDetailHeroShellContentRow>

				<MovieDetailHeroShellMobileActions>
					<MovieDetailHeroActions
						movie={movie}
						variant="mobile"
						onPlayTrailer={handlePlayTrailer}
					/>
				</MovieDetailHeroShellMobileActions>
			</MovieDetailHeroShellContent>
		</MovieDetailHeroShellRoot>
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
