import { flexRender, type Header } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Activity, type ComponentProps } from "react";
import { TablePagination } from "@/core/components/table-pagination/table-pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/core/components/ui/table";
import { cn } from "@/core/lib/utils";
import {
	useWatchlistTable,
	type WatchlistTableRow,
} from "./watchlist-table.hook";

type WatchlistTableProps = ComponentProps<"div">;

export function WatchlistTable({ className, ...props }: WatchlistTableProps) {
	const {
		table,
		goToPage,
		rangeEnd,
		totalRows,
		rangeStart,
		canNextPage,
		currentPage,
		goToNextPage,
		hasNoResults,
		searchQuery,
		showPagination,
		canPreviousPage,
		paginationRange,
		goToPreviousPage,
	} = useWatchlistTable();

	const columnCount = table.getAllColumns().length;

	return (
		<div
			{...props}
			className={cn("min-w-0", className)}
			data-testid="watchlist-table"
		>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow
							key={headerGroup.id}
							className="bg-surface-muted hover:bg-surface-muted"
						>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead
										key={header.id}
										className={header.column.columnDef.meta?.headClassName}
										data-testid={`watchlist-table-header-${header.column.id}`}
									>
										{renderHeaderContent(header)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{hasNoResults ? (
						<TableRow data-testid="watchlist-table-no-results-row">
							<TableCell
								colSpan={columnCount}
								className="h-32 text-center text-muted-foreground text-sm"
							>
								<span data-testid="watchlist-table-no-results-message">
									No movies in your watchlist match
									<span className="text-foreground"> "{searchQuery}"</span>.
								</span>
							</TableCell>
						</TableRow>
					) : (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id} data-testid="watchlist-table-row">
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										className={cell.column.columnDef.meta?.cellClassName}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					)}
				</TableBody>
			</Table>

			<Activity mode={showPagination ? "visible" : "hidden"}>
				<TablePagination
					testIdPrefix="watchlist-table-pagination"
					totalLabel="films"
					currentPage={currentPage}
					totalRows={totalRows}
					rangeStart={rangeStart}
					rangeEnd={rangeEnd}
					paginationRange={paginationRange}
					canPreviousPage={canPreviousPage}
					canNextPage={canNextPage}
					onPageChange={goToPage}
					onPreviousPage={goToPreviousPage}
					onNextPage={goToNextPage}
				/>
			</Activity>
		</div>
	);
}

function renderHeaderContent(header: Header<WatchlistTableRow, unknown>) {
	if (!header.column.getCanSort()) {
		return flexRender(header.column.columnDef.header, header.getContext());
	}

	const sortDirection = header.column.getIsSorted();
	const SortDirectionIcon = sortDirection === "asc" ? ArrowUp : ArrowDown;

	return (
		<button
			type="button"
			onClick={header.column.getToggleSortingHandler()}
			className="flex items-center gap-1.5 font-bold text-[11px] text-muted-foreground uppercase tracking-[0.12em] transition-colors hover:text-foreground"
			data-testid={`watchlist-table-sort-${header.column.id}`}
		>
			{flexRender(header.column.columnDef.header, header.getContext())}

			<Activity mode={sortDirection ? "visible" : "hidden"}>
				<SortDirectionIcon className="size-3 text-muted-foreground" />
			</Activity>
		</button>
	);
}
