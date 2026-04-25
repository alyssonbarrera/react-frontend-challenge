/** biome-ignore-all lint/suspicious/noArrayIndexKey: ellipsis position is stable per render */
import type { ComponentProps } from "react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/core/components/ui/pagination";
import { cn } from "@/core/lib/utils";
import { useTablePagination } from "./table-pagination.hook";

export type TablePaginationRangeItem = number | "ellipsis";

type TablePaginationProps = {
	rangeEnd: number;
	totalRows: number;
	rangeStart: number;
	currentPage: number;
	totalLabel?: string;
	canNextPage: boolean;
	testIdPrefix?: string;
	canPreviousPage: boolean;
	onNextPage: VoidFunction;
	onPreviousPage: VoidFunction;
	onPageChange: (page: number) => void;
	paginationRange: ReadonlyArray<TablePaginationRangeItem>;
} & Omit<ComponentProps<typeof Pagination>, "children">;

const DEFAULT_TOTAL_LABEL = "items";
const DEFAULT_TEST_ID_PREFIX = "table-pagination";

export function TablePagination({
	rangeEnd,
	className,
	totalRows,
	rangeStart,
	onNextPage,
	currentPage,
	canNextPage,
	onPageChange,
	paginationRange,
	canPreviousPage,
	onPreviousPage,
	totalLabel = DEFAULT_TOTAL_LABEL,
	testIdPrefix = DEFAULT_TEST_ID_PREFIX,
	...props
}: TablePaginationProps) {
	const {
		infoTestId,
		nextTestId,
		nextClassName,
		getPageTestId,
		handleNextClick,
		handlePageClick,
		previousTestId,
		previousClassName,
		handlePreviousClick,
	} = useTablePagination({
		onNextPage,
		testIdPrefix,
		onPageChange,
		onPreviousPage,
		canNextPage,
		canPreviousPage,
	});

	return (
		<Pagination
			className={cn("px-6 py-4", className)}
			data-testid={testIdPrefix}
			{...props}
		>
			<span className="text-muted-foreground text-sm" data-testid={infoTestId}>
				Showing{" "}
				<span className="font-medium text-foreground">{rangeStart}</span>–
				<span className="font-medium text-foreground">{rangeEnd}</span> of{" "}
				<span className="font-medium text-foreground">{totalRows}</span>{" "}
				{totalLabel}
			</span>

			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						aria-disabled={!canPreviousPage}
						data-disabled={!canPreviousPage}
						className={previousClassName}
						onClick={handlePreviousClick}
						data-testid={previousTestId}
					/>
				</PaginationItem>

				{paginationRange.map((item, index) => {
					if (item === "ellipsis") {
						return (
							<PaginationItem key={`ellipsis-${index}`}>
								<PaginationEllipsis />
							</PaginationItem>
						);
					}

					const isActive = item === currentPage;

					return (
						<PaginationItem key={item}>
							<PaginationLink
								isActive={isActive}
								onClick={() => handlePageClick(item, isActive)}
								data-testid={getPageTestId(item)}
							>
								{item}
							</PaginationLink>
						</PaginationItem>
					);
				})}

				<PaginationItem>
					<PaginationNext
						aria-disabled={!canNextPage}
						data-disabled={!canNextPage}
						className={nextClassName}
						onClick={handleNextClick}
						data-testid={nextTestId}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
