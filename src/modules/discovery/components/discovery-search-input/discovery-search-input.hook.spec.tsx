import { act, renderHook } from "@tests/utils";
import type { UrlUpdateEvent } from "nuqs/adapters/testing";
import { useDiscoverySearchInput } from "./discovery-search-input.hook";

describe("useDiscoverySearchInput", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should be able to initialize searchValue from URL query param", () => {
		const { result } = renderHook(() => useDiscoverySearchInput({}), {
			searchParams: { search: "matrix" },
		});

		const searchValue = result.current.searchValue;

		expect(searchValue).toBe("matrix");
	});

	it("should be able to update searchValue immediately on change", () => {
		const { result } = renderHook(() => useDiscoverySearchInput({}));

		act(() => {
			result.current.onSearchValueChange("inception");
		});

		const searchValue = result.current.searchValue;

		expect(searchValue).toBe("inception");
	});

	it("should be able to sync the trimmed value to the URL after the debounce delay", () => {
		const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();

		const { result } = renderHook(() => useDiscoverySearchInput({}), {
			onUrlUpdate,
		});

		act(() => {
			result.current.onSearchValueChange("tenet");
		});

		expect(onUrlUpdate).not.toHaveBeenCalled();

		act(() => {
			vi.runAllTimers();
		});

		expect(onUrlUpdate).toHaveBeenCalledTimes(1);

		const updatedSearchParams = onUrlUpdate.mock.calls[0][0].searchParams;

		expect(updatedSearchParams.get("search")).toBe("tenet");
	});

	it("should be able to call onDebouncedValueChange after debounce delay", () => {
		const onDebouncedValueChange = vi.fn();

		const { result } = renderHook(
			() => useDiscoverySearchInput({ onDebouncedValueChange }),
			{},
		);

		act(() => {
			result.current.onSearchValueChange("dune");
		});

		expect(onDebouncedValueChange).not.toHaveBeenCalled();

		act(() => {
			vi.runAllTimers();
		});

		expect(onDebouncedValueChange).toHaveBeenCalledTimes(1);
		expect(onDebouncedValueChange).toHaveBeenCalledWith("dune");
	});

	it("should be able to clear the URL param when value is empty or whitespace", () => {
		const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();

		const { result } = renderHook(() => useDiscoverySearchInput({}), {
			searchParams: { search: "matrix" },
			onUrlUpdate,
		});

		act(() => {
			result.current.onSearchValueChange("   ");
		});

		act(() => {
			vi.runAllTimers();
		});

		expect(onUrlUpdate).toHaveBeenCalledTimes(1);

		const updatedSearchParams = onUrlUpdate.mock.calls[0][0].searchParams;

		expect(updatedSearchParams.get("search")).toBeNull();
	});

	it("should be able to enforce the minimum debounce when a lower value is passed", () => {
		const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();

		const { result } = renderHook(
			() => useDiscoverySearchInput({ debounceInMs: 50 }),
			{ onUrlUpdate },
		);

		act(() => {
			result.current.onSearchValueChange("interstellar");
		});

		act(() => {
			vi.advanceTimersByTime(50);
		});

		expect(onUrlUpdate).not.toHaveBeenCalled();

		act(() => {
			vi.runAllTimers();
		});

		expect(onUrlUpdate).toHaveBeenCalledTimes(1);
	});

	it("should not be able to flush the pending debounce after unmount", () => {
		const onDebouncedValueChange = vi.fn();

		const { result, unmount } = renderHook(
			() => useDiscoverySearchInput({ onDebouncedValueChange }),
			{},
		);

		act(() => {
			result.current.onSearchValueChange("oppenheimer");
		});

		unmount();

		act(() => {
			vi.runAllTimers();
		});

		expect(onDebouncedValueChange).not.toHaveBeenCalled();
	});

	it("should be able to clear filter url params when a non-empty search is committed", () => {
		const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();

		const { result } = renderHook(() => useDiscoverySearchInput({}), {
			searchParams: {
				genre: "Drama",
				yearFrom: "1990",
				yearTo: "1999",
				minRating: "8",
				sort: "rating-desc",
			},
			onUrlUpdate,
		});

		act(() => {
			result.current.onSearchValueChange("matrix");
		});

		act(() => {
			vi.runAllTimers();
		});

		const updatedSearchParams = onUrlUpdate.mock.calls.at(-1)?.[0].searchParams;

		expect(updatedSearchParams?.get("search")).toBe("matrix");
		expect(updatedSearchParams?.get("genre")).toBeNull();
		expect(updatedSearchParams?.get("yearFrom")).toBeNull();
		expect(updatedSearchParams?.get("yearTo")).toBeNull();
		expect(updatedSearchParams?.get("minRating")).toBeNull();
		expect(updatedSearchParams?.get("sort")).toBeNull();
	});

	it("should be able to clear filter url params when the search is emptied", () => {
		const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();

		const { result } = renderHook(() => useDiscoverySearchInput({}), {
			searchParams: { search: "matrix", genre: "Drama" },
			onUrlUpdate,
		});

		act(() => {
			result.current.onSearchValueChange("   ");
		});

		act(() => {
			vi.runAllTimers();
		});

		const updatedSearchParams = onUrlUpdate.mock.calls.at(-1)?.[0].searchParams;

		expect(updatedSearchParams?.get("search")).toBeNull();
		expect(updatedSearchParams?.get("genre")).toBeNull();
	});
});
