type UseMovieDetailHeroParams = {
	id: string;
};

export type MovieDetailHeroData = {
	title: string;
	backdropUrl: string;
	posterUrl: string;
	spotlightLabel: string;
	primaryGenre: string;
	rating: number;
	ratingMax: number;
	year: string;
	runtime: string;
	director: string;
};

const MOCK_HERO: MovieDetailHeroData = {
	title: "The Quiet Horizon",
	backdropUrl:
		"https://images.unsplash.com/photo-1518176258769-f227c798150e?auto=format&fit=crop&w=1600&q=80",
	posterUrl:
		"https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=600&q=80",
	spotlightLabel: "EDITOR'S PICK",
	primaryGenre: "DRAMA",
	rating: 8.4,
	ratingMax: 10,
	year: "2024",
	runtime: "2h 18m",
	director: "dir. Léa Marchetti",
};

export function useMovieDetailHero(_params: UseMovieDetailHeroParams) {
	const hero = MOCK_HERO;

	const formattedRating = hero.rating.toFixed(1);
	const formattedRatingMax = `/ ${hero.ratingMax}`;

	function handleBack() {
		window.history.back();
	}

	function handleShare() {
		if (navigator.share) {
			navigator.share({ title: hero.title, url: window.location.href });
		}
	}

	function handleMore() {
		// Placeholder for the "more" menu trigger.
	}

	function handlePlayTrailer() {
		// Placeholder for the trailer modal trigger.
	}

	function handleAddToWatchlist() {
		// Placeholder for the watchlist toggle.
	}

	return {
		hero,
		handleBack,
		handleMore,
		handleShare,
		formattedRating,
		handlePlayTrailer,
		formattedRatingMax,
		handleAddToWatchlist,
	};
}
