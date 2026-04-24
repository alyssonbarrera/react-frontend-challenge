import { parseAsString, useQueryState } from "nuqs";
import { SEARCH_QUERY_PARAM_KEY } from "../constants/discovery-search";

const searchQueryParser = parseAsString.withDefault("");

export function useDiscoverySearch() {
	return useQueryState(SEARCH_QUERY_PARAM_KEY, searchQueryParser);
}
