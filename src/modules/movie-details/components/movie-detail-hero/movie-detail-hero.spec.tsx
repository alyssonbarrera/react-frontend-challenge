import { makeMovie } from "@tests/factories/make-movie";
import { tanstackRouterMock } from "@tests/factories/make-tanstack-router";
import { fireEvent, render, screen } from "@tests/utils";
import { MovieDetailHero } from "./movie-detail-hero";
import { useMovieDetailHero } from "./movie-detail-hero.hook";

vi.mock("./movie-detail-hero.hook");

describe("MovieDetailHero", () => {
	let movieDetailHeroHandleBackMock: ReturnType<typeof vi.fn>;
	let movieDetailHeroHandleRetryMock: ReturnType<typeof vi.fn>;
	let movieDetailHeroHandleShareMock: ReturnType<typeof vi.fn>;
	let movieDetailHeroHandlePlayTrailerMock: ReturnType<typeof vi.fn>;
	let defaultUseMovieDetailHeroMock: ReturnType<typeof useMovieDetailHero>;

	beforeEach(() => {
		tanstackRouterMock.setParams({ id: "1" });
		movieDetailHeroHandleBackMock = vi.fn();
		movieDetailHeroHandleRetryMock = vi.fn();
		movieDetailHeroHandleShareMock = vi.fn();
		movieDetailHeroHandlePlayTrailerMock = vi.fn();

		defaultUseMovieDetailHeroMock = {
			hero: {
				title: "Tenet",
				backdropUrl: "/backdrop.jpg",
				posterUrl: "/poster.jpg",
				primaryGenre: "ACTION",
				rating: 7.3,
				ratingMax: 10,
				year: "2020",
				runtime: "2h 30m",
				director: "dir. Christopher Nolan",
			},
			movie: makeMovie({ id: 1, title: "Tenet" }),
			isError: false,
			isLoading: false,
			formattedRating: "7.3",
			formattedRatingMax: "/ 10",
			handleBack: movieDetailHeroHandleBackMock,
			handleRetry: movieDetailHeroHandleRetryMock,
			handleShare: movieDetailHeroHandleShareMock,
			handlePlayTrailer: movieDetailHeroHandlePlayTrailerMock,
		};

		vi.mocked(useMovieDetailHero).mockReturnValue(
			defaultUseMovieDetailHeroMock,
		);
	});

	it("should be able to render hero skeleton while loading", () => {
		vi.mocked(useMovieDetailHero).mockReturnValueOnce({
			...defaultUseMovieDetailHeroMock,
			isLoading: true,
		});

		render(<MovieDetailHero />);

		const movieDetailHeroSkeleton = screen.getByTestId(
			"movie-detail-hero-skeleton",
		);
		const movieDetailHero = screen.queryByTestId("movie-detail-hero");

		expect(movieDetailHeroSkeleton).toBeDefined();
		expect(movieDetailHero).toBeNull();
	});

	it("should be able to render hero error and retry", () => {
		vi.mocked(useMovieDetailHero).mockReturnValueOnce({
			...defaultUseMovieDetailHeroMock,
			isError: true,
		});

		render(<MovieDetailHero />);

		const movieDetailHeroError = screen.getByTestId("movie-detail-hero-error");
		const movieDetailHeroErrorRetry = screen.getByTestId(
			"movie-detail-hero-error-retry",
		);

		fireEvent.click(movieDetailHeroErrorRetry);

		expect(movieDetailHeroError).toBeDefined();
		expect(movieDetailHeroHandleRetryMock).toHaveBeenCalled();
		expect(movieDetailHeroHandleRetryMock).toHaveBeenCalledTimes(1);
	});

	it("should not be able to render hero content without hero or movie data", () => {
		vi.mocked(useMovieDetailHero).mockReturnValueOnce({
			...defaultUseMovieDetailHeroMock,
			hero: null,
			movie: null,
			formattedRating: "",
			formattedRatingMax: "",
		});

		render(<MovieDetailHero />);

		const movieDetailHero = screen.queryByTestId("movie-detail-hero");

		expect(movieDetailHero).toBeNull();
	});

	it("should be able to render hero content and trigger header handlers", () => {
		render(<MovieDetailHero />);

		const movieDetailHero = screen.getByTestId("movie-detail-hero");
		const movieDetailHeroBackdrop = screen.getByTestId(
			"movie-detail-hero-backdrop",
		);
		const movieDetailHeroHeaderBack = screen.getByTestId(
			"movie-detail-hero-header-back",
		);
		const movieDetailHeroHeaderShare = screen.getByTestId(
			"movie-detail-hero-header-share",
		);
		const movieDetailHeroActions = screen.getByTestId(
			"movie-detail-hero-actions-desktop",
		);
		const movieDetailHeroActionsPlay = screen.getByTestId(
			"movie-detail-hero-actions-play-desktop",
		);
		const movieDetailHeroInfo = screen.getByTestId("movie-detail-hero-info");

		fireEvent.click(movieDetailHeroHeaderBack);
		fireEvent.click(movieDetailHeroHeaderShare);

		expect(movieDetailHero).toBeDefined();
		expect(movieDetailHeroBackdrop).toBeDefined();
		expect(movieDetailHeroActions).toBeDefined();
		expect(movieDetailHeroActionsPlay).toBeDefined();
		expect(movieDetailHeroInfo.textContent).toContain("Tenet");
		expect(movieDetailHeroHandleBackMock).toHaveBeenCalledTimes(1);
		expect(movieDetailHeroHandleShareMock).toHaveBeenCalledTimes(1);
	});
});
