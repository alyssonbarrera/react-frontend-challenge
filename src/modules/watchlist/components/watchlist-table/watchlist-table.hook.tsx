import {
	type ColumnDef,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type OnChangeFn,
	type PaginationState,
	type RowData,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { WATCHLIST_PAGE_SIZE } from "../../constants/watchlist-table-query";
import { useWatchlistTableQuery } from "../../hooks/use-watchlist-table-query";
import { useWatchlistStore } from "../../stores/watchlist-store";
import {
	buildColumns,
	createSortingState,
	getPaginationRange,
	mapWatchlistItemToRow,
	type PaginationRangeItem,
	toSortQueryState,
	type WatchlistTableRow,
} from "./watchlist-table.utils";

export type {
	SortableColumn,
	SortDirection,
	WatchlistTableRow,
} from "./watchlist-table.utils";

declare module "@tanstack/react-table" {
	interface ColumnMeta<TData extends RowData, TValue> {
		headClassName?: string;
		cellClassName?: string;
	}
}

export function useWatchlistTable() {
	const items = useWatchlistStore((state) => state.items) ?? [];
	const removeFromWatchlist = useWatchlistStore((state) => state.remove);

	const [{ sort, direction, page }, setQuery] = useWatchlistTableQuery();

	const data = useMemo(() => items.map(mapWatchlistItemToRow), [items]);

	const sorting = useMemo<SortingState>(() => {
		return createSortingState({ sort, direction });
	}, [sort, direction]);

	const pagination = useMemo<PaginationState>(
		() => ({
			pageIndex: Math.max(0, page - 1),
			pageSize: WATCHLIST_PAGE_SIZE,
		}),
		[page],
	);

	const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
		const nextSorting =
			typeof updater === "function" ? updater(sorting) : updater;
		setQuery({ ...toSortQueryState(nextSorting), page: 1 });
	};

	const handlePaginationChange: OnChangeFn<PaginationState> = (updater) => {
		const nextPagination =
			typeof updater === "function" ? updater(pagination) : updater;
		setQuery({ page: nextPagination.pageIndex + 1 });
	};

	const columns = useMemo<ColumnDef<WatchlistTableRow>[]>(
		() => buildColumns({ onRemoveFromWatchlist: removeFromWatchlist }),
		[removeFromWatchlist],
	);

	const table = useReactTable({
		data,
		columns,
		state: { sorting, pagination },
		onSortingChange: handleSortingChange,
		onPaginationChange: handlePaginationChange,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getRowId: (row) => String(row.id),
	});

	const totalRows = table.getFilteredRowModel().rows.length;
	const pageCount = table.getPageCount();
	const currentPage = pagination.pageIndex + 1;

	const paginationRange = useMemo<PaginationRangeItem[]>(
		() => getPaginationRange(currentPage, pageCount),
		[currentPage, pageCount],
	);

	const rangeStart =
		totalRows === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1;
	const rangeEnd = Math.min(
		(pagination.pageIndex + 1) * pagination.pageSize,
		totalRows,
	);

	const showPagination = pageCount > 1;

	const goToPage = (page: number) => table.setPageIndex(page - 1);
	const goToPreviousPage = () => table.previousPage();
	const goToNextPage = () => table.nextPage();

	return {
		table,
		goToPage,
		rangeEnd,
		totalRows,
		rangeStart,
		currentPage,
		goToNextPage,
		showPagination,
		paginationRange,
		goToPreviousPage,
		canNextPage: table.getCanNextPage(),
		canPreviousPage: table.getCanPreviousPage(),
	};
}
