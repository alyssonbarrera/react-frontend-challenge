import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { MoreHorizontal, Play, Star } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import { toYearData } from "@/core/utils/to-year-data";
import { buildPosterUrl } from "@/modules/discovery/utils/movie.utils";
import { getGenreName } from "@/modules/discovery/utils/movie-genres.utils";
import {
	DEFAULT_DIRECTION,
	DEFAULT_SORT,
	SORTABLE_COLUMNS,
	type SortableColumn,
	type SortDirection,
} from "../../constants/watchlist-table-query";
import type { WatchlistItem } from "../../dtos/watchlist-item";
import { timeAgo } from "../../utils/time-ago";

export type {
	SortableColumn,
	SortDirection,
} from "../../constants/watchlist-table-query";

export type WatchlistTableRow = {
	id: number;
	title: string;
	posterPath: string | null;
	genreLabel: string;
	yearLabel: string;
	yearValue: number;
	ratingLabel: string;
	ratingValue: number;
	addedLabel: string;
	addedValue: number;
};

type SortQueryState = {
	sort: SortableColumn;
	direction: SortDirection;
};

type WatchlistColumn = ColumnDef<WatchlistTableRow>;

export type PaginationRangeItem = number | "ellipsis";
const DEFAULT_SORT_QUERY = {
	sort: DEFAULT_SORT,
	direction: DEFAULT_DIRECTION,
};

const FALLBACK_GENRE = "Unknown";
const FALLBACK_YEAR = "—";

function isSortableColumn(value: string): value is SortableColumn {
	return SORTABLE_COLUMNS.some((column) => column === value);
}

export function createSortingState({
	sort,
	direction,
}: SortQueryState): SortingState {
	return [{ id: sort, desc: direction === "desc" }];
}

export function toSortQueryState(sorting: SortingState): SortQueryState {
	const [firstSort] = sorting;

	if (!firstSort) {
		return { ...DEFAULT_SORT_QUERY };
	}

	const sort = isSortableColumn(firstSort.id) ? firstSort.id : DEFAULT_SORT;
	const direction: SortDirection = firstSort.desc ? "desc" : "asc";

	return { sort, direction };
}

export function getPaginationRange(
	currentPage: number,
	totalPages: number,
): PaginationRangeItem[] {
	if (totalPages <= 0) {
		return [];
	}

	const maxVisiblePages = 5;

	if (totalPages <= maxVisiblePages + 2) {
		return Array.from({ length: totalPages }, (_, index) => index + 1);
	}

	const siblings = 1;
	const leftSibling = Math.max(currentPage - siblings, 1);
	const rightSibling = Math.min(currentPage + siblings, totalPages);

	const showLeftEllipsis = leftSibling > 2;
	const showRightEllipsis = rightSibling < totalPages - 1;

	const range: PaginationRangeItem[] = [1];

	if (showLeftEllipsis) {
		range.push("ellipsis");
	}

	const middleStart = showLeftEllipsis ? leftSibling : 2;
	const middleEnd = showRightEllipsis ? rightSibling : totalPages - 1;

	for (let page = middleStart; page <= middleEnd; page++) {
		range.push(page);
	}

	if (showRightEllipsis) {
		range.push("ellipsis");
	}

	range.push(totalPages);

	return range;
}

export function mapWatchlistItemToRow(item: WatchlistItem): WatchlistTableRow {
	const { yearLabel, yearValue } = toYearData(item.releaseDate, FALLBACK_YEAR);
	const genreLabel = toPrimaryGenreLabel(item.genreIds);
	const { addedLabel, addedValue } = toAddedAtData(item.addedAt);
	const ratingValue = toRatingValue(item.voteAverage);

	return {
		yearLabel,
		yearValue,
		addedLabel,
		genreLabel,
		addedValue,
		ratingValue,
		id: item.id,
		title: item.title,
		ratingLabel: ratingValue.toFixed(1),
		posterPath: toPosterPath(item.posterPath),
	};
}

function toPrimaryGenreLabel(genreIds: WatchlistItem["genreIds"]): string {
	const normalizedGenreIds = Array.isArray(genreIds) ? genreIds : [];
	const primaryGenreId = normalizedGenreIds[0];

	return (
		(primaryGenreId !== undefined ? getGenreName(primaryGenreId) : undefined) ??
		FALLBACK_GENRE
	);
}

function toAddedAtData(addedAt: WatchlistItem["addedAt"]): {
	addedLabel: string;
	addedValue: number;
} {
	const safeAddedAt = typeof addedAt === "string" ? addedAt : "";
	const addedAtDate = new Date(safeAddedAt);
	const addedValue = Number.isNaN(addedAtDate.getTime())
		? 0
		: addedAtDate.getTime();

	return {
		addedValue,
		addedLabel: timeAgo(safeAddedAt),
	};
}

