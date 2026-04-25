import { parseAsInteger, parseAsStringLiteral, useQueryStates } from "nuqs";
import {
	SORT_DIRECTIONS,
	SORTABLE_COLUMNS,
} from "../constants/watchlist-table-query";

const watchlistTableQueryParsers = {
	sort: parseAsStringLiteral(SORTABLE_COLUMNS),
	direction: parseAsStringLiteral(SORT_DIRECTIONS),
	page: parseAsInteger.withDefault(1),
};

export function useWatchlistTableQuery() {
	return useQueryStates(watchlistTableQueryParsers);
}
