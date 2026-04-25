import { render, screen } from "@testing-library/react";
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
			isInWatchlist: false,
			handleToggleWatchlist: vi.fn(),
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

		const movieCardErrorFallback = screen.getByTestId(
			"movie-card-error-fallback",
		);
		const movieCard = screen.queryByTestId("movie-card");

		expect(movieCardErrorFallback).toBeDefined();
		expect(movieCard).toBeNull();
	});
});
