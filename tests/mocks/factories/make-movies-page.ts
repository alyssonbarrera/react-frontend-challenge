import type { Movie, MoviesPage } from "@/modules/discovery/dtos/movie";
import { makeMovie } from "./make-movie";

type MakeMoviesPageParams = {
	page?: number;
	totalPages?: number;
	results?: ReadonlyArray<Movie>;
	totalResults?: number;
};

export function makeMoviesPage(override?: MakeMoviesPageParams): MoviesPage {
	const results = override?.results ?? [makeMovie()];

	return {
		page: override?.page ?? 1,
		results: [...results],
		totalPages: override?.totalPages ?? 1,
		totalResults: override?.totalResults ?? results.length,
	};
}
