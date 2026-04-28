import {
	type ChangeEvent,
	type KeyboardEvent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
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

	const syncSearchValue = useCallback(
		(nextSearchValue: string) => {
			const trimmed = nextSearchValue.trim();
			setSearchValueOnUrl(trimmed ? nextSearchValue : null);

			onDebouncedValueChange?.(nextSearchValue);
		},
		[setSearchValueOnUrl, onDebouncedValueChange],
	);

	const debounceSearchValueSync = useMemo(
		() =>
			debounce((nextSearchValue: string) => {
				syncSearchValue(nextSearchValue);
			}, effectiveDebounceInMs),
		[effectiveDebounceInMs, syncSearchValue],
	);

	const onSearchValueChange = useCallback(
		(nextSearchValue: string) => {
			setSearchValue(nextSearchValue);
			debounceSearchValueSync(nextSearchValue);
		},
		[debounceSearchValueSync],
	);

	const onSearchSubmit = useCallback(
		(nextSearchValue = searchValue) => {
			setSearchValue(nextSearchValue);
			debounceSearchValueSync.cancel();
			syncSearchValue(nextSearchValue);
		},
		[searchValue, debounceSearchValueSync, syncSearchValue],
	);

	const onSearchInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			onSearchValueChange(event.target.value);
		},
		[onSearchValueChange],
	);

	const onSearchInputKeyDown = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			if (event.key !== "Enter") {
				return;
			}

			onSearchSubmit(event.currentTarget.value);
			event.currentTarget.blur();
		},
		[onSearchSubmit],
	);

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
		onSearchSubmit,
		onSearchValueChange,
		onSearchInputChange,
		onSearchInputKeyDown,
	};
}
