import { useNavigate } from "@tanstack/react-router";
import { act, renderHook } from "@testing-library/react";
import { tanstackRouterMock } from "@tests/factories/make-tanstack-router";
import type { FocusEvent, KeyboardEvent } from "react";
import type { Movie } from "../../dtos/movie";
import { useMovieCard } from "./movie-card.hook";

const baseMovie: Movie = {
	id: 1,
	title: "Tenet",
	originalTitle: "Tenet",
	overview: "",
	posterPath: "/poster.jpg",
	backdropPath: null,
	releaseDate: "2020-08-26",
	voteAverage: 7.345,
	voteCount: 100,
	popularity: 0,
	genreIds: [28, 12],
	originalLanguage: "en",
	adult: false,
	video: false,
};

describe("useMovieCard", () => {
	beforeEach(() => {
		vi.mocked(useNavigate).mockReturnValue(vi.fn() as never);
	});

	it("should be able to format the movie data", () => {
		const { result } = renderHook(() => useMovieCard({ movie: baseMovie }));

		expect(result.current.formattedRating).toBe("7.3");
		expect(result.current.formattedYear).toBe("2020");
		expect(result.current.formattedGenre).toBe("Action, Adventure");
		expect(result.current.posterUrl).toContain("/poster.jpg");
	});

	it("should be able to fall back to a placeholder year when releaseDate is empty", () => {
		const { result } = renderHook(() =>
			useMovieCard({ movie: { ...baseMovie, releaseDate: "" } }),
		);

		expect(result.current.formattedYear).toBe("—");
	});

	it("should be able to fall back to Unknown when no genres are recognized", () => {
		const { result } = renderHook(() =>
			useMovieCard({ movie: { ...baseMovie, genreIds: [999999] } }),
		);

		expect(result.current.formattedGenre).toBe("Unknown");
	});

	it("should be able to limit the displayed genres to two", () => {
		const { result } = renderHook(() =>
			useMovieCard({ movie: { ...baseMovie, genreIds: [28, 12, 16] } }),
		);

		const displayedGenres = result.current.formattedGenre.split(", ");

		expect(displayedGenres).toHaveLength(2);
	});

	it("should be able to handle malformed movie values without throwing", () => {
		const malformedMovie = {
			...baseMovie,
			voteAverage: Number.NaN,
			releaseDate: null,
			genreIds: null,
		} as unknown as Movie;

		const { result } = renderHook(() =>
			useMovieCard({ movie: malformedMovie }),
		);

		expect(result.current.formattedRating).toBe("0.0");
		expect(result.current.formattedYear).toBe("—");
		expect(result.current.formattedGenre).toBe("Unknown");
	});

	it("should be able to navigate to the movie details with the movie id", () => {
		const navigate = vi.fn();
		vi.mocked(useNavigate).mockReturnValue(navigate as never);

		const { result } = renderHook(() => useMovieCard({ movie: baseMovie }));

		act(() => {
			result.current.handleNavigateToDetails();
		});

		expect(navigate).toHaveBeenCalledWith({
			to: "/movie/$id",
			params: { id: String(baseMovie.id) },
		});
	});

	it("should be able to preload movie details route on card mouse enter", () => {
		vi.useFakeTimers();
		const preloadRoute = vi.fn().mockResolvedValue([]);
		tanstackRouterMock.setPreloadRouteMock(preloadRoute);
		const { result } = renderHook(() => useMovieCard({ movie: baseMovie }));

		act(() => {
			result.current.handleCardMouseEnter();
		});

		expect(preloadRoute).not.toHaveBeenCalled();

		act(() => {
			vi.advanceTimersByTime(120);
		});

		expect(preloadRoute).toHaveBeenCalledTimes(1);
		expect(preloadRoute).toHaveBeenCalledWith({
			to: "/movie/$id",
			params: { id: String(baseMovie.id) },
		});
		vi.useRealTimers();
	});

	it("should not be able to preload movie details route when mouse leaves before delay", () => {
		vi.useFakeTimers();
		const preloadRoute = vi.fn().mockResolvedValue([]);
		tanstackRouterMock.setPreloadRouteMock(preloadRoute);
		const { result } = renderHook(() => useMovieCard({ movie: baseMovie }));

		act(() => {
			result.current.handleCardMouseEnter();
			vi.advanceTimersByTime(60);
			result.current.handleCardMouseLeave();
			vi.advanceTimersByTime(120);
		});

		expect(preloadRoute).not.toHaveBeenCalled();
		vi.useRealTimers();
	});

	it("should be able to preload movie details route when card receives focus", () => {
		const preloadRoute = vi.fn().mockResolvedValue([]);
		tanstackRouterMock.setPreloadRouteMock(preloadRoute);
		const { result } = renderHook(() => useMovieCard({ movie: baseMovie }));
		const target = document.createElement("div");
		const focusEvent = {
			currentTarget: target,
			target,
		} as unknown as FocusEvent<HTMLElement>;

		act(() => {
			result.current.handleCardFocus(focusEvent);
		});

		expect(preloadRoute).toHaveBeenCalledTimes(1);
		expect(preloadRoute).toHaveBeenCalledWith({
			to: "/movie/$id",
			params: { id: String(baseMovie.id) },
		});
	});

	it("should not be able to preload movie details route when focus comes from nested content", () => {
		const preloadRoute = vi.fn().mockResolvedValue([]);
		tanstackRouterMock.setPreloadRouteMock(preloadRoute);
		const { result } = renderHook(() => useMovieCard({ movie: baseMovie }));
		const currentTarget = document.createElement("div");
		const nestedTarget = document.createElement("button");
		const focusEvent = {
			currentTarget,
			target: nestedTarget,
		} as unknown as FocusEvent<HTMLElement>;

		act(() => {
			result.current.handleCardFocus(focusEvent);
		});

		expect(preloadRoute).not.toHaveBeenCalled();
	});

	it("should be able to preload movie details route on card touch start", () => {
		const preloadRoute = vi.fn().mockResolvedValue([]);
		tanstackRouterMock.setPreloadRouteMock(preloadRoute);
		const { result } = renderHook(() => useMovieCard({ movie: baseMovie }));

		act(() => {
			result.current.handleCardTouchStart();
		});

		expect(preloadRoute).toHaveBeenCalledTimes(1);
		expect(preloadRoute).toHaveBeenCalledWith({
			to: "/movie/$id",
			params: { id: String(baseMovie.id) },
		});
	});

	it("should be able to navigate when Enter key is pressed on card root", () => {
		const navigate = vi.fn();
		vi.mocked(useNavigate).mockReturnValue(navigate as never);
		const { result } = renderHook(() => useMovieCard({ movie: baseMovie }));
		const target = document.createElement("div");
		const preventDefault = vi.fn();
		const keyboardEvent = {
			key: "Enter",
			currentTarget: target,
			target,
			preventDefault,
		} as unknown as KeyboardEvent<HTMLElement>;

		act(() => {
			result.current.handleCardKeyDown(keyboardEvent);
		});

		expect(preventDefault).toHaveBeenCalledTimes(1);
		expect(navigate).toHaveBeenCalledWith({
			to: "/movie/$id",
			params: { id: String(baseMovie.id) },
		});
	});

	it("should not be able to navigate when key press comes from nested interactive content", () => {
		const navigate = vi.fn();
		vi.mocked(useNavigate).mockReturnValue(navigate as never);
		const { result } = renderHook(() => useMovieCard({ movie: baseMovie }));
		const currentTarget = document.createElement("div");
		const nestedTarget = document.createElement("button");
		const preventDefault = vi.fn();
		const keyboardEvent = {
			key: "Enter",
			currentTarget,
			target: nestedTarget,
			preventDefault,
		} as unknown as KeyboardEvent<HTMLElement>;

		act(() => {
			result.current.handleCardKeyDown(keyboardEvent);
		});

		expect(preventDefault).not.toHaveBeenCalled();
		expect(navigate).not.toHaveBeenCalled();
	});
});
