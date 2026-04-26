import { makeMovieCredits } from "@tests/factories/make-movie-credits";
import { makeMovieDetails } from "@tests/factories/make-movie-details";
import { makeMovieVideos } from "@tests/factories/make-movie-videos";
import { makeMovieWatchProviders } from "@tests/factories/make-movie-watch-providers";
import { act, renderHook, waitFor } from "@tests/utils";
import { getMovieCreditsRequest } from "../../http/get-movie-credits-request";
import { getMovieDetailsRequest } from "../../http/get-movie-details-request";
import { getMovieVideosRequest } from "../../http/get-movie-videos-request";
import { getMovieWatchProvidersRequest } from "../../http/get-movie-watch-providers-request";
import { useMovieDetailBody } from "./movie-detail-body.hook";

const { useMovieDetailParamsMock } = vi.hoisted(() => ({
	useMovieDetailParamsMock: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
	getRouteApi: vi.fn(() => ({ useParams: useMovieDetailParamsMock })),
}));

vi.mock("../../http/get-movie-details-request", () => ({
	getMovieDetailsRequest: vi.fn(),
}));

vi.mock("../../http/get-movie-credits-request", () => ({
	getMovieCreditsRequest: vi.fn(),
}));

vi.mock("../../http/get-movie-videos-request", () => ({
	getMovieVideosRequest: vi.fn(),
}));

vi.mock("../../http/get-movie-watch-providers-request", () => ({
	getMovieWatchProvidersRequest: vi.fn(),
}));

describe("useMovieDetailBody", () => {
	const getMovieDetailsRequestMock = vi.mocked(getMovieDetailsRequest);
	const getMovieCreditsRequestMock = vi.mocked(getMovieCreditsRequest);
	const getMovieVideosRequestMock = vi.mocked(getMovieVideosRequest);
	const getMovieWatchProvidersRequestMock = vi.mocked(
		getMovieWatchProvidersRequest,
	);

	beforeEach(() => {
		getMovieDetailsRequestMock.mockReset();
		getMovieCreditsRequestMock.mockReset();
		getMovieVideosRequestMock.mockReset();
		getMovieWatchProvidersRequestMock.mockReset();
		useMovieDetailParamsMock.mockReturnValue({ id: "1" });
	});

	it("should be able to expose body contract and derived labels from query data", async () => {
		getMovieDetailsRequestMock.mockResolvedValueOnce(
			makeMovieDetails({
				overview: "A temporal pincer movement.",
				voteAverage: 7.3,
				voteCount: 125000,
			}),
		);
		getMovieCreditsRequestMock.mockResolvedValueOnce(makeMovieCredits());
		getMovieVideosRequestMock.mockResolvedValueOnce(makeMovieVideos());
		getMovieWatchProvidersRequestMock.mockResolvedValueOnce(
			makeMovieWatchProviders(),
		);

		const { result } = renderHook(() => useMovieDetailBody());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(false);
		});

		expect(result.current.body?.synopsis).toBe("A temporal pincer movement.");
		expect(result.current.body?.trailer).toEqual({
			title: "Tenet — Official Trailer",
			key: "L3pk_TBkihU",
		});
		expect(result.current.body?.cast.length).toBeGreaterThan(0);
		expect(result.current.body?.keyCrew.length).toBeGreaterThan(0);
		expect(result.current.body?.whereToWatch).toEqual({
			region: "US",
			options: [
				{ id: "stream", label: "Stream · Netflix", icon: "play" },
				{ id: "rent", label: "Rent · Apple TV", icon: "download" },
				{ id: "buy", label: "Buy · Amazon Video", icon: "shopping-bag" },
			],
			footnote: "Available on 3 platforms in your region.",
		});
		expect(result.current.formattedScore).toBe("7.3");
		expect(result.current.formattedScoreMax).toBe("/ 10");
		expect(result.current.formattedVotes).toBe("125,000 votes");
		expect(result.current.scorePercentage).toBe(73);

		act(() => {
			result.current.handlePlayTrailer();
			result.current.handleSelectStreamingOption("stream");
		});
	});

	it("should be able to keep error policy based only on details query", async () => {
		getMovieDetailsRequestMock.mockResolvedValueOnce(makeMovieDetails());
		getMovieCreditsRequestMock.mockRejectedValueOnce(
			new Error("Credits failed"),
		);
		getMovieVideosRequestMock.mockResolvedValueOnce(makeMovieVideos());
		getMovieWatchProvidersRequestMock.mockResolvedValueOnce(
			makeMovieWatchProviders(),
		);

		const { result } = renderHook(() => useMovieDetailBody());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(result.current.isError).toBe(false);
		expect(result.current.body).not.toBeNull();
		expect(result.current.body?.cast).toEqual([]);
		expect(result.current.body?.keyCrew).toEqual([]);
	});

	it("should be able to expose error state when details query fails", async () => {
		getMovieDetailsRequestMock.mockRejectedValueOnce(
			new Error("Details failed"),
		);
		getMovieCreditsRequestMock.mockResolvedValueOnce(makeMovieCredits());
		getMovieVideosRequestMock.mockResolvedValueOnce(makeMovieVideos());
		getMovieWatchProvidersRequestMock.mockResolvedValueOnce(
			makeMovieWatchProviders(),
		);

		const { result } = renderHook(() => useMovieDetailBody());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(true);
		});

		expect(result.current.body).toBeNull();
		expect(result.current.formattedScore).toBe("");
		expect(result.current.formattedScoreMax).toBe("");
		expect(result.current.formattedVotes).toBe("");
		expect(result.current.scorePercentage).toBe(0);
	});
});
