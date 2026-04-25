export const SORT_DIRECTIONS = ["asc", "desc"] as const;
export const SORTABLE_COLUMNS = [
	"title",
	"genre",
	"year",
	"rating",
	"added",
] as const;

export type SortDirection = (typeof SORT_DIRECTIONS)[number];
export type SortableColumn = (typeof SORTABLE_COLUMNS)[number];

export const DEFAULT_SORT: SortableColumn = "added";
export const DEFAULT_DIRECTION: SortDirection = "desc";
export const WATCHLIST_PAGE_SIZE = 10;
