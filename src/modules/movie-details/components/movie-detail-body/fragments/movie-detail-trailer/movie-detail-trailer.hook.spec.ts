import { makeMovieVideos } from "@tests/factories/make-movie-videos";
import { tanstackRouterMock } from "@tests/factories/make-tanstack-router";
import { renderHook, waitFor } from "@tests/utils";
import type { MockInstance } from "vitest";
import * as movieVideosRequestModule from "@/modules/movie-details/http/get-movie-videos-request";
import { useMovieDetailTrailer } from "./movie-detail-trailer.hook";

describe("useMovieDetailTrailer", () => {
	let getMovieVideosRequestMock: MockInstance;

	beforeEach(() => {
		tanstackRouterMock.setParams({ id: "1" });
		getMovieVideosRequestMock = vi.spyOn(
			movieVideosRequestModule,
			"getMovieVideosRequest",
		);
	});

	it("should be able to prioritize official trailer over fallback trailers", async () => {
		getMovieVideosRequestMock.mockResolvedValueOnce(
			makeMovieVideos({
				results: [
					{
						id: "v1",
						key: "fallback-key",
						name: "Fallback Trailer",
						site: "YouTube",
						type: "Trailer",
						size: 1080,
						official: false,
						publishedAt: "2020-01-01T00:00:00.000Z",
					},
					{
						id: "v2",
						key: "official-key",
						name: "Official Trailer",
						site: "YouTube",
						type: "Trailer",
						size: 1080,
						official: true,
						publishedAt: "2020-01-02T00:00:00.000Z",
					},
				],
			}),
		);

		const { result } = renderHook(() => useMovieDetailTrailer());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(false);
			expect(result.current.trailer).not.toBeNull();
		});

		expect(result.current.trailer).toEqual({
			title: "Official Trailer",
			youtubeKey: "official-key",
		});
	});

	it("should be able to return null when there is no youtube trailer", async () => {
		getMovieVideosRequestMock.mockResolvedValueOnce(
			makeMovieVideos({
				results: [
					{
						id: "v1",
						key: "teaser-key",
						name: "Teaser",
						site: "YouTube",
						type: "Teaser",
						size: 1080,
						official: true,
						publishedAt: "2020-01-01T00:00:00.000Z",
					},
				],
			}),
		);

		const { result } = renderHook(() => useMovieDetailTrailer());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(false);
			expect(result.current.trailer).toBeNull();
		});
	});

	it("should be able to expose loading state while videos query is pending", async () => {
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

		const { result } = renderHook(() => useMovieDetailTrailer());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(true);
			expect(result.current.isError).toBe(false);
		});

		resolveVideosRequest(makeMovieVideos());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});
	});

	it("should be able to expose error state and refetch on retry", async () => {
		getMovieVideosRequestMock.mockRejectedValueOnce(new Error("Videos failed"));
		getMovieVideosRequestMock.mockResolvedValueOnce(
			makeMovieVideos({
				results: [
					{
						id: "v1",
						key: "retry-key",
						name: "Retry Trailer",
						site: "YouTube",
						type: "Trailer",
						size: 1080,
						official: true,
						publishedAt: "2020-01-01T00:00:00.000Z",
					},
				],
			}),
		);

		const { result } = renderHook(() => useMovieDetailTrailer());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(true);
		});

		expect(result.current.trailer).toBeNull();

		result.current.retry();

		await waitFor(() => {
			expect(getMovieVideosRequestMock).toHaveBeenCalledTimes(2);
			expect(result.current.isError).toBe(false);
			expect(result.current.trailer).not.toBeNull();
		});

		expect(result.current.trailer).toEqual({
			title: "Retry Trailer",
			youtubeKey: "retry-key",
		});
	});
});
