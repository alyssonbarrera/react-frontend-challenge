import { parseAsString, useQueryState } from "nuqs";

export const GLOBAL_SEARCH_QUERY_PARAM_KEY = "q";

const globalSearchQueryParser = parseAsString.withDefault("");

export function useGlobalSearch() {
	return useQueryState(GLOBAL_SEARCH_QUERY_PARAM_KEY, globalSearchQueryParser);
}