function toRatingValue(voteAverage: WatchlistItem["voteAverage"]): number {
	return Number.isFinite(voteAverage) ? voteAverage : 0;
}

function toPosterPath(posterPath: WatchlistItem["posterPath"]): string | null {
	return typeof posterPath === "string" ? posterPath : null;
}

type BuildColumnsParams = {
	onRemoveFromWatchlist: (id: number) => void;
};

export function buildColumns({
	onRemoveFromWatchlist,
}: BuildColumnsParams): ColumnDef<WatchlistTableRow>[] {
	return [
		createTitleColumn(),
		createGenreColumn(),
		createYearColumn(),
		createRatingColumn(),
		createAddedColumn(),
		createActionsColumn(onRemoveFromWatchlist),
	];
}

function createTitleColumn(): WatchlistColumn {
	return {
		id: "title",
		header: "Title",
		accessorKey: "title",
		sortingFn: "text",
		cell: ({ row }) => (
			<div className="flex items-center gap-3">
				<img
					src={buildPosterUrl(row.original.posterPath, "w185")}
					alt={row.original.title}
					loading="lazy"
					className="h-14 w-10 shrink-0 rounded-md object-cover"
					data-testid="watchlist-table-row-poster"
				/>
				<span
					className="font-semibold text-foreground text-sm"
					data-testid="watchlist-table-row-title"
				>
					{row.original.title}
				</span>
			</div>
		),
		meta: { headClassName: "px-6 py-4", cellClassName: "px-6 py-4.5" },
	};
}

function createGenreColumn(): WatchlistColumn {
	return {
		id: "genre",
		header: "Genre",
		accessorKey: "genreLabel",
		sortingFn: "text",
		cell: ({ row }) => (
			<span className="inline-flex items-center rounded-full border border-border bg-muted/40 px-2.5 py-1 font-medium text-[11px] text-muted-foreground">
				{row.original.genreLabel}
			</span>
		),
		meta: {
			headClassName: "w-[140px] px-6 py-4",
			cellClassName: "w-[140px] px-6 py-4.5",
		},
	};
}

function createYearColumn(): WatchlistColumn {
	return {
		id: "year",
		header: "Year",
		accessorKey: "yearValue",
		sortingFn: "basic",
		cell: ({ row }) => (
			<span className="text-muted-foreground text-sm">
				{row.original.yearLabel}
			</span>
		),
		meta: {
			headClassName: "w-[90px] px-6 py-4",
			cellClassName: "w-[90px] px-6 py-4.5",
		},
	};
}

function createRatingColumn(): WatchlistColumn {
	return {
		id: "rating",
		header: "Rating",
		accessorKey: "ratingValue",
		sortingFn: "basic",
		cell: ({ row }) => (
			<div className="flex items-center gap-1.5">
				<Star className="size-3 fill-amber-400 text-amber-400" />
				<span className="font-medium text-foreground text-sm">
					{row.original.ratingLabel}
				</span>
			</div>
		),
		meta: {
			headClassName: "w-[90px] px-6 py-4",
			cellClassName: "w-[90px] px-6 py-4.5",
		},
	};
}

function createAddedColumn(): WatchlistColumn {
	return {
		id: "added",
		header: "Added",
		accessorKey: "addedValue",
		sortingFn: "basic",
		cell: ({ row }) => (
			<span className="text-muted-foreground text-sm">
				{row.original.addedLabel}
			</span>
		),
		meta: {
			headClassName: "w-[120px] px-6 py-4",
			cellClassName: "w-[120px] px-6 py-4.5",
		},
	};
}

function createActionsColumn(
	onRemoveFromWatchlist: (id: number) => void,
): WatchlistColumn {
	return {
		id: "actions",
		header: "Actions",
		enableSorting: false,
		cell: ({ row }) => (
			<div className="flex items-center justify-end gap-2">
				<Button
					type="button"
					size="icon"
					variant="outline"
					className="size-8 rounded-full"
					aria-label={`Play ${row.original.title}`}
					data-testid="watchlist-table-row-play"
				>
					<Play className="size-3.5" />
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							type="button"
							size="icon"
							variant="ghost"
							className="size-8 rounded-full"
							aria-label={`More actions for ${row.original.title}`}
							data-testid="watchlist-table-row-actions"
						>
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onSelect={() => onRemoveFromWatchlist(row.original.id)}
							data-testid="watchlist-table-row-remove"
						>
							Remove from watchlist
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		),
		meta: {
			headClassName:
				"w-[80px] px-6 py-4 text-right font-bold text-[11px] text-muted-foreground uppercase tracking-[0.12em]",
			cellClassName: "w-[80px] px-6 py-4.5",
		},
	};
}
