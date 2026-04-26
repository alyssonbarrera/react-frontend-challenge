import { makeMovieDetails } from "@tests/factories/make-movie-details";
import { tanstackRouterMock } from "@tests/factories/make-tanstack-router";
import { renderHook, waitFor } from "@tests/utils";
import type { MockInstance } from "vitest";
import * as movieDetailsRequestModule from "@/modules/movie-details/http/get-movie-details-request";
import { useMovieDetailAudienceScore } from "./movie-detail-audience-score.hook";

describe("useMovieDetailAudienceScore", () => {
	let getMovieDetailsRequestMock: MockInstance;

	beforeEach(() => {
		tanstackRouterMock.setParams({ id: "1" });
		getMovieDetailsRequestMock = vi.spyOn(
			movieDetailsRequestModule,
			"getMovieDetailsRequest",
		);
	});

	it("should be able to expose formatted audience score labels from movie details", async () => {
		getMovieDetailsRequestMock.mockResolvedValueOnce(
			makeMovieDetails({
				voteAverage: 7.3,
				voteCount: 125000,
			}),
		);

		const { result } = renderHook(() => useMovieDetailAudienceScore());

		await waitFor(() => {
			expect(result.current.formattedScore).toBe("7.3");
		});

		expect(result.current.formattedScoreMax).toBe("/ 10");
		expect(result.current.formattedVotes).toBe("125,000 votes");
		expect(result.current.scorePercentage).toBe(73);
	});

	it("should be able to expose empty formatted values when details query fails", async () => {
		getMovieDetailsRequestMock.mockRejectedValueOnce(
			new Error("Details failed"),
		);

		const { result } = renderHook(() => useMovieDetailAudienceScore());

		await waitFor(() => {
			expect(result.current.formattedScore).toBe("");
		});

		expect(result.current.formattedScoreMax).toBe("");
		expect(result.current.formattedVotes).toBe("");
		expect(result.current.scorePercentage).toBe(0);
	});
});
