import type { Movie, TmdbMovieResponse } from "../dtos/movie";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export function buildPosterUrl(
	posterPath: string | null,
	size: "w185" | "w342" | "w500" | "original" = "w500",
): string {
	if (!posterPath) {
		return "";
	}

	return `${TMDB_IMAGE_BASE_URL}/${size}${posterPath}`;
}

export function mapTmdbMovie(raw: TmdbMovieResponse): Movie {
	return {
		id: raw.id,
		title: raw.title,
		originalTitle: raw.original_title,
		overview: raw.overview,
		posterPath: raw.poster_path,
		backdropPath: raw.backdrop_path,
		releaseDate: raw.release_date,
		voteAverage: raw.vote_average,
		voteCount: raw.vote_count,
		popularity: raw.popularity,
		genreIds: raw.genre_ids,
		originalLanguage: raw.original_language,
		adult: raw.adult,
		video: raw.video,
	};
}
