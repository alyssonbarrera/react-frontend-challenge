import type {
	MovieVideo,
	MovieVideos,
	TmdbMovieVideosResponse,
	TmdbVideoResponse,
} from "../dtos/movie-videos";

function mapTmdbVideo(raw: TmdbVideoResponse): MovieVideo {
	return {
		id: raw.id,
		key: raw.key,
		name: raw.name,
		site: raw.site,
		type: raw.type,
		size: raw.size,
		official: raw.official,
		publishedAt: raw.published_at,
	};
}

export function mapTmdbMovieVideos(raw: TmdbMovieVideosResponse): MovieVideos {
	return {
		movieId: raw.id,
		results: raw.results.map(mapTmdbVideo),
	};
}
