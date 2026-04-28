import { MOVIE_GENRES_BY_ID } from "../constants/movie-genres";

export function getGenreName(id: number): string | undefined {
	return MOVIE_GENRES_BY_ID[id];
}

const MOVIE_GENRE_IDS_BY_NAME: Readonly<Record<string, number>> =
	Object.fromEntries(
		Object.entries(MOVIE_GENRES_BY_ID).map(([id, name]) => [name, Number(id)]),
	);

export function getGenreId(name: string): number | undefined {
	return MOVIE_GENRE_IDS_BY_NAME[name];
}
