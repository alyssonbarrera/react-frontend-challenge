import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Movie } from "../../dtos/movie";
import { useListMoviesQuery } from "../../queries/use-list-movies-query";

const GRID_LG_BREAKPOINT = 1024;
const GRID_XL_BREAKPOINT = 1280;
const GRID_BASE_COLUMNS = 2;
const GRID_LG_COLUMNS = 3;
const GRID_XL_COLUMNS = 4;
const GRID_ESTIMATED_ROW_HEIGHT = 600;
const GRID_ROW_GAP = 20;
const GRID_OVERSCAN = 3;

function getColumnCount(screenWidth: number) {
	if (screenWidth >= GRID_XL_BREAKPOINT) {
		return GRID_XL_COLUMNS;
	}

	if (screenWidth >= GRID_LG_BREAKPOINT) {
		return GRID_LG_COLUMNS;
	}

	return GRID_BASE_COLUMNS;
}

function useMovieGridColumnCount() {
	const [columnCount, setColumnCount] = useState(() => {
		if (typeof window === "undefined") {
			return GRID_BASE_COLUMNS;
		}

		return getColumnCount(window.innerWidth);
	});

	useEffect(() => {
		function handleResize() {
			setColumnCount(getColumnCount(window.innerWidth));
		}

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return columnCount;
}

type UseMovieGridVirtualizationParams = {
	movies: ReadonlyArray<Movie>;
	handleEndReached: VoidFunction;
};

export function useMovieGridVirtualization({
	movies,
	handleEndReached,
}: UseMovieGridVirtualizationParams) {
	const columnCount = useMovieGridColumnCount();
	const gridRef = useRef<HTMLDivElement>(null);
	const rowCount = Math.ceil(movies.length / columnCount);

	const rowVirtualizer = useWindowVirtualizer({
		count: rowCount,
		estimateSize: () => GRID_ESTIMATED_ROW_HEIGHT,
		gap: GRID_ROW_GAP,
		overscan: GRID_OVERSCAN,
		scrollMargin: gridRef.current?.offsetTop ?? 0,
		initialRect: {
			width: 0,
			height: typeof window === "undefined" ? 0 : window.innerHeight,
		},
	});

	const virtualRows = rowVirtualizer.getVirtualItems();
	const lastTriggeredRowIndexRef = useRef<number | null>(null);

	useEffect(() => {
		const lastVirtualRow = virtualRows.at(-1);

		if (!lastVirtualRow) {
			return;
		}

		const isNearTheEnd = lastVirtualRow.index >= rowCount - 2;

		if (!isNearTheEnd) {
			lastTriggeredRowIndexRef.current = null;
			return;
		}

		if (lastTriggeredRowIndexRef.current === lastVirtualRow.index) {
			return;
		}

		lastTriggeredRowIndexRef.current = lastVirtualRow.index;
		handleEndReached();
	}, [virtualRows, rowCount, handleEndReached]);

	const getMoviesForRow = useCallback(
		(rowIndex: number) => {
			const startIndex = rowIndex * columnCount;

			return movies.slice(startIndex, startIndex + columnCount);
		},
		[movies, columnCount],
	);

	return {
		gridRef,
		virtualRows,
		getMoviesForRow,
		totalSize: rowVirtualizer.getTotalSize(),
		scrollMargin: gridRef.current?.offsetTop ?? 0,
		measureRowElement: rowVirtualizer.measureElement,
	};
}

export function useMovieGrid() {
	const {
		movies,
		refetch,
		isError,
		isPending,
		isFetching,
		hasNextPage,
		isSearching,
		searchQuery,
		fetchNextPage,
		isFetchingNextPage,
	} = useListMoviesQuery();

	const totalCount = movies.length;
	const hasMovies = totalCount > 0;

	const handleEndReached = useCallback(() => {
		if (!hasNextPage || isFetchingNextPage) {
			return;
		}

		fetchNextPage();
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	const handleRetry = useCallback(() => {
		refetch();
	}, [refetch]);

	return {
		movies,
		isError,
		isPending,
		hasMovies,
		totalCount,
		isFetching,
		hasNextPage,
		isSearching,
		searchQuery,
		handleRetry,
		handleEndReached,
		isFetchingNextPage,
	};
}
