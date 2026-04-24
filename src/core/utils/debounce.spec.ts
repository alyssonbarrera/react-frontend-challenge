import { debounce } from "./debounce";

describe("debounce function", () => {
	beforeAll(() => {
		vi.useFakeTimers();
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	it("should be able to delay the function call by the specified delay", () => {
		const func = vi.fn();
		const debouncedFunc = debounce(func, 1000);

		debouncedFunc();
		expect(func).not.toHaveBeenCalled();

		vi.advanceTimersByTime(1000);
		expect(func).toHaveBeenCalled();
	});

	it("should be able to call the function with the correct arguments", () => {
		const func = vi.fn();
		const debouncedFunc = debounce(func, 1000);

		debouncedFunc("arg1", "arg2");
		vi.advanceTimersByTime(1000);

		expect(func).toHaveBeenCalledWith("arg1", "arg2");
	});

	it("should be able to cancel the previous timer if called again before delay", () => {
		const func = vi.fn();
		const debouncedFunc = debounce(func, 1000);

		debouncedFunc();
		vi.advanceTimersByTime(500);
		debouncedFunc();
		vi.advanceTimersByTime(500);

		expect(func).not.toHaveBeenCalled();

		vi.advanceTimersByTime(500);
		expect(func).toHaveBeenCalled();
	});

	it("should be able to have a cancel method to cancel the debounced function", () => {
		const func = vi.fn();
		const debouncedFunc = debounce(func, 1000);

		debouncedFunc();
		debouncedFunc.cancel();

		vi.advanceTimersByTime(1000);
		expect(func).not.toHaveBeenCalled();
	});
});
