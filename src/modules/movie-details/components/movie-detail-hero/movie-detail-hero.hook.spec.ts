import { makeMovieCredits } from "@tests/factories/make-movie-credits";
import { makeMovieDetails } from "@tests/factories/make-movie-details";
import { tanstackRouterMock } from "@tests/factories/make-tanstack-router";
import { act, renderHook, waitFor } from "@tests/utils";
import type { MockInstance } from "vitest";
import * as historyBackModule from "@/infra/history/history-back";
import * as movieCreditsRequestModule from "../../http/get-movie-credits-request";
import * as movieDetailsRequestModule from "../../http/get-movie-details-request";
import { useMovieDetailHero } from "./movie-detail-hero.hook";

describe("useMovieDetailHero", () => {
	const navigateMock = vi.fn();
	const routerBackMock = vi.fn();

	let getMovieDetailsRequestMock: MockInstance;
	let getMovieCreditsRequestMock: MockInstance;
	let historyBackMock: MockInstance;

	beforeEach(() => {
		tanstackRouterMock.setNavigateMock(navigateMock);
		tanstackRouterMock.setCanGoBack(false);
		tanstackRouterMock.setBackHistoryMock(routerBackMock);
		tanstackRouterMock.setParams({ id: "1" });

		getMovieDetailsRequestMock = vi.spyOn(
			movieDetailsRequestModule,
			"getMovieDetailsRequest",
		);
		getMovieCreditsRequestMock = vi.spyOn(
			movieCreditsRequestModule,
			"getMovieCreditsRequest",
		);
		historyBackMock = vi
			.spyOn(historyBackModule, "historyBack")
			.mockImplementation(() => {});
	});

	it("should be able to go back using browser history when there is history", async () => {
		tanstackRouterMock.setCanGoBack(true);
		getMovieDetailsRequestMock.mockResolvedValueOnce(makeMovieDetails());
		getMovieCreditsRequestMock.mockResolvedValueOnce(makeMovieCredits());

		const { result } = renderHook(() => useMovieDetailHero());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		act(() => {
			result.current.handleBack();
		});

		expect(historyBackMock).toHaveBeenCalledTimes(1);
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
			releaseDate: "Aug 26, 2020",
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

	it("should be able to handle share cancellation or failure without throwing", async () => {
		getMovieDetailsRequestMock.mockResolvedValueOnce(makeMovieDetails());
		getMovieCreditsRequestMock.mockResolvedValueOnce(makeMovieCredits());

		const shareSpy = vi.fn().mockRejectedValueOnce(new Error("Share failed"));
		Object.defineProperty(window.navigator, "share", {
			value: shareSpy,
			configurable: true,
			writable: true,
		});

		const { result } = renderHook(() => useMovieDetailHero());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});

		expect(() => result.current.handleShare()).not.toThrow();
		expect(shareSpy).toHaveBeenCalledTimes(1);
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
