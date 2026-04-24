import { useEffect, useMemo, useState } from "react";
import { debounce } from "@/core/utils/debounce";
import { SEARCH_DEBOUNCE_MIN_MS } from "../../constants/discovery-search";
import { useDiscoveryFilters } from "../../hooks/use-discovery-filters";
import { useDiscoverySearch } from "../../hooks/use-discovery-search";

type UseDiscoverySearchInputParams = {
	debounceInMs?: number;
	onDebouncedValueChange?: (value: string) => void;
};

export function useDiscoverySearchInput({
	debounceInMs = SEARCH_DEBOUNCE_MIN_MS,
	onDebouncedValueChange,
}: UseDiscoverySearchInputParams) {
	const [searchValueOnUrl, setSearchValueOnUrl] = useDiscoverySearch();
	const [_filters, setFilters] = useDiscoveryFilters();
	const [searchValue, setSearchValue] = useState(searchValueOnUrl);

	const effectiveDebounceInMs = Math.max(SEARCH_DEBOUNCE_MIN_MS, debounceInMs);

	const debounceSearchValueSync = useMemo(
		() =>
			debounce((nextSearchValue: string) => {
				const trimmed = nextSearchValue.trim();
				setSearchValueOnUrl(trimmed ? nextSearchValue : null);
				setFilters({
					genre: null,
					yearFrom: null,
					yearTo: null,
					minRating: null,
					sort: null,
				});

				onDebouncedValueChange?.(nextSearchValue);
			}, effectiveDebounceInMs),
		[
			effectiveDebounceInMs,
			onDebouncedValueChange,
			setSearchValueOnUrl,
			setFilters,
		],
	);

	function onSearchValueChange(nextSearchValue: string) {
		setSearchValue(nextSearchValue);
		debounceSearchValueSync(nextSearchValue);
	}

	useEffect(() => {
		setSearchValue(searchValueOnUrl);
	}, [searchValueOnUrl]);

	useEffect(() => {
		return () => {
			debounceSearchValueSync.cancel();
		};
	}, [debounceSearchValueSync]);

	return {
		searchValue,
		onSearchValueChange,
	};
}
