import type { Movie, TmdbMovieResponse } from "@/modules/discovery/dtos/movie";

export type TmdbGenreResponse = {
	id: number;
	name: string;
};

export type TmdbMovieDetailsResponse = Omit<TmdbMovieResponse, "genre_ids"> & {
	runtime: number | null;
	tagline: string;
	status: string;
	homepage: string;
	imdb_id: string | null;
	budget: number;
	revenue: number;
	genres: TmdbGenreResponse[];
};

export type Genre = {
	id: number;
	name: string;
};

export type MovieDetails = Omit<Movie, "genreIds"> & {
	runtime: number | null;
	tagline: string;
	status: string;
	homepage: string;
	imdbId: string | null;
	budget: number;
	revenue: number;
	genres: ReadonlyArray<Genre>;
};
