type UseTablePaginationParams = {
	canNextPage: boolean;
	canPreviousPage: boolean;
	onNextPage: VoidFunction;
	onPreviousPage: VoidFunction;
	onPageChange: (page: number) => void;
	testIdPrefix: string;
};

type UseTablePaginationResult = {
	infoTestId: string;
	nextTestId: string;
	nextClassName: string | undefined;
	previousTestId: string;
	previousClassName: string | undefined;
	getPageTestId: (page: number) => string;
	handleNextClick: VoidFunction;
	handlePreviousClick: VoidFunction;
	handlePageClick: (page: number, isActive: boolean) => void;
};

const DISABLED_BUTTON_CLASS_NAME = "pointer-events-none opacity-50";

export function useTablePagination({
	canNextPage,
	testIdPrefix,
	onNextPage,
	onPageChange,
	onPreviousPage,
	canPreviousPage,
}: UseTablePaginationParams): UseTablePaginationResult {
	function handlePreviousClick() {
		if (!canPreviousPage) {
			return;
		}

		onPreviousPage();
	}

	function handleNextClick() {
		if (!canNextPage) {
			return;
		}

		onNextPage();
	}

	function handlePageClick(page: number, isActive: boolean) {
		if (isActive) {
			return;
		}

		onPageChange(page);
	}

	function getPageTestId(page: number) {
		return `${testIdPrefix}-page-${page}`;
	}

	return {
		handleNextClick,
		handlePageClick,
		handlePreviousClick,
		getPageTestId,
		infoTestId: `${testIdPrefix}-info`,
		nextTestId: `${testIdPrefix}-next`,
		previousTestId: `${testIdPrefix}-previous`,
		nextClassName: canNextPage ? undefined : DISABLED_BUTTON_CLASS_NAME,
		previousClassName: canPreviousPage ? undefined : DISABLED_BUTTON_CLASS_NAME,
	};
}
