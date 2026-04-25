export const DISCOVERY_SORT_OPTIONS = [
	{ value: "critics-picks", label: "Critics' Picks" },
	{ value: "popularity", label: "Most Popular" },
	{ value: "release-date-desc", label: "Newest First" },
	{ value: "release-date-asc", label: "Oldest First" },
	{ value: "rating-desc", label: "Highest Rated" },
] as const;

export const DISCOVERY_GENRES = [
	"All genres",
	"Action",
	"Adventure",
	"Animation",
	"Comedy",
	"Crime",
	"Documentary",
	"Drama",
	"Fantasy",
	"Horror",
	"Mystery",
	"Romance",
	"Sci-Fi",
	"Thriller",
] as const;

export const DISCOVERY_MIN_RATINGS = [0, 5, 6, 7, 7.5, 8, 8.5, 9] as const;

const ANY_YEAR_RANGE_FROM = 1900;
const CURRENT_YEAR = new Date().getFullYear();

export const DISCOVERY_YEAR_RANGES = [
	{ label: "Any year", from: ANY_YEAR_RANGE_FROM, to: CURRENT_YEAR },
	{ label: "2020 — 2025", from: 2020, to: 2025 },
	{ label: "2010 — 2019", from: 2010, to: 2019 },
	{ label: "2000 — 2009", from: 2000, to: 2009 },
	{ label: "1990s", from: 1990, to: 1999 },
] as const;

export const SORT_VALUES = DISCOVERY_SORT_OPTIONS.map((option) => option.value);

export const DEFAULT_DISCOVERY_SORT = "popularity" as const;
export const DEFAULT_DISCOVERY_GENRE = "All genres" as const;
export const DEFAULT_DISCOVERY_YEAR_FROM = ANY_YEAR_RANGE_FROM;
export const DEFAULT_DISCOVERY_YEAR_TO = CURRENT_YEAR;
export const DEFAULT_DISCOVERY_MIN_RATING = 0;
