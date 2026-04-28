import { renderHook } from "@tests/utils";
import { useTablePagination } from "./table-pagination.hook";

function makeUseTablePaginationProps(
	overrides?: Partial<Parameters<typeof useTablePagination>[0]>,
) {
	return {
		canNextPage: true,
		canPreviousPage: true,
		onNextPage: vi.fn(),
		onPreviousPage: vi.fn(),
		onPageChange: vi.fn(),
		testIdPrefix: "table-pagination",
		...overrides,
	};
}

describe("useTablePagination", () => {
	it("should be able to generate info, next and previous test ids from the provided prefix", () => {
		const useTablePaginationProps = makeUseTablePaginationProps({
			testIdPrefix: "watchlist-pagination",
		});

		const { result } = renderHook(() =>
			useTablePagination(useTablePaginationProps),
		);

		expect(result.current.infoTestId).toBe("watchlist-pagination-info");
		expect(result.current.nextTestId).toBe("watchlist-pagination-next");
		expect(result.current.previousTestId).toBe("watchlist-pagination-previous");
	});

	it("should be able to expose disabled class names when next or previous actions are not available", () => {
		const useTablePaginationProps = makeUseTablePaginationProps({
			canNextPage: false,
			canPreviousPage: false,
		});

		const { result } = renderHook(() =>
			useTablePagination(useTablePaginationProps),
		);

		expect(result.current.nextClassName).toBe("pointer-events-none opacity-50");
		expect(result.current.previousClassName).toBe(
			"pointer-events-none opacity-50",
		);
	});

	it("should be able to expose undefined class names when next and previous actions are available", () => {
		const useTablePaginationProps = makeUseTablePaginationProps();

		const { result } = renderHook(() =>
			useTablePagination(useTablePaginationProps),
		);

		expect(result.current.nextClassName).toBeUndefined();
		expect(result.current.previousClassName).toBeUndefined();
	});

	it("should be able to call onNextPage only when next navigation is enabled", () => {
		const onNextPage = vi.fn();
		const enabledUseTablePaginationProps = makeUseTablePaginationProps({
			canNextPage: true,
			onNextPage,
		});

		const { result: enabledResult } = renderHook(() =>
			useTablePagination(enabledUseTablePaginationProps),
		);

		enabledResult.current.handleNextClick();

		expect(onNextPage).toHaveBeenCalledTimes(1);

		onNextPage.mockReset();

		const disabledUseTablePaginationProps = makeUseTablePaginationProps({
			canNextPage: false,
			onNextPage,
		});

		const { result: disabledResult } = renderHook(() =>
			useTablePagination(disabledUseTablePaginationProps),
		);

		disabledResult.current.handleNextClick();

		expect(onNextPage).not.toHaveBeenCalled();
	});

	it("should be able to call onPreviousPage only when previous navigation is enabled", () => {
		const onPreviousPage = vi.fn();
		const enabledUseTablePaginationProps = makeUseTablePaginationProps({
			canPreviousPage: true,
			onPreviousPage,
		});

		const { result: enabledResult } = renderHook(() =>
			useTablePagination(enabledUseTablePaginationProps),
		);

		enabledResult.current.handlePreviousClick();

		expect(onPreviousPage).toHaveBeenCalledTimes(1);

		onPreviousPage.mockReset();

		const disabledUseTablePaginationProps = makeUseTablePaginationProps({
			canPreviousPage: false,
			onPreviousPage,
		});

		const { result: disabledResult } = renderHook(() =>
			useTablePagination(disabledUseTablePaginationProps),
		);

		disabledResult.current.handlePreviousClick();

		expect(onPreviousPage).not.toHaveBeenCalled();
	});

	it("should be able to call onPageChange only when the clicked page is not active", () => {
		const onPageChange = vi.fn();
		const useTablePaginationProps = makeUseTablePaginationProps({
			onPageChange,
		});

		const { result } = renderHook(() =>
			useTablePagination(useTablePaginationProps),
		);

		result.current.handlePageClick(2, false);

		expect(onPageChange).toHaveBeenCalledTimes(1);
		expect(onPageChange).toHaveBeenCalledWith(2);

		onPageChange.mockReset();

		result.current.handlePageClick(2, true);

		expect(onPageChange).not.toHaveBeenCalled();
	});

	it("should be able to build the page test id using the expected format", () => {
		const useTablePaginationProps = makeUseTablePaginationProps({
			testIdPrefix: "movies-pagination",
		});

		const { result } = renderHook(() =>
			useTablePagination(useTablePaginationProps),
		);

		const pageTestId = result.current.getPageTestId(7);

		expect(pageTestId).toBe("movies-pagination-page-7");
	});
});
