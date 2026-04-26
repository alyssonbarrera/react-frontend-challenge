import { makeMovieCredits } from "@tests/factories/make-movie-credits";
import { makeMovieDetails } from "@tests/factories/make-movie-details";
import { renderHook, waitFor } from "@tests/utils";
import { getMovieCreditsRequest } from "../../http/get-movie-credits-request";
import { getMovieDetailsRequest } from "../../http/get-movie-details-request";
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

describe("useMovieDetailBody", () => {
	const getMovieDetailsRequestMock = vi.mocked(getMovieDetailsRequest);
	const getMovieCreditsRequestMock = vi.mocked(getMovieCreditsRequest);

	beforeEach(() => {
		getMovieDetailsRequestMock.mockReset();
		getMovieCreditsRequestMock.mockReset();
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

		const { result } = renderHook(() => useMovieDetailBody());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(false);
		});

		expect(result.current.body?.synopsis).toBe("A temporal pincer movement.");
		expect(result.current.body?.cast.length).toBeGreaterThan(0);
		expect(result.current.body?.keyCrew.length).toBeGreaterThan(0);
	});

	it("should be able to keep error policy based only on details query", async () => {
		getMovieDetailsRequestMock.mockResolvedValueOnce(makeMovieDetails());
		getMovieCreditsRequestMock.mockRejectedValueOnce(
			new Error("Credits failed"),
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

		const { result } = renderHook(() => useMovieDetailBody());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(true);
		});

		expect(result.current.body).toBeNull();
	});
});
