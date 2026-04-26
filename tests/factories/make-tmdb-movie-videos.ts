import type { TmdbMovieVideosResponse } from "@/modules/movie-details/dtos/movie-videos";

export function makeTmdbMovieVideos(
	override?: Partial<TmdbMovieVideosResponse>,
): TmdbMovieVideosResponse {
	return {
		id: 1,
		results: [
			{
				id: "v1",
				key: "L3pk_TBkihU",
				name: "Tenet — Official Trailer",
				site: "YouTube",
				type: "Trailer",
				size: 1080,
				official: true,
				iso_639_1: "en",
				iso_3166_1: "US",
				published_at: "2020-05-21T13:00:00.000Z",
			},
		],
		...override,
	};
}
