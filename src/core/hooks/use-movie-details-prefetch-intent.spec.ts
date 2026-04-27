import { act, renderHook } from "@testing-library/react";
import { tanstackRouterMock } from "@tests/factories/make-tanstack-router";
import { useMovieDetailsPrefetchIntent } from "./use-movie-details-prefetch-intent";

describe("useMovieDetailsPrefetchIntent", () => {
	it("should be able to preload movie details route when mouse enters and delay completes", () => {
		vi.useFakeTimers();
		const preloadRoute = vi.fn().mockResolvedValue([]);
		tanstackRouterMock.setPreloadRouteMock(preloadRoute);

		const { result } = renderHook(() => useMovieDetailsPrefetchIntent());

		act(() => {
			result.current.handleMovieMouseEnterIntentPrefetch(42);
		});

		expect(preloadRoute).not.toHaveBeenCalled();

		act(() => {
			vi.advanceTimersByTime(120);
		});

		expect(preloadRoute).toHaveBeenCalledTimes(1);
		expect(preloadRoute).toHaveBeenCalledWith({
			to: "/movie/$id",
			params: { id: "42" },
		});

		vi.useRealTimers();
	});

	it("should not be able to preload movie details route when mouse leaves before delay", () => {
		vi.useFakeTimers();
		const preloadRoute = vi.fn().mockResolvedValue([]);
		tanstackRouterMock.setPreloadRouteMock(preloadRoute);

		const { result } = renderHook(() => useMovieDetailsPrefetchIntent());

		act(() => {
			result.current.handleMovieMouseEnterIntentPrefetch(42);
			vi.advanceTimersByTime(60);
			result.current.handleMovieMouseLeaveIntentPrefetch(42);
			vi.advanceTimersByTime(120);
		});

		expect(preloadRoute).not.toHaveBeenCalled();

		vi.useRealTimers();
	});

	it("should be able to preload movie details route immediately when item receives focus", () => {
		const preloadRoute = vi.fn().mockResolvedValue([]);
		tanstackRouterMock.setPreloadRouteMock(preloadRoute);

		const { result } = renderHook(() => useMovieDetailsPrefetchIntent());

		act(() => {
			result.current.handleMovieFocusIntentPrefetch(42);
		});

		expect(preloadRoute).toHaveBeenCalledTimes(1);
		expect(preloadRoute).toHaveBeenCalledWith({
			to: "/movie/$id",
			params: { id: "42" },
		});
	});

	it("should be able to preload movie details route immediately on touch start", () => {
		const preloadRoute = vi.fn().mockResolvedValue([]);
		tanstackRouterMock.setPreloadRouteMock(preloadRoute);

		const { result } = renderHook(() => useMovieDetailsPrefetchIntent());

		act(() => {
			result.current.handleMovieTouchStartIntentPrefetch(42);
		});

		expect(preloadRoute).toHaveBeenCalledTimes(1);
		expect(preloadRoute).toHaveBeenCalledWith({
			to: "/movie/$id",
			params: { id: "42" },
		});
	});

	it("should not be able to preload movie details route twice for the same movie after success", () => {
		const preloadRoute = vi.fn().mockResolvedValue([]);
		tanstackRouterMock.setPreloadRouteMock(preloadRoute);

		const { result } = renderHook(() => useMovieDetailsPrefetchIntent());

		act(() => {
			result.current.handleMovieFocusIntentPrefetch(42);
			result.current.handleMovieTouchStartIntentPrefetch(42);
		});

		expect(preloadRoute).toHaveBeenCalledTimes(1);
	});

	it("should be able to retry preloading movie details route after a failed preload", async () => {
		const preloadRoute = vi
			.fn()
			.mockRejectedValueOnce(new Error("Network error"))
			.mockResolvedValueOnce([]);
		tanstackRouterMock.setPreloadRouteMock(preloadRoute);

		const { result } = renderHook(() => useMovieDetailsPrefetchIntent());

		await act(async () => {
			result.current.handleMovieFocusIntentPrefetch(42);
			await Promise.resolve();
		});

		await act(async () => {
			result.current.handleMovieFocusIntentPrefetch(42);
			await Promise.resolve();
		});

		expect(preloadRoute).toHaveBeenCalledTimes(2);
	});

	it("should not be able to run scheduled preload after unmount", () => {
		vi.useFakeTimers();
		const preloadRoute = vi.fn().mockResolvedValue([]);
		tanstackRouterMock.setPreloadRouteMock(preloadRoute);

		const { result, unmount } = renderHook(() =>
			useMovieDetailsPrefetchIntent(),
		);

		act(() => {
			result.current.handleMovieMouseEnterIntentPrefetch(42);
		});

		unmount();

		act(() => {
			vi.advanceTimersByTime(120);
		});

		expect(preloadRoute).not.toHaveBeenCalled();

		vi.useRealTimers();
	});
});
