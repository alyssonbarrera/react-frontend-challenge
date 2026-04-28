import { useNavigate } from "@tanstack/react-router";
import type { FocusEvent, KeyboardEvent } from "react";
import { useMovieDetailsPrefetchIntent } from "@/core/hooks/use-movie-details-prefetch-intent";
import { toYearData } from "@/core/utils/to-year-data";
import type { Movie } from "../../dtos/movie";
import { buildPosterUrl } from "../../utils/movie.utils";
import { getGenreName } from "../../utils/movie-genres.utils";

type UseMovieCardParams = {
	movie: Movie;
};

const FALLBACK_GENRE = "Unknown";
const FALLBACK_YEAR = "—";
const MAX_GENRES_DISPLAYED = 2;

export function useMovieCard({ movie }: UseMovieCardParams) {
	const navigate = useNavigate();
	const {
		handleMovieMouseEnterIntentPrefetch,
		handleMovieMouseLeaveIntentPrefetch,
		handleMovieFocusIntentPrefetch,
	} = useMovieDetailsPrefetchIntent();

	const safeVoteAverage = Number.isFinite(movie.voteAverage)
		? movie.voteAverage
		: 0;
	const formattedRating = safeVoteAverage.toFixed(1);
	const safeReleaseDate =
		typeof movie.releaseDate === "string" ? movie.releaseDate : "";
	const { yearLabel: formattedYear } = toYearData(
		safeReleaseDate,
		FALLBACK_YEAR,
	);

	const formattedGenre = formatGenres(movie.genreIds);
	const posterUrl = buildPosterUrl(movie.posterPath);

	function handleNavigateToDetails() {
		navigate({ to: "/movie/$id", params: { id: String(movie.id) } });
	}

	function handleCardMouseEnter() {
		handleMovieMouseEnterIntentPrefetch(movie.id);
	}

	function handleCardMouseLeave() {
		handleMovieMouseLeaveIntentPrefetch(movie.id);
	}

	function handleCardFocus(event: FocusEvent<HTMLElement>) {
		if (event.currentTarget !== event.target) {
			return;
		}

		handleMovieFocusIntentPrefetch(movie.id);
	}

	function handleCardKeyDown(event: KeyboardEvent<HTMLElement>) {
		if (event.currentTarget !== event.target) {
			return;
		}

		if (event.key !== "Enter" && event.key !== " ") {
			return;
		}

		event.preventDefault();
		handleNavigateToDetails();
	}

	return {
		posterUrl,
		formattedYear,
		formattedGenre,
		formattedRating,
		handleCardMouseEnter,
		handleCardMouseLeave,
		handleCardFocus,
		handleCardKeyDown,
		handleNavigateToDetails,
	};
}

function formatGenres(genreIds: readonly number[] | null | undefined): string {
	const normalizedGenreIds = Array.isArray(genreIds) ? genreIds : [];
	const mappedGenreNames = normalizedGenreIds.map((id) => getGenreName(id));
	const knownGenreNames = mappedGenreNames.filter((name): name is string =>
		Boolean(name),
	);
	const displayedGenreNames = knownGenreNames.slice(0, MAX_GENRES_DISPLAYED);
	const genreLabel = displayedGenreNames.join(", ");

	return genreLabel || FALLBACK_GENRE;
}
