export type TmdbVideoResponse = {
	id: string;
	key: string;
	name: string;
	site: string;
	type: string;
	size: number;
	official: boolean;
	iso_639_1: string;
	iso_3166_1: string;
	published_at: string;
};

export type TmdbMovieVideosResponse = {
	id: number;
	results: TmdbVideoResponse[];
};

export type MovieVideo = {
	id: string;
	key: string;
	name: string;
	site: string;
	type: string;
	size: number;
	official: boolean;
	publishedAt: string;
};

export type MovieVideos = {
	movieId: number;
	results: ReadonlyArray<MovieVideo>;
};
