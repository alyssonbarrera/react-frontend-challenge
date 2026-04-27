import { useNavigate } from "@tanstack/react-router";
import type { KeyboardEvent } from "react";
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

	const formattedRating = movie.voteAverage.toFixed(1);
	const { yearLabel: formattedYear } = toYearData(
		movie.releaseDate,
		FALLBACK_YEAR,
	);

	const formattedGenre = formatGenres(movie.genreIds);
	const posterUrl = buildPosterUrl(movie.posterPath);

	function handleNavigateToDetails() {
		navigate({ to: "/movie/$id", params: { id: String(movie.id) } });
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
		handleCardKeyDown,
		handleNavigateToDetails,
	};
}

function formatGenres(genreIds: readonly number[]): string {
	const mappedGenreNames = genreIds.map((id) => getGenreName(id));
	const knownGenreNames = mappedGenreNames.filter((name): name is string =>
		Boolean(name),
	);
	const displayedGenreNames = knownGenreNames.slice(0, MAX_GENRES_DISPLAYED);
	const genreLabel = displayedGenreNames.join(", ");

	return genreLabel || FALLBACK_GENRE;
}
