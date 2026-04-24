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
	const formattedRating = movie.voteAverage.toFixed(1);
	const formattedYear = formatReleaseYear(movie.releaseDate);

	const formattedGenre = formatGenres(movie.genreIds);
	const posterUrl = buildPosterUrl(movie.posterPath);

	return {
		posterUrl,
		formattedYear,
		formattedGenre,
		formattedRating,
	};
}

function formatReleaseYear(releaseDate: Movie["releaseDate"]): string {
	if (!releaseDate) {
		return FALLBACK_YEAR;
	}

	const releaseYear = releaseDate.slice(0, 4);
	return releaseYear;
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
