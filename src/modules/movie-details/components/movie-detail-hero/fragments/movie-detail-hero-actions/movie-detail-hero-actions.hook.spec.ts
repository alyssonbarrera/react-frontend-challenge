import { makeMovieVideos } from "@tests/factories/make-movie-videos";
import { tanstackRouterMock } from "@tests/factories/make-tanstack-router";
import { renderHook, waitFor } from "@tests/utils";
import type { MockInstance } from "vitest";
import * as movieVideosRequestModule from "@/modules/movie-details/http/get-movie-videos-request";
import { useMovieDetailHeroActions } from "./movie-detail-hero-actions.hook";

describe("useMovieDetailHeroActions", () => {
	let getMovieVideosRequestMock: MockInstance;

	beforeEach(() => {
		tanstackRouterMock.setParams({ id: "1" });
		getMovieVideosRequestMock = vi.spyOn(
			movieVideosRequestModule,
			"getMovieVideosRequest",
		);
	});

	it("should be able to disable watch trailer while videos are loading", async () => {
		let resolveVideosRequest: (
			value: Awaited<
				ReturnType<typeof movieVideosRequestModule.getMovieVideosRequest>
			>,
		) => void = () => undefined;

		getMovieVideosRequestMock.mockImplementationOnce(
			() =>
				new Promise((resolve) => {
					resolveVideosRequest = resolve;
				}),
		);

		const { result } = renderHook(() => useMovieDetailHeroActions());

		await waitFor(() => {
			expect(result.current.isWatchTrailerLoading).toBe(true);
			expect(result.current.isWatchTrailerDisabled).toBe(true);
		});

		resolveVideosRequest(makeMovieVideos());

		await waitFor(() => {
			expect(result.current.isWatchTrailerLoading).toBe(false);
		});

		expect(getMovieVideosRequestMock).toHaveBeenCalledWith({ movieId: 1 });
	});

	it("should be able to disable watch trailer when videos query fails", async () => {
		getMovieVideosRequestMock.mockRejectedValueOnce(new Error("Videos failed"));

		const { result } = renderHook(() => useMovieDetailHeroActions());

		await waitFor(() => {
			expect(result.current.isWatchTrailerLoading).toBe(false);
			expect(result.current.isWatchTrailerDisabled).toBe(true);
		});
	});

	it("should not be able to enable watch trailer when there are no videos", async () => {
		getMovieVideosRequestMock.mockResolvedValueOnce(
			makeMovieVideos({ results: [] }),
		);

		const { result } = renderHook(() => useMovieDetailHeroActions());

		await waitFor(() => {
			expect(result.current.isWatchTrailerLoading).toBe(false);
		});

		expect(result.current.isWatchTrailerDisabled).toBe(true);
	});

	it("should be able to enable watch trailer when videos are available", async () => {
		getMovieVideosRequestMock.mockResolvedValueOnce(makeMovieVideos());

		const { result } = renderHook(() => useMovieDetailHeroActions());

		await waitFor(() => {
			expect(result.current.isWatchTrailerLoading).toBe(false);
		});

		expect(result.current.isWatchTrailerDisabled).toBe(false);
	});
});
