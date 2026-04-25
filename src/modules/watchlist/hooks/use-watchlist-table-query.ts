import { parseAsInteger, parseAsStringLiteral, useQueryStates } from "nuqs";
import {
	DEFAULT_DIRECTION,
	DEFAULT_SORT,
	SORT_DIRECTIONS,
	SORTABLE_COLUMNS,
} from "../constants/watchlist-table-query";

const watchlistTableQueryParsers = {
	sort: parseAsStringLiteral(SORTABLE_COLUMNS).withDefault(DEFAULT_SORT),
	direction:
		parseAsStringLiteral(SORT_DIRECTIONS).withDefault(DEFAULT_DIRECTION),
	page: parseAsInteger.withDefault(1),
};

export function useWatchlistTableQuery() {
	return useQueryStates(watchlistTableQueryParsers);
}
