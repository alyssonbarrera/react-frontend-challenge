import { MovieDetailHeroActions } from "./fragments/movie-detail-hero-actions";
import { MovieDetailHeroHeader } from "./fragments/movie-detail-hero-header";
import { MovieDetailHeroInfo } from "./fragments/movie-detail-hero-info";
import { MovieDetailHeroPoster } from "./fragments/movie-detail-hero-poster";
import { useMovieDetailHero } from "./movie-detail-hero.hook";

type MovieDetailHeroProps = {
	id: string;
};

export function MovieDetailHero({ id }: MovieDetailHeroProps) {
	const {
		hero,
		handleBack,
		handleMore,
		handleShare,
		formattedRating,
		handlePlayTrailer,
		formattedRatingMax,
		handleAddToWatchlist,
	} = useMovieDetailHero({ id });

	return (
		<section
			className="relative isolate flex h-140 w-full flex-col overflow-hidden bg-surface-elevated"
			data-testid="movie-detail-hero"
		>
			<img
				src={hero.backdropUrl}
				alt=""
				aria-hidden
				className="absolute inset-0 -z-20 h-full w-full object-cover"
				data-testid="movie-detail-hero-backdrop"
			/>
			<div
				aria-hidden
				className="-z-10 absolute inset-0 bg-linear-to-b from-transparent via-[#0A0B0E]/80 to-[#0A0B0E]"
				data-testid="movie-detail-hero-overlay"
			/>

			<MovieDetailHeroHeader
				onBack={handleBack}
				onShare={handleShare}
				onMore={handleMore}
			/>

			<div className="mt-auto flex flex-row items-end gap-10 px-10 pb-10">
				<MovieDetailHeroPoster src={hero.posterUrl} alt={hero.title} />

				<div className="flex flex-1 flex-col gap-5">
					<MovieDetailHeroInfo
						spotlightLabel={hero.spotlightLabel}
						primaryGenre={hero.primaryGenre}
						title={hero.title}
						formattedRating={formattedRating}
						formattedRatingMax={formattedRatingMax}
						year={hero.year}
						runtime={hero.runtime}
						director={hero.director}
					/>
					<MovieDetailHeroActions
						onPlayTrailer={handlePlayTrailer}
						onAddToWatchlist={handleAddToWatchlist}
					/>
				</div>
			</div>
		</section>
	);
}
