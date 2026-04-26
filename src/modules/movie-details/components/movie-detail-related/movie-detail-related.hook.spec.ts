import { makeMoviesPage } from "@tests/factories/make-movies-page";
import { tanstackRouterMock } from "@tests/factories/make-tanstack-router";
import { renderHook, waitFor } from "@tests/utils";
import type { MockInstance } from "vitest";
import * as movieRecommendationsRequestModule from "../../http/get-movie-recommendations-request";
import { useMovieDetailRelated } from "./movie-detail-related.hook";

describe("useMovieDetailRelated", () => {
	let getMovieRecommendationsRequestMock: MockInstance;

	beforeEach(() => {
		tanstackRouterMock.setParams({ id: "1" });

		getMovieRecommendationsRequestMock = vi.spyOn(
			movieRecommendationsRequestModule,
			"getMovieRecommendationsRequest",
		);
	});

	it("should be able to expose related movies limited to eight items", async () => {
		getMovieRecommendationsRequestMock.mockResolvedValueOnce(
			makeMoviesPage({
				results: Array.from({ length: 10 }, (_, index) => ({
					id: index + 1,
					title: `Movie ${index + 1}`,
					originalTitle: `Movie ${index + 1}`,
					overview: "",
					posterPath: "/poster.jpg",
					backdropPath: null,
					releaseDate: "2020-01-01",
					voteAverage: 7.3,
					voteCount: 100,
					popularity: 10,
					genreIds: [28],
					originalLanguage: "en",
					adult: false,
					video: false,
				})),
			}),
		);

		const { result } = renderHook(() => useMovieDetailRelated());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(false);
		});

		expect(getMovieRecommendationsRequestMock).toHaveBeenCalledWith({
			movieId: 1,
		});
		expect(result.current.related).toHaveLength(8);
	});

	it("should be able to retry recommendations query", async () => {
		getMovieRecommendationsRequestMock.mockRejectedValueOnce(
			new Error("Recommendations failed"),
		);
		getMovieRecommendationsRequestMock.mockResolvedValueOnce(makeMoviesPage());

		const { result } = renderHook(() => useMovieDetailRelated());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(true);
		});

		result.current.retry();

		await waitFor(() => {
			expect(getMovieRecommendationsRequestMock).toHaveBeenCalledTimes(2);
			expect(result.current.isError).toBe(false);
		});
	});

	it("should be able to expose empty related list when recommendations request fails", async () => {
		getMovieRecommendationsRequestMock.mockRejectedValueOnce(
			new Error("Recommendations failed"),
		);

		const { result } = renderHook(() => useMovieDetailRelated());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(true);
		});

		expect(result.current.related).toEqual([]);
	});
});
