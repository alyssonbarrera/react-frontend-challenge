import type {
	Genre,
	MovieDetails,
	TmdbGenreResponse,
	TmdbMovieDetailsResponse,
} from "../dtos/movie-details";

function mapTmdbGenre(raw: TmdbGenreResponse): Genre {
	return {
		id: raw.id,
		name: raw.name,
	};
}

export function mapTmdbMovieDetails(
	raw: TmdbMovieDetailsResponse,
): MovieDetails {
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
		originalLanguage: raw.original_language,
		adult: raw.adult,
		video: raw.video,
		runtime: raw.runtime,
		tagline: raw.tagline,
		status: raw.status,
		homepage: raw.homepage,
		imdbId: raw.imdb_id,
		budget: raw.budget,
		revenue: raw.revenue,
		genres: raw.genres.map(mapTmdbGenre),
	};
}
