import { fireEvent, render, screen } from "@testing-library/react";
import type { Movie } from "../../dtos/movie";
import { MovieCard } from "./movie-card";
import { useMovieCard } from "./movie-card.hook";

vi.mock("./movie-card.hook");

const movie: Movie = {
	id: 1,
	title: "Tenet",
	originalTitle: "Tenet",
	overview: "",
	posterPath: "/poster.jpg",
	backdropPath: null,
	releaseDate: "2020-08-26",
	voteAverage: 7.3,
	voteCount: 100,
	popularity: 0,
	genreIds: [28, 12],
	originalLanguage: "en",
	adult: false,
	video: false,
};

describe("MovieCard", () => {
	beforeEach(() => {
		vi.mocked(useMovieCard).mockReturnValue({
			posterUrl: "https://image.tmdb.org/poster.jpg",
			formattedYear: "2020",
			formattedGenre: "Action, Adventure",
			formattedRating: "7.3",
			handleCardFocus: vi.fn(),
			handleNavigateToDetails: vi.fn(),
			handleCardKeyDown: vi.fn(),
			handleCardMouseEnter: vi.fn(),
			handleCardMouseLeave: vi.fn(),
		});
	});

	it("should be able to render the movie card with its formatted values", () => {
		render(<MovieCard movie={movie} />);

		const movieCard = screen.getByTestId("movie-card");
		const movieCardTitle = screen.getByTestId("movie-card-title");
		const movieCardRating = screen.getByTestId("movie-card-rating");
		const movieCardMeta = screen.getByTestId("movie-card-meta");
		const movieCardPoster = screen.getByTestId("movie-card-poster");
		const movieCardPosterImage = movieCardPoster.querySelector("img");

		expect(movieCard).toBeDefined();
		expect(movieCardTitle.textContent).toBe("Tenet");
		expect(movieCardRating.textContent).toContain("7.3");
		expect(movieCardMeta.textContent).toContain("Action, Adventure");
		expect(movieCardMeta.textContent).toContain("2020");
		expect(movieCardPosterImage?.getAttribute("src")).toBe(
			"https://image.tmdb.org/poster.jpg",
		);
		expect(movieCardPosterImage?.getAttribute("alt")).toBe("Tenet");
	});

	it("should be able to render the error fallback when the hook throws", () => {
		vi.mocked(useMovieCard).mockImplementation(() => {
			throw new Error("Failed to compute movie card data");
		});

		render(<MovieCard movie={movie} />);

		const movieCardError = screen.getByTestId("movie-card-error");
		const movieCard = screen.queryByTestId("movie-card");

		expect(movieCardError).toBeDefined();
		expect(movieCard).toBeNull();
	});

	it("should be able to navigate to the movie details when the card is clicked", () => {
		const handleNavigateToDetails = vi.fn();

		vi.mocked(useMovieCard).mockReturnValue({
			posterUrl: "https://image.tmdb.org/poster.jpg",
			formattedYear: "2020",
			formattedGenre: "Action, Adventure",
			formattedRating: "7.3",
			handleCardFocus: vi.fn(),
			handleNavigateToDetails,
			handleCardKeyDown: vi.fn(),
			handleCardMouseEnter: vi.fn(),
			handleCardMouseLeave: vi.fn(),
		});

		render(<MovieCard movie={movie} />);

		fireEvent.click(screen.getByTestId("movie-card"));

		expect(handleNavigateToDetails).toHaveBeenCalledTimes(1);
	});

	it("should be able to delegate Enter key press handling to hook", () => {
		const handleCardKeyDown = vi.fn();

		vi.mocked(useMovieCard).mockReturnValue({
			posterUrl: "https://image.tmdb.org/poster.jpg",
			formattedYear: "2020",
			formattedGenre: "Action, Adventure",
			formattedRating: "7.3",
			handleCardFocus: vi.fn(),
			handleNavigateToDetails: vi.fn(),
			handleCardKeyDown,
			handleCardMouseEnter: vi.fn(),
			handleCardMouseLeave: vi.fn(),
		});

		render(<MovieCard movie={movie} />);

		fireEvent.keyDown(screen.getByTestId("movie-card"), { key: "Enter" });

		expect(handleCardKeyDown).toHaveBeenCalledTimes(1);
	});

	it("should be able to delegate Space key press handling to hook", () => {
		const handleCardKeyDown = vi.fn();

		vi.mocked(useMovieCard).mockReturnValue({
			posterUrl: "https://image.tmdb.org/poster.jpg",
			formattedYear: "2020",
			formattedGenre: "Action, Adventure",
			formattedRating: "7.3",
			handleCardFocus: vi.fn(),
			handleNavigateToDetails: vi.fn(),
			handleCardKeyDown,
			handleCardMouseEnter: vi.fn(),
			handleCardMouseLeave: vi.fn(),
		});

		render(<MovieCard movie={movie} />);

		fireEvent.keyDown(screen.getByTestId("movie-card"), { key: " " });

		expect(handleCardKeyDown).toHaveBeenCalledTimes(1);
	});

	it("should be able to delegate unsupported key press handling to hook", () => {
		const handleCardKeyDown = vi.fn();

		vi.mocked(useMovieCard).mockReturnValue({
			posterUrl: "https://image.tmdb.org/poster.jpg",
			formattedYear: "2020",
			formattedGenre: "Action, Adventure",
			formattedRating: "7.3",
			handleCardFocus: vi.fn(),
			handleNavigateToDetails: vi.fn(),
			handleCardKeyDown,
			handleCardMouseEnter: vi.fn(),
			handleCardMouseLeave: vi.fn(),
		});

		render(<MovieCard movie={movie} />);

		fireEvent.keyDown(screen.getByTestId("movie-card"), { key: "Escape" });

		expect(handleCardKeyDown).toHaveBeenCalledTimes(1);
	});

	it("should be able to delegate mouse enter prefetch handling to hook", () => {
		const handleCardMouseEnter = vi.fn();

		vi.mocked(useMovieCard).mockReturnValue({
			posterUrl: "https://image.tmdb.org/poster.jpg",
			formattedYear: "2020",
			formattedGenre: "Action, Adventure",
			formattedRating: "7.3",
			handleCardFocus: vi.fn(),
			handleNavigateToDetails: vi.fn(),
			handleCardKeyDown: vi.fn(),
			handleCardMouseEnter,
			handleCardMouseLeave: vi.fn(),
		});

		render(<MovieCard movie={movie} />);

		fireEvent.mouseEnter(screen.getByTestId("movie-card"));

		expect(handleCardMouseEnter).toHaveBeenCalledTimes(1);
	});

	it("should be able to delegate mouse leave prefetch cancellation handling to hook", () => {
		const handleCardMouseLeave = vi.fn();

		vi.mocked(useMovieCard).mockReturnValue({
			posterUrl: "https://image.tmdb.org/poster.jpg",
			formattedYear: "2020",
			formattedGenre: "Action, Adventure",
			formattedRating: "7.3",
			handleCardFocus: vi.fn(),
			handleNavigateToDetails: vi.fn(),
			handleCardKeyDown: vi.fn(),
			handleCardMouseEnter: vi.fn(),
			handleCardMouseLeave,
		});

		render(<MovieCard movie={movie} />);

		fireEvent.mouseLeave(screen.getByTestId("movie-card"));

		expect(handleCardMouseLeave).toHaveBeenCalledTimes(1);
	});

	it("should be able to delegate focus prefetch handling to hook", () => {
		const handleCardFocus = vi.fn();

		vi.mocked(useMovieCard).mockReturnValue({
			posterUrl: "https://image.tmdb.org/poster.jpg",
			formattedYear: "2020",
			formattedGenre: "Action, Adventure",
			formattedRating: "7.3",
			handleCardFocus,
			handleNavigateToDetails: vi.fn(),
			handleCardKeyDown: vi.fn(),
			handleCardMouseEnter: vi.fn(),
			handleCardMouseLeave: vi.fn(),
		});

		render(<MovieCard movie={movie} />);

		fireEvent.focus(screen.getByTestId("movie-card"));

		expect(handleCardFocus).toHaveBeenCalledTimes(1);
	});

	it("should be able to toggle the watchlist without navigating when the watchlist button is clicked", () => {
		const handleNavigateToDetails = vi.fn();

		vi.mocked(useMovieCard).mockReturnValue({
			posterUrl: "https://image.tmdb.org/poster.jpg",
			formattedYear: "2020",
			formattedGenre: "Action, Adventure",
			formattedRating: "7.3",
			handleCardFocus: vi.fn(),
			handleNavigateToDetails,
			handleCardKeyDown: vi.fn(),
			handleCardMouseEnter: vi.fn(),
			handleCardMouseLeave: vi.fn(),
		});

		render(<MovieCard movie={movie} />);

		fireEvent.click(screen.getByTestId("watchlist-toggle-button"));

		expect(handleNavigateToDetails).not.toHaveBeenCalled();
	});

	it("should be able to bubble key press from watchlist button to hook key handler", () => {
		const handleCardKeyDown = vi.fn();

		vi.mocked(useMovieCard).mockReturnValue({
			posterUrl: "https://image.tmdb.org/poster.jpg",
			formattedYear: "2020",
			formattedGenre: "Action, Adventure",
			formattedRating: "7.3",
			handleCardFocus: vi.fn(),
			handleNavigateToDetails: vi.fn(),
			handleCardKeyDown,
			handleCardMouseEnter: vi.fn(),
			handleCardMouseLeave: vi.fn(),
		});

		render(<MovieCard movie={movie} />);

		fireEvent.keyDown(screen.getByTestId("watchlist-toggle-button"), {
			key: "Enter",
		});

		expect(handleCardKeyDown).toHaveBeenCalledTimes(1);
	});
});
