import { useEffect, useMemo, useState } from "react";
import { GLOBAL_SEARCH_DEBOUNCE_MIN_MS } from "@/core/constants/global-search";
import { useGlobalSearch } from "@/core/hooks/use-global-search";
import { debounce } from "@/core/utils/debounce";

type UseGlobalSearchInputParams = {
	debounceInMs?: number;
	onDebouncedValueChange?: (value: string) => void;
};

export function useGlobalSearchInput({
	debounceInMs = GLOBAL_SEARCH_DEBOUNCE_MIN_MS,
	onDebouncedValueChange,
}: UseGlobalSearchInputParams) {
	const [searchValueOnUrl, setSearchValueOnUrl] = useGlobalSearch();
	const [searchValue, setSearchValue] = useState(searchValueOnUrl);

	const effectiveDebounceInMs = Math.max(
		GLOBAL_SEARCH_DEBOUNCE_MIN_MS,
		debounceInMs,
	);

	const debounceSearchValueSync = useMemo(
		() =>
			debounce((nextSearchValue: string) => {
				const trimmed = nextSearchValue.trim();
				setSearchValueOnUrl(trimmed ? nextSearchValue : null);

				onDebouncedValueChange?.(nextSearchValue);
			}, effectiveDebounceInMs),
		[effectiveDebounceInMs, onDebouncedValueChange, setSearchValueOnUrl],
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
