import { fireEvent, render, screen } from "@testing-library/react";
import { GlobalSearchInput } from "./global-search-input";
import { useGlobalSearchInput } from "./global-search-input.hook";

vi.mock("./global-search-input.hook");

describe("GlobalSearchInput", () => {
	let onSearchInputChangeMock: ReturnType<typeof vi.fn>;
	let onSearchInputKeyDownMock: ReturnType<typeof vi.fn>;
	let defaultUseGlobalSearchInputMock: ReturnType<typeof useGlobalSearchInput>;

	beforeEach(() => {
		onSearchInputChangeMock = vi.fn();
		onSearchInputKeyDownMock = vi.fn();

		defaultUseGlobalSearchInputMock = {
			searchValue: "",
			onSearchValueChange: vi.fn(),
			onSearchSubmit: vi.fn(),
			onSearchInputChange: onSearchInputChangeMock,
			onSearchInputKeyDown: onSearchInputKeyDownMock,
		};

		vi.mocked(useGlobalSearchInput).mockReturnValue(
			defaultUseGlobalSearchInputMock,
		);
	});

	it("should be able to render the search input", () => {
		render(<GlobalSearchInput />);

		const globalSearchInput = screen.getByTestId("global-search-input");

		expect(globalSearchInput).toBeDefined();
	});

	it("should be able to render the value provided by the hook", () => {
		vi.mocked(useGlobalSearchInput).mockReturnValueOnce({
			...defaultUseGlobalSearchInputMock,
			searchValue: "matrix",
		});

		render(<GlobalSearchInput />);

		const globalSearchInput = screen.getByTestId("global-search-input");

		expect(globalSearchInput).toHaveProperty("value", "matrix");
	});

	it("should be able to forward typing events to onSearchInputChange", () => {
		render(<GlobalSearchInput />);

		const globalSearchInput = screen.getByTestId("global-search-input");

		fireEvent.change(globalSearchInput, {
			target: { value: "inception" },
		});

		expect(onSearchInputChangeMock).toHaveBeenCalled();
		expect(onSearchInputChangeMock).toHaveBeenCalledTimes(1);
	});

	it("should be able to forward Enter keydown events to onSearchInputKeyDown", () => {
		vi.mocked(useGlobalSearchInput).mockReturnValueOnce({
			...defaultUseGlobalSearchInputMock,
			searchValue: "matrix",
		});

		render(<GlobalSearchInput />);

		const globalSearchInput = screen.getByTestId("global-search-input");

		fireEvent.keyDown(globalSearchInput, { key: "Enter", code: "Enter" });

		expect(onSearchInputKeyDownMock).toHaveBeenCalled();
		expect(onSearchInputKeyDownMock).toHaveBeenCalledTimes(1);
	});
});
