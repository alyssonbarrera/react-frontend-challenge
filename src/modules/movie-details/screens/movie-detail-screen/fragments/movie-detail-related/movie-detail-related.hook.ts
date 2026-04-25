import type { Movie } from "@/modules/discovery/dtos/movie";

type UseMovieDetailRelatedParams = {
	id: string;
};

const MOCK_RELATED: ReadonlyArray<Movie> = [
	{
		id: 9001,
		title: "Northern Drift",
		originalTitle: "Northern Drift",
		overview: "",
		posterPath: null,
		backdropPath: null,
		releaseDate: "2022-01-01",
		voteAverage: 8.4,
		voteCount: 0,
		popularity: 0,
		genreIds: [18],
		originalLanguage: "en",
		adult: false,
		video: false,
	},
	{
		id: 9002,
		title: "Paper Lanterns",
		originalTitle: "Paper Lanterns",
		overview: "",
		posterPath: null,
		backdropPath: null,
		releaseDate: "2024-01-01",
		voteAverage: 7.9,
		voteCount: 0,
		popularity: 0,
		genreIds: [18],
		originalLanguage: "en",
		adult: false,
		video: false,
	},
	{
		id: 9003,
		title: "The Salt Road",
		originalTitle: "The Salt Road",
		overview: "",
		posterPath: null,
		backdropPath: null,
		releaseDate: "2023-01-01",
		voteAverage: 8.1,
		voteCount: 0,
		popularity: 0,
		genreIds: [12],
		originalLanguage: "en",
		adult: false,
		video: false,
	},
	{
		id: 9004,
		title: "Vellum",
		originalTitle: "Vellum",
		overview: "",
		posterPath: null,
		backdropPath: null,
		releaseDate: "2021-01-01",
		voteAverage: 8.6,
		voteCount: 0,
		popularity: 0,
		genreIds: [9648],
		originalLanguage: "en",
		adult: false,
		video: false,
	},
];

export function useMovieDetailRelated(_params: UseMovieDetailRelatedParams) {
	const related = MOCK_RELATED;

	function handleBrowseAll() {
		// Placeholder for "Browse all" deep link.
	}

	return {
		related,
		handleBrowseAll,
	};
}
