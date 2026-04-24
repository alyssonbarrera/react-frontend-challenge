import {
	parseAsFloat,
	parseAsInteger,
	parseAsStringLiteral,
	useQueryStates,
} from "nuqs";
import {
	DEFAULT_DISCOVERY_GENRE,
	DEFAULT_DISCOVERY_MIN_RATING,
	DEFAULT_DISCOVERY_SORT,
	DEFAULT_DISCOVERY_YEAR_FROM,
	DEFAULT_DISCOVERY_YEAR_TO,
	DISCOVERY_GENRES,
	SORT_VALUES,
} from "../constants/discovery-filters";

const discoveryFilterParsers = {
	genre: parseAsStringLiteral(DISCOVERY_GENRES).withDefault(
		DEFAULT_DISCOVERY_GENRE,
	),
	yearFrom: parseAsInteger.withDefault(DEFAULT_DISCOVERY_YEAR_FROM),
	yearTo: parseAsInteger.withDefault(DEFAULT_DISCOVERY_YEAR_TO),
	minRating: parseAsFloat.withDefault(DEFAULT_DISCOVERY_MIN_RATING),
	sort: parseAsStringLiteral(SORT_VALUES).withDefault(DEFAULT_DISCOVERY_SORT),
};

export function useDiscoveryFilters() {
	return useQueryStates(discoveryFilterParsers);
}
