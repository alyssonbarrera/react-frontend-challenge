import { makeMovie } from "@tests/factories/make-movie";
import { fireEvent, render, screen } from "@tests/utils";
import { useWatchlistStore } from "@/modules/watchlist/stores/watchlist-store";
import { MovieDetailHeroActions } from "./movie-detail-hero-actions";
import { useMovieDetailHeroActions } from "./movie-detail-hero-actions.hook";

vi.mock("./movie-detail-hero-actions.hook");

describe("MovieDetailHeroActions", () => {
	let movieDetailHeroActionsOnPlayTrailerMock: ReturnType<typeof vi.fn>;
	let defaultUseMovieDetailHeroActionsMock: ReturnType<
		typeof useMovieDetailHeroActions
	>;

	beforeEach(() => {
		movieDetailHeroActionsOnPlayTrailerMock = vi.fn();
		useWatchlistStore.getState().clear();

		defaultUseMovieDetailHeroActionsMock = {
			isWatchTrailerDisabled: false,
			isWatchTrailerLoading: false,
		};

		vi.mocked(useMovieDetailHeroActions).mockReturnValue(
			defaultUseMovieDetailHeroActionsMock,
		);
	});

	it("should be able to render hero actions and watchlist button", () => {
		render(
			<MovieDetailHeroActions
				movie={makeMovie({ id: 1, title: "Tenet" })}
				onPlayTrailer={movieDetailHeroActionsOnPlayTrailerMock}
			/>,
		);

		const movieDetailHeroActions = screen.getByTestId(
			"movie-detail-hero-actions-desktop",
		);
		const movieDetailHeroActionsPlay = screen.getByTestId(
			"movie-detail-hero-actions-play-desktop",
		);
		const movieDetailHeroActionsWatchlist = screen.getByTestId(
			"watchlist-toggle-button",
		);

		expect(movieDetailHeroActions).toBeDefined();
		expect(movieDetailHeroActionsPlay.hasAttribute("disabled")).toBe(false);
		expect(movieDetailHeroActionsWatchlist.textContent).toContain(
			"Add to watchlist",
		);
	});

	it("should be able to call play trailer handler", () => {
		render(
			<MovieDetailHeroActions
				movie={makeMovie({ id: 1, title: "Tenet" })}
				onPlayTrailer={movieDetailHeroActionsOnPlayTrailerMock}
			/>,
		);

		const movieDetailHeroActionsPlay = screen.getByTestId(
			"movie-detail-hero-actions-play-desktop",
		);

		fireEvent.click(movieDetailHeroActionsPlay);

		expect(movieDetailHeroActionsOnPlayTrailerMock).toHaveBeenCalled();
		expect(movieDetailHeroActionsOnPlayTrailerMock).toHaveBeenCalledTimes(1);
	});

	it("should be able to disable play trailer and render loading spinner", () => {
		vi.mocked(useMovieDetailHeroActions).mockReturnValueOnce({
			...defaultUseMovieDetailHeroActionsMock,
			isWatchTrailerDisabled: true,
			isWatchTrailerLoading: true,
		});

		render(
			<MovieDetailHeroActions
				movie={makeMovie({ id: 1, title: "Tenet" })}
				onPlayTrailer={movieDetailHeroActionsOnPlayTrailerMock}
			/>,
		);

		const movieDetailHeroActionsPlay = screen.getByTestId(
			"movie-detail-hero-actions-play-desktop",
		);
		const movieDetailHeroActionsSpinner = screen.getByTestId(
			"movie-detail-hero-actions-play-spinner-desktop",
		);

		expect(movieDetailHeroActionsPlay.hasAttribute("disabled")).toBe(true);
		expect(movieDetailHeroActionsSpinner).toBeDefined();
	});
});
