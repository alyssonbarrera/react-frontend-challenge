import { fireEvent, render, screen } from "@testing-library/react";
import { DiscoverySearchInput } from "./discovery-search-input";
import { useDiscoverySearchInput } from "./discovery-search-input.hook";

vi.mock("./discovery-search-input.hook");

describe("DiscoverySearchInput", () => {
	let onSearchValueChangeMock: ReturnType<typeof vi.fn>;
	let defaultUseDiscoverySearchInputMock: ReturnType<
		typeof useDiscoverySearchInput
	>;

	beforeEach(() => {
		onSearchValueChangeMock = vi.fn();

		defaultUseDiscoverySearchInputMock = {
			searchValue: "",
			onSearchValueChange: onSearchValueChangeMock,
		};

		vi.mocked(useDiscoverySearchInput).mockReturnValue(
			defaultUseDiscoverySearchInputMock,
		);
	});

	it("should be able to render the search input", () => {
		render(<DiscoverySearchInput />);

		const discoverySearchInput = screen.getByTestId(
			"dashboard-movie-search-input",
		);

		expect(discoverySearchInput).toBeDefined();
	});

	it("should be able to render the value provided by the hook", () => {
		vi.mocked(useDiscoverySearchInput).mockReturnValueOnce({
			...defaultUseDiscoverySearchInputMock,
			searchValue: "matrix",
		});

		render(<DiscoverySearchInput />);

		const discoverySearchInput = screen.getByTestId(
			"dashboard-movie-search-input",
		);

		expect(discoverySearchInput).toHaveProperty("value", "matrix");
	});

	it("should be able to forward typing events to onSearchValueChange", () => {
		render(<DiscoverySearchInput />);

		const discoverySearchInput = screen.getByTestId(
			"dashboard-movie-search-input",
		);

		fireEvent.change(discoverySearchInput, {
			target: { value: "inception" },
		});

		expect(onSearchValueChangeMock).toHaveBeenCalledTimes(1);
		expect(onSearchValueChangeMock).toHaveBeenCalledWith("inception");
	});
});
