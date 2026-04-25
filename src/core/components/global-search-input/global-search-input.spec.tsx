import { fireEvent, render, screen } from "@testing-library/react";
import { GlobalSearchInput } from "./global-search-input";
import { useGlobalSearchInput } from "./global-search-input.hook";

vi.mock("./global-search-input.hook");

describe("GlobalSearchInput", () => {
	let onSearchValueChangeMock: ReturnType<typeof vi.fn>;
	let defaultUseGlobalSearchInputMock: ReturnType<typeof useGlobalSearchInput>;

	beforeEach(() => {
		onSearchValueChangeMock = vi.fn();

		defaultUseGlobalSearchInputMock = {
			searchValue: "",
			onSearchValueChange: onSearchValueChangeMock,
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

	it("should be able to forward typing events to onSearchValueChange", () => {
		render(<GlobalSearchInput />);

		const globalSearchInput = screen.getByTestId("global-search-input");

		fireEvent.change(globalSearchInput, {
			target: { value: "inception" },
		});

		expect(onSearchValueChangeMock).toHaveBeenCalledTimes(1);
		expect(onSearchValueChangeMock).toHaveBeenCalledWith("inception");
	});
});
