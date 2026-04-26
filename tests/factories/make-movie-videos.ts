import type { MovieVideos } from "@/modules/movie-details/dtos/movie-videos";

export function makeMovieVideos(override?: Partial<MovieVideos>): MovieVideos {
	return {
		movieId: 1,
		results: [
			{
				id: "v1",
				key: "L3pk_TBkihU",
				name: "Tenet — Official Trailer",
				site: "YouTube",
				type: "Trailer",
				size: 1080,
				official: true,
				publishedAt: "2020-05-21T13:00:00.000Z",
			},
		],
		...override,
	};
}
