import {
	getRouteApi,
	useCanGoBack,
	useNavigate,
	useRouter,
} from "@tanstack/react-router";
import type { Movie } from "@/modules/discovery/dtos/movie";
import { useMovieCreditsQuery } from "../../queries/use-movie-credits-query";
import { useMovieDetailsQuery } from "../../queries/use-movie-details-query";
import {
	formatHeroRating,
	formatHeroRatingMax,
	mapMovieDetailsToHeroData,
	mapMovieDetailsToWatchlistMovie,
} from "./movie-detail-hero.utils";

export type { MovieDetailHeroData } from "./movie-detail-hero.utils";

const movieDetailRouteApi = getRouteApi("/_authenticated/movie/$id");

export function useMovieDetailHero() {
	const router = useRouter();
	const navigate = useNavigate();
	const canGoBack = useCanGoBack();

	const { id } = movieDetailRouteApi.useParams();
	const movieId = Number(id);

	const detailsQuery = useMovieDetailsQuery(movieId);
	const creditsQuery = useMovieCreditsQuery(movieId);

	const isLoading = detailsQuery.isLoading;
	const isError = detailsQuery.isError;

	function handleRetry() {
		detailsQuery.refetch();
		creditsQuery.refetch();
	}

	const movie = detailsQuery.data;
	const credits = creditsQuery.data;

	const hero = movie ? mapMovieDetailsToHeroData(movie, credits) : null;
	const formattedRating = hero ? formatHeroRating(hero.rating) : "";
	const formattedRatingMax = hero ? formatHeroRatingMax(hero.ratingMax) : "";
	const movieForWatchlist: Movie | null = movie
		? mapMovieDetailsToWatchlistMovie(movie)
		: null;

	function handleBack() {
		if (canGoBack) {
			router.history.back();
		} else {
			navigate({ to: "/discovery" });
		}
	}

	function handleShare() {
		if (!navigator.share || !hero) {
			return;
		}

		try {
			Promise.resolve(
				navigator.share({ title: hero.title, url: window.location.href }),
			).catch(() => undefined);
		} catch {
			// Some environments can throw synchronously instead of returning a promise.
		}
	}

	function handlePlayTrailer() {
		document.getElementById("movie-detail-trailer")?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	}

	return {
		hero,
		isError,
		isLoading,
		handleBack,
		handleRetry,
		handleShare,
		formattedRating,
		handlePlayTrailer,
		formattedRatingMax,
		movie: movieForWatchlist,
	};
}
