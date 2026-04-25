import { useNavigate } from "@tanstack/react-router";
import { act, renderHook } from "@testing-library/react";
import { useWatchlistStore } from "@/modules/watchlist/stores/watchlist-store";
import type { Movie } from "../../dtos/movie";
import { useMovieCard } from "./movie-card.hook";

vi.mock("@tanstack/react-router", () => ({
	useNavigate: vi.fn(),
}));

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
		useWatchlistStore.getState().clear();
		localStorage.clear();
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

	it("should be able to toggle movie in watchlist when handleToggleWatchlist is called", () => {
		const { result } = renderHook(() => useMovieCard({ movie: baseMovie }));

		act(() => {
			result.current.handleToggleWatchlist();
		});

		expect(useWatchlistStore.getState().isInWatchlist(baseMovie.id)).toBe(true);
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
});
