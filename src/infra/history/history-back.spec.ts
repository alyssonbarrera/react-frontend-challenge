import { historyBack } from "./history-back";

describe("historyBack", () => {
	const originalBack = window.history.back;

	afterEach(() => {
		window.history.back = originalBack;
		Reflect.deleteProperty(
			window as unknown as Record<string, unknown>,
			"navigation",
		);
	});

	it("should be able to delegate to window.navigation.back when the Navigation API is available", () => {
		const navBackMock = vi.fn();
		const historyBackMock = vi.fn();

		Object.defineProperty(window, "navigation", {
			value: { back: navBackMock },
			configurable: true,
			writable: true,
		});
		window.history.back = historyBackMock;

		historyBack();

		expect(navBackMock).toHaveBeenCalledTimes(1);
		expect(historyBackMock).not.toHaveBeenCalled();
	});

	it("should be able to fall back to window.history.back when the Navigation API is missing", () => {
		const historyBackMock = vi.fn();
		window.history.back = historyBackMock;

		historyBack();

		expect(historyBackMock).toHaveBeenCalledTimes(1);
	});
});
