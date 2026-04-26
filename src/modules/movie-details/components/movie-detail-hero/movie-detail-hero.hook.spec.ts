import { useCanGoBack, useNavigate, useRouter } from "@tanstack/react-router";
import { makeMovieCredits } from "@tests/factories/make-movie-credits";
import { makeMovieDetails } from "@tests/factories/make-movie-details";
import { act, renderHook, waitFor } from "@tests/utils";
import { getMovieCreditsRequest } from "../../http/get-movie-credits-request";
import { getMovieDetailsRequest } from "../../http/get-movie-details-request";
import { useMovieDetailHero } from "./movie-detail-hero.hook";

const { useMovieDetailParamsMock } = vi.hoisted(() => ({
	useMovieDetailParamsMock: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
	useNavigate: vi.fn(),
	useCanGoBack: vi.fn(() => false),
	useRouter: vi.fn(),
	getRouteApi: vi.fn(() => ({ useParams: useMovieDetailParamsMock })),
}));

vi.mock("../../http/get-movie-details-request", () => ({
	getMovieDetailsRequest: vi.fn(),
}));

vi.mock("../../http/get-movie-credits-request", () => ({
	getMovieCreditsRequest: vi.fn(),
}));

describe("useMovieDetailHero", () => {
	const navigateMock = vi.fn();
	const routerBackMock = vi.fn();
	const getMovieDetailsRequestMock = vi.mocked(getMovieDetailsRequest);
	const getMovieCreditsRequestMock = vi.mocked(getMovieCreditsRequest);

	beforeEach(() => {
		navigateMock.mockReset();
		routerBackMock.mockReset();
		getMovieDetailsRequestMock.mockReset();
		getMovieCreditsRequestMock.mockReset();
		vi.mocked(useNavigate).mockReturnValue(navigateMock as never);
		vi.mocked(useCanGoBack).mockReturnValue(false);
		vi.mocked(useRouter).mockReturnValue({
			history: { back: routerBackMock },
		} as never);
		useMovieDetailParamsMock.mockReturnValue({ id: "1" });
	});

	it("should be able to go back using browser history when there is history", async () => {
		vi.mocked(useCanGoBack).mockReturnValue(true);
		getMovieDetailsRequestMock.mockResolvedValueOnce(makeMovieDetails());
		getMovieCreditsRequestMock.mockResolvedValueOnce(makeMovieCredits());

		const { result } = renderHook(() => useMovieDetailHero());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		act(() => {
			result.current.handleBack();
		});

		expect(routerBackMock).toHaveBeenCalledTimes(1);
		expect(navigateMock).not.toHaveBeenCalled();
	});

	it("should be able to expose hero contract and handlers from query data", async () => {
		getMovieDetailsRequestMock.mockResolvedValueOnce(
			makeMovieDetails({
				title: "Tenet",
				backdropPath: "/backdrop.jpg",
				releaseDate: "2020-08-26",
				runtime: 150,
				voteAverage: 7.3,
				genres: [{ id: 28, name: "Action" }],
			}),
		);
		getMovieCreditsRequestMock.mockResolvedValueOnce(makeMovieCredits());

		const { result } = renderHook(() => useMovieDetailHero());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(false);
		});

		expect(result.current.hero).toEqual({
			title: "Tenet",
			backdropUrl: "https://image.tmdb.org/t/p/original/backdrop.jpg",
			posterUrl: "https://image.tmdb.org/t/p/w500/poster.jpg",
			primaryGenre: "ACTION",
			rating: 7.3,
			ratingMax: 10,
			year: "2020",
			runtime: "2h 30m",
			director: "dir. Christopher Nolan",
		});
		expect(result.current.formattedRating).toBe("7.3");
		expect(result.current.formattedRatingMax).toBe("/ 10");
		expect(result.current.movie?.genreIds).toEqual([28]);

		const shareSpy = vi.fn();
		Object.defineProperty(window.navigator, "share", {
			value: shareSpy,
			configurable: true,
			writable: true,
		});

		const movieDetailTrailerElement = document.createElement("div");
		movieDetailTrailerElement.id = "movie-detail-trailer";
		movieDetailTrailerElement.scrollIntoView = vi.fn();
		document.body.append(movieDetailTrailerElement);

		act(() => {
			result.current.handleBack();
			result.current.handleShare();
			result.current.handlePlayTrailer();
		});

		expect(navigateMock).toHaveBeenCalledWith({ to: "/discovery" });
		expect(shareSpy).toHaveBeenCalledWith({
			title: "Tenet",
			url: window.location.href,
		});
		expect(movieDetailTrailerElement.scrollIntoView).toHaveBeenCalledWith({
			behavior: "smooth",
			block: "start",
		});

		document.body.removeChild(movieDetailTrailerElement);
	});

	it("should be able to expose error state when details query fails", async () => {
		getMovieDetailsRequestMock.mockRejectedValueOnce(new Error("Server error"));
		getMovieCreditsRequestMock.mockResolvedValueOnce(makeMovieCredits());

		const { result } = renderHook(() => useMovieDetailHero());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.isError).toBe(true);
		});

		expect(result.current.hero).toBeNull();
		expect(result.current.movie).toBeNull();
		expect(result.current.formattedRating).toBe("");
		expect(result.current.formattedRatingMax).toBe("");
	});
});
