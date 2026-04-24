export type Movie = {
	id: number;
	title: string;
	originalTitle: string;
	overview: string;
	posterPath: string | null;
	backdropPath: string | null;
	releaseDate: string;
	voteAverage: number;
	voteCount: number;
	popularity: number;
	genreIds: ReadonlyArray<number>;
	originalLanguage: string;
	adult: boolean;
	video: boolean;
};

export type TmdbMovieResponse = {
	id: number;
	title: string;
	original_title: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
	release_date: string;
	vote_average: number;
	vote_count: number;
	popularity: number;
	genre_ids: number[];
	original_language: string;
	adult: boolean;
	video: boolean;
};

export type TmdbPaginatedResponse<T> = {
	page: number;
	results: T[];
	total_pages: number;
	total_results: number;
};

export type MoviesPage = {
	page: number;
	results: ReadonlyArray<Movie>;
	totalPages: number;
	totalResults: number;
};
