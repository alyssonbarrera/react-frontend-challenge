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
import {
	useWatchlistTable,
	type WatchlistTableRow,
} from "./watchlist-table.hook";

type WatchlistTableProps = ComponentProps<"div">;

export function WatchlistTable(props: WatchlistTableProps) {
	const {
		table,
		goToPage,
		rangeEnd,
		totalRows,
		rangeStart,
		canNextPage,
		currentPage,
		goToNextPage,
		showPagination,
		canPreviousPage,
		paginationRange,
		goToPreviousPage,
	} = useWatchlistTable();

	return (
		<div {...props} data-testid="watchlist-table">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow
							key={headerGroup.id}
							className="bg-muted/30 hover:bg-muted/30"
						>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead
										key={header.id}
										className={header.column.columnDef.meta?.headClassName}
									>
										{renderHeaderContent(header)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.map((row) => (
						<TableRow
							key={row.id}
							className="border-border/40"
							data-testid="watchlist-table-row"
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell
									key={cell.id}
									className={cell.column.columnDef.meta?.cellClassName}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
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
				<SortDirectionIcon className="size-3 text-primary" />
			</Activity>
		</button>
	);
}
