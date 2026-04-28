import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { MoreHorizontal, Star } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import { getGenreName } from "@/modules/discovery/utils/movie-genres.utils";
import { WatchlistTablePlayButton } from "@/modules/watchlist/components/watchlist-table-play-button";
import { WatchlistTablePoster } from "@/modules/watchlist/components/watchlist-table-poster";
import {
	SORTABLE_COLUMNS,
	type SortableColumn,
	type SortDirection,
} from "../../constants/watchlist-table-query";
import type { WatchlistItem } from "../../dtos/watchlist-item";

export type {
	SortableColumn,
	SortDirection,
} from "../../constants/watchlist-table-query";

export type WatchlistTableRow = {
	id: number;
	title: string;
	posterPath: string | null;
	genreLabel: string;
	releaseDateLabel: string;
	releaseDateValue: number;
	ratingLabel: string;
	ratingValue: number;
};

type SortQueryState = {
	sort: SortableColumn | null;
	direction: SortDirection | null;
};

type WatchlistColumn = ColumnDef<WatchlistTableRow>;

export type PaginationRangeItem = number | "ellipsis";

const FALLBACK_GENRE = "Unknown";
const FALLBACK_RELEASE_DATE = "—";
const RELEASE_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const RELEASE_DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
	timeZone: "UTC",
});

function isSortableColumn(value: string): value is SortableColumn {
	return SORTABLE_COLUMNS.some((column) => column === value);
}

export function createSortingState({
	sort,
	direction,
}: SortQueryState): SortingState {
	if (!sort || !direction) {
		return [];
	}

	return [{ id: sort, desc: direction === "desc" }];
}

export function toSortQueryState(sorting: SortingState): SortQueryState {
	const [firstSort] = sorting;

	if (!firstSort) {
		return { sort: null, direction: null };
	}

	if (!isSortableColumn(firstSort.id)) {
		return { sort: null, direction: null };
	}

	const direction: SortDirection = firstSort.desc ? "desc" : "asc";

	return { sort: firstSort.id, direction };
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
	const { releaseDateLabel, releaseDateValue } = toReleaseDateData(
		item.releaseDate,
	);
	const genreLabel = toPrimaryGenreLabel(item.genreIds);
	const ratingValue = toRatingValue(item.voteAverage);

	return {
		releaseDateLabel,
		releaseDateValue,
		genreLabel,
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

function toReleaseDateData(releaseDate: WatchlistItem["releaseDate"]): {
	releaseDateLabel: string;
	releaseDateValue: number;
} {
	const safeReleaseDate =
		typeof releaseDate === "string" ? releaseDate.trim() : "";

	if (!safeReleaseDate || !RELEASE_DATE_PATTERN.test(safeReleaseDate)) {
		return {
			releaseDateLabel: FALLBACK_RELEASE_DATE,
			releaseDateValue: 0,
		};
	}

	const [yearPart, monthPart, dayPart] = safeReleaseDate.split("-");
	const year = Number(yearPart);
	const month = Number(monthPart);
	const day = Number(dayPart);
	const parsedDate = new Date(Date.UTC(year, month - 1, day));

	const isValidDate =
		parsedDate.getUTCFullYear() === year &&
		parsedDate.getUTCMonth() + 1 === month &&
		parsedDate.getUTCDate() === day;

	if (!isValidDate) {
		return {
			releaseDateLabel: FALLBACK_RELEASE_DATE,
			releaseDateValue: 0,
		};
	}

	return {
		releaseDateLabel: RELEASE_DATE_FORMATTER.format(parsedDate),
		releaseDateValue: parsedDate.getTime(),
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
	onPlayMovie: (id: number) => void;
};

export function buildColumns({
	onRemoveFromWatchlist,
	onPlayMovie,
}: BuildColumnsParams): ColumnDef<WatchlistTableRow>[] {
	return [
		createTitleColumn(),
		createGenreColumn(),
		createReleaseDateColumn(),
		createRatingColumn(),
		createActionsColumn({
			onRemoveFromWatchlist,
			onPlayMovie,
		}),
	];
}

function createTitleColumn(): WatchlistColumn {
	return {
		id: "title",
		header: "Title",
		accessorKey: "title",
		sortingFn: "text",
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-3">
					<WatchlistTablePoster
						posterPath={row.original.posterPath}
						title={row.original.title}
					/>
					<span
						className="font-semibold text-foreground text-sm"
						data-testid="watchlist-table-row-title"
					>
						{row.original.title}
					</span>
				</div>
			);
		},
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
			<span className="inline-flex items-center rounded-full border border-border bg-surface-elevated px-2.5 py-1 font-medium text-[11px] text-secondary">
				{row.original.genreLabel}
			</span>
		),
		meta: {
			headClassName: "w-[140px] px-6 py-4",
			cellClassName: "w-[140px] px-6 py-4.5",
		},
	};
}

function createReleaseDateColumn(): WatchlistColumn {
	return {
		id: "release-date",
		header: "Release Date",
		accessorKey: "releaseDateValue",
		sortingFn: "basic",
		cell: ({ row }) => (
			<span className="text-secondary text-sm">
				{row.original.releaseDateLabel}
			</span>
		),
		meta: {
			headClassName: "w-[140px] px-6 py-4",
			cellClassName: "w-[140px] px-6 py-4.5",
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
				<Star className="size-3 fill-accent-amber text-accent-amber" />
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
function createActionsColumn({
	onRemoveFromWatchlist,
	onPlayMovie,
}: BuildColumnsParams): WatchlistColumn {
	return {
		id: "actions",
		header: () => <span className="sr-only">Actions</span>,
		enableSorting: false,
		cell: ({ row }) => (
			<div className="flex items-center justify-end gap-2">
				<WatchlistTablePlayButton
					movieId={row.original.id}
					movieTitle={row.original.title}
					onPlayMovie={onPlayMovie}
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							type="button"
							size="icon"
							variant="ghost"
							className="size-8 rounded-lg cursor-pointer"
							aria-label={`More actions for ${row.original.title}`}
							data-testid="watchlist-table-row-actions"
						>
							<MoreHorizontal className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							className="cursor-pointer"
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
			headClassName: "w-[80px] px-6 py-4",
			cellClassName: "w-[80px] px-6 py-4.5",
		},
	};
}
