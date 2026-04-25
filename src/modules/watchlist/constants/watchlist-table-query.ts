export const SORT_DIRECTIONS = ["asc", "desc"] as const;
export const SORTABLE_COLUMNS = [
	"title",
	"genre",
	"release-date",
	"rating",
] as const;

export type SortDirection = (typeof SORT_DIRECTIONS)[number];
export type SortableColumn = (typeof SORTABLE_COLUMNS)[number];

export const WATCHLIST_PAGE_SIZE = 10;
