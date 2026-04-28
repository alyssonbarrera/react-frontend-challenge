import {
	DEFAULT_DISCOVERY_GENRE,
	DEFAULT_DISCOVERY_MIN_RATING,
	DEFAULT_DISCOVERY_YEAR_FROM,
	DEFAULT_DISCOVERY_YEAR_TO,
} from "../constants/discovery-filters";
import type {
	DiscoveryFilters,
	DiscoverySortValue,
} from "../types/discovery-filters";
import { getGenreId } from "./movie-genres.utils";

const SORT_BY_VALUE_BY_DISCOVERY_SORT: Record<DiscoverySortValue, string> = {
	"critics-picks": "vote_average.desc",
	popularity: "popularity.desc",
	"release-date-desc": "primary_release_date.desc",
	"release-date-asc": "primary_release_date.asc",
	"rating-desc": "vote_average.desc",
};

const CRITICS_PICKS_MIN_VOTE_COUNT = 300;

export type BuildSearchMoviesSearchParamsParams = {
	query: string;
	page: number;
	year?: number;
	language: string;
};

export type BuildDiscoverMoviesSearchParamsParams = {
	page: number;
	language: string;
	filters: DiscoveryFilters;
};

export function buildSearchMoviesSearchParams({
	query,
	page,
	year,
	language,
}: BuildSearchMoviesSearchParamsParams): URLSearchParams {
	const searchParams = new URLSearchParams({
		query,
		language,
		page: String(page),
		include_adult: "false",
		...(year ? { primary_release_year: String(year) } : {}),
	});

	return searchParams;
}

export function buildDiscoverMoviesSearchParams({
	page,
	filters,
	language,
}: BuildDiscoverMoviesSearchParamsParams): URLSearchParams {
	const searchParams = new URLSearchParams({
		language,
		page: String(page),
		include_adult: "false",
		include_video: "false",
		sort_by: SORT_BY_VALUE_BY_DISCOVERY_SORT[filters.sort],
	});

	if (filters.sort === "critics-picks" || filters.sort === "rating-desc") {
		searchParams.set("vote_count.gte", String(CRITICS_PICKS_MIN_VOTE_COUNT));
	}

	if (filters.genre !== DEFAULT_DISCOVERY_GENRE) {
		const genreId = getGenreId(filters.genre);
		if (genreId !== undefined) {
			searchParams.set("with_genres", String(genreId));
		}
	}

	const isYearRangeActive =
		filters.yearFrom !== DEFAULT_DISCOVERY_YEAR_FROM ||
		filters.yearTo !== DEFAULT_DISCOVERY_YEAR_TO;

	if (isYearRangeActive) {
		searchParams.set("primary_release_date.gte", `${filters.yearFrom}-01-01`);
		searchParams.set("primary_release_date.lte", `${filters.yearTo}-12-31`);
	}

	if (filters.minRating !== DEFAULT_DISCOVERY_MIN_RATING) {
		searchParams.set("vote_average.gte", String(filters.minRating));
	}

	return searchParams;
}
