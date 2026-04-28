import { fireEvent, render, screen } from "@tests/utils";
import {
	TablePagination,
	type TablePaginationRangeItem,
} from "./table-pagination";

type RenderTablePaginationOptions = {
	testIdPrefix?: string;
	totalLabel?: string;
	currentPage?: number;
	canNextPage?: boolean;
	canPreviousPage?: boolean;
	onNextPage?: VoidFunction;
	onPreviousPage?: VoidFunction;
	onPageChange?: (page: number) => void;
	paginationRange?: ReadonlyArray<TablePaginationRangeItem>;
	rangeStart?: number;
	rangeEnd?: number;
	totalRows?: number;
};

function renderTablePagination(options?: RenderTablePaginationOptions) {
	const onNextPage = options?.onNextPage ?? vi.fn();
	const onPreviousPage = options?.onPreviousPage ?? vi.fn();
	const onPageChange = options?.onPageChange ?? vi.fn();

	render(
		<TablePagination
			totalRows={options?.totalRows ?? 120}
			rangeStart={options?.rangeStart ?? 21}
			rangeEnd={options?.rangeEnd ?? 30}
			currentPage={options?.currentPage ?? 3}
			totalLabel={options?.totalLabel}
			testIdPrefix={options?.testIdPrefix}
			canNextPage={options?.canNextPage ?? true}
			canPreviousPage={options?.canPreviousPage ?? true}
			onNextPage={onNextPage}
			onPreviousPage={onPreviousPage}
			onPageChange={onPageChange}
			paginationRange={options?.paginationRange ?? [1, 2, 3, 4, 5]}
		/>,
	);

	return {
		onNextPage,
		onPreviousPage,
		onPageChange,
	};
}

describe("TablePagination", () => {
	it("should be able to render info label with range values, total rows and custom total label", () => {
		renderTablePagination({
			rangeStart: 31,
			rangeEnd: 40,
			totalRows: 85,
			totalLabel: "movies",
		});

		const tablePaginationInfo = screen.getByTestId("table-pagination-info");

		expect(tablePaginationInfo).toBeDefined();
		expect(tablePaginationInfo.textContent).toContain("Showing 31");
		expect(tablePaginationInfo.textContent).toContain("40 of 85 movies");
	});

	it("should be able to render info label with default total label when no custom label is provided", () => {
		renderTablePagination({
			rangeStart: 1,
			rangeEnd: 10,
			totalRows: 10,
			totalLabel: undefined,
		});

		const tablePaginationInfo = screen.getByTestId("table-pagination-info");

		expect(tablePaginationInfo).toBeDefined();
		expect(tablePaginationInfo.textContent).toContain("Showing 1");
		expect(tablePaginationInfo.textContent).toContain("10 of 10 items");
	});

	it("should be able to render page links from pagination range and ellipsis placeholders", () => {
		renderTablePagination({
			paginationRange: [1, "ellipsis", 4, "ellipsis", 9],
			currentPage: 4,
		});

		const tablePagination = screen.getByTestId("table-pagination");
		const tablePaginationPage1 = screen.getByTestId("table-pagination-page-1");
		const tablePaginationPage4 = screen.getByTestId("table-pagination-page-4");
		const tablePaginationPage9 = screen.getByTestId("table-pagination-page-9");
		const tablePaginationRenderedPages = screen.getAllByTestId(
			/table-pagination-page-/,
		);
		const tablePaginationEllipsis = tablePagination.querySelectorAll(
			"[data-slot='pagination-ellipsis']",
		);

		expect(tablePaginationPage1).toBeDefined();
		expect(tablePaginationPage4).toBeDefined();
		expect(tablePaginationPage9).toBeDefined();
		expect(tablePaginationRenderedPages).toHaveLength(3);
		expect(tablePaginationEllipsis).toHaveLength(2);
	});

	it("should not be able to trigger onPageChange when clicking the active page", () => {
		const onPageChange = vi.fn();

		renderTablePagination({
			currentPage: 3,
			onPageChange,
			paginationRange: [1, 2, 3, 4],
		});

		const tablePaginationPage3 = screen.getByTestId("table-pagination-page-3");

		fireEvent.click(tablePaginationPage3);

		expect(onPageChange).not.toHaveBeenCalled();
	});

	it("should be able to trigger onPageChange with page number when clicking an inactive page", () => {
		const onPageChange = vi.fn();

		renderTablePagination({
			currentPage: 3,
			onPageChange,
			paginationRange: [1, 2, 3, 4],
		});

		const tablePaginationPage2 = screen.getByTestId("table-pagination-page-2");

		fireEvent.click(tablePaginationPage2);

		expect(onPageChange).toHaveBeenCalledTimes(1);
		expect(onPageChange).toHaveBeenCalledWith(2);
	});

	it("should be able to trigger next and previous callbacks when navigation is enabled", () => {
		const onNextPage = vi.fn();
		const onPreviousPage = vi.fn();

		renderTablePagination({
			onNextPage,
			onPreviousPage,
			canNextPage: true,
			canPreviousPage: true,
		});

		const tablePaginationNext = screen.getByTestId("table-pagination-next");
		const tablePaginationPrevious = screen.getByTestId(
			"table-pagination-previous",
		);

		fireEvent.click(tablePaginationNext);
		fireEvent.click(tablePaginationPrevious);

		expect(onNextPage).toHaveBeenCalledTimes(1);
		expect(onPreviousPage).toHaveBeenCalledTimes(1);
	});

	it("should not be able to trigger next and previous callbacks when navigation is disabled", () => {
		const onNextPage = vi.fn();
		const onPreviousPage = vi.fn();

		renderTablePagination({
			onNextPage,
			onPreviousPage,
			canNextPage: false,
			canPreviousPage: false,
		});

		const tablePaginationNext = screen.getByTestId("table-pagination-next");
		const tablePaginationPrevious = screen.getByTestId(
			"table-pagination-previous",
		);

		fireEvent.click(tablePaginationNext);
		fireEvent.click(tablePaginationPrevious);

		expect(onNextPage).not.toHaveBeenCalled();
		expect(onPreviousPage).not.toHaveBeenCalled();
	});

	it("should be able to use default and custom test id prefixes", () => {
		renderTablePagination();

		const defaultTablePagination = screen.getByTestId("table-pagination");
		const defaultTablePaginationInfo = screen.getByTestId(
			"table-pagination-info",
		);

		expect(defaultTablePagination).toBeDefined();
		expect(defaultTablePaginationInfo).toBeDefined();

		renderTablePagination({ testIdPrefix: "watchlist-pagination" });

		const customTablePagination = screen.getByTestId("watchlist-pagination");
		const customTablePaginationInfo = screen.getByTestId(
			"watchlist-pagination-info",
		);
		const customTablePaginationNext = screen.getByTestId(
			"watchlist-pagination-next",
		);

		expect(customTablePagination).toBeDefined();
		expect(customTablePaginationInfo).toBeDefined();
		expect(customTablePaginationNext).toBeDefined();
	});
});
