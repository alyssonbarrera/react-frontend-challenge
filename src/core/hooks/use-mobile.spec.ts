import { act, renderHook, waitFor } from "@testing-library/react";
import { useIsMobile } from "./use-mobile";

type MatchMediaChangeListener = (event: MediaQueryListEvent) => void;

function setWindowWidth(width: number) {
	Object.defineProperty(window, "innerWidth", {
		value: width,
		writable: true,
		configurable: true,
	});
}

describe("useIsMobile", () => {
	let useIsMobileAddEventListenerMock: ReturnType<typeof vi.fn>;
	let useIsMobileRemoveEventListenerMock: ReturnType<typeof vi.fn>;
	let useIsMobileChangeListener: MatchMediaChangeListener | undefined;

	beforeEach(() => {
		useIsMobileAddEventListenerMock = vi.fn(
			(eventName: string, callback: (event: MediaQueryListEvent) => void) => {
				if (eventName === "change") {
					useIsMobileChangeListener = callback;
				}
			},
		);

		useIsMobileRemoveEventListenerMock = vi.fn();
		useIsMobileChangeListener = undefined;

		Object.defineProperty(window, "matchMedia", {
			writable: true,
			configurable: true,
			value: vi.fn().mockImplementation((query: string) => ({
				matches: window.innerWidth < 768,
				media: query,
				onchange: null,
				addEventListener: useIsMobileAddEventListenerMock,
				removeEventListener: useIsMobileRemoveEventListenerMock,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				dispatchEvent: vi.fn(),
			})),
		});
	});

	it("should be able to return true when viewport is mobile", async () => {
		setWindowWidth(640);

		const { result } = renderHook(() => useIsMobile());

		await waitFor(() => {
			expect(result.current).toBe(true);
		});

		expect(useIsMobileAddEventListenerMock).toHaveBeenCalled();
		expect(useIsMobileAddEventListenerMock).toHaveBeenCalledWith(
			"change",
			expect.any(Function),
		);
	});

	it("should be able to return false when viewport is desktop", async () => {
		setWindowWidth(1024);

		const { result } = renderHook(() => useIsMobile());

		await waitFor(() => {
			expect(result.current).toBe(false);
		});
	});

	it("should be able to update value when media query changes", async () => {
		setWindowWidth(1024);

		const { result } = renderHook(() => useIsMobile());

		await waitFor(() => {
			expect(result.current).toBe(false);
		});

		setWindowWidth(500);

		act(() => {
			useIsMobileChangeListener?.({} as MediaQueryListEvent);
		});

		await waitFor(() => {
			expect(result.current).toBe(true);
		});
	});

	it("should be able to remove the media query listener on unmount", async () => {
		setWindowWidth(640);

		const { unmount } = renderHook(() => useIsMobile());

		const useIsMobileRegisteredListener =
			useIsMobileAddEventListenerMock.mock.calls[0]?.[1];

		unmount();

		expect(useIsMobileRemoveEventListenerMock).toHaveBeenCalled();
		expect(useIsMobileRemoveEventListenerMock).toHaveBeenCalledWith(
			"change",
			useIsMobileRegisteredListener,
		);
	});
});
