import { act, renderHook } from "@tests/utils";
import type { UrlUpdateEvent } from "nuqs/adapters/testing";
import { useGlobalSearchInput } from "./global-search-input.hook";

describe("useGlobalSearchInput", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should be able to initialize searchValue from URL query param", () => {
		const { result } = renderHook(() => useGlobalSearchInput({}), {
			searchParams: { q: "matrix" },
		});

		const searchValue = result.current.searchValue;

		expect(searchValue).toBe("matrix");
	});

	it("should be able to update searchValue immediately on change", () => {
		const { result } = renderHook(() => useGlobalSearchInput({}));

		act(() => {
			result.current.onSearchValueChange("inception");
		});

		const searchValue = result.current.searchValue;

		expect(searchValue).toBe("inception");
	});

	it("should be able to sync the trimmed value to the URL after the debounce delay", () => {
		const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();

		const { result } = renderHook(() => useGlobalSearchInput({}), {
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

		expect(updatedSearchParams.get("q")).toBe("tenet");
	});

	it("should be able to call onDebouncedValueChange after debounce delay", () => {
		const onDebouncedValueChange = vi.fn();

		const { result } = renderHook(
			() => useGlobalSearchInput({ onDebouncedValueChange }),
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

		const { result } = renderHook(() => useGlobalSearchInput({}), {
			searchParams: { q: "matrix" },
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

		expect(updatedSearchParams.get("q")).toBeNull();
	});

	it("should be able to enforce the minimum debounce when a lower value is passed", () => {
		const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();

		const { result } = renderHook(
			() => useGlobalSearchInput({ debounceInMs: 50 }),
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
			() => useGlobalSearchInput({ onDebouncedValueChange }),
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

	it("should be able to sync the value immediately when search is submitted", () => {
		const onUrlUpdate = vi.fn<(event: UrlUpdateEvent) => void>();

		const { result } = renderHook(() => useGlobalSearchInput({}), {
			onUrlUpdate,
		});

		act(() => {
			result.current.onSearchSubmit("arrival");
		});

		act(() => {
			vi.runAllTimers();
		});

		expect(onUrlUpdate).toHaveBeenCalledTimes(1);

		const updatedSearchParams = onUrlUpdate.mock.calls[0][0].searchParams;

		expect(updatedSearchParams.get("q")).toBe("arrival");
	});

	it("should be able to cancel pending debounce and keep only the immediate submit sync", () => {
		const onDebouncedValueChange = vi.fn();

		const { result } = renderHook(
			() => useGlobalSearchInput({ onDebouncedValueChange }),
			{},
		);

		act(() => {
			result.current.onSearchValueChange("first value");
			result.current.onSearchSubmit("second value");
		});

		expect(onDebouncedValueChange).toHaveBeenCalledTimes(1);
		expect(onDebouncedValueChange).toHaveBeenCalledWith("second value");

		act(() => {
			vi.runAllTimers();
		});

		expect(onDebouncedValueChange).toHaveBeenCalledTimes(1);
	});
});
