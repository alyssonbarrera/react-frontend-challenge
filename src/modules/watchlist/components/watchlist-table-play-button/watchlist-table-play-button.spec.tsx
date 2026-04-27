import { fireEvent, render, screen } from "@tests/utils";
import { WatchlistTablePlayButton } from "./watchlist-table-play-button";
import { useWatchlistTablePlayButton } from "./watchlist-table-play-button.hook";

vi.mock("./watchlist-table-play-button.hook");

describe("WatchlistTablePlayButton", () => {
	it("should be able to render the play button correctly", () => {
		const onPlayMovie = vi.fn();
		vi.mocked(useWatchlistTablePlayButton).mockReturnValue({
			handleMouseEnter: vi.fn(),
			handleMouseLeave: vi.fn(),
			handleFocus: vi.fn(),
			handleTouchStart: vi.fn(),
			handleClick: vi.fn(),
		});

		render(
			<WatchlistTablePlayButton
				movieId={42}
				movieTitle="The Matrix"
				onPlayMovie={onPlayMovie}
			/>,
		);

		expect(useWatchlistTablePlayButton).toHaveBeenCalledTimes(1);
		expect(useWatchlistTablePlayButton).toHaveBeenCalledWith({
			movieId: 42,
			onPlayMovie,
		});

		const watchlistTableRowPlay = screen.getByTestId(
			"watchlist-table-row-play",
		);
		expect(watchlistTableRowPlay).toBeDefined();
		expect(watchlistTableRowPlay.getAttribute("aria-label")).toBe(
			"Play The Matrix",
		);
	});

	it("should be able to delegate interaction handling to play button hook", () => {
		const handleMouseEnter = vi.fn();
		const handleMouseLeave = vi.fn();
		const handleFocus = vi.fn();
		const handleTouchStart = vi.fn();
		const handleClick = vi.fn();

		vi.mocked(useWatchlistTablePlayButton).mockReturnValue({
			handleMouseEnter,
			handleMouseLeave,
			handleFocus,
			handleTouchStart,
			handleClick,
		});

		render(
			<WatchlistTablePlayButton
				movieId={42}
				movieTitle="The Matrix"
				onPlayMovie={vi.fn()}
			/>,
		);

		const watchlistTableRowPlay = screen.getByTestId(
			"watchlist-table-row-play",
		);

		fireEvent.mouseEnter(watchlistTableRowPlay);
		fireEvent.mouseLeave(watchlistTableRowPlay);
		fireEvent.focus(watchlistTableRowPlay);
		fireEvent.touchStart(watchlistTableRowPlay);
		fireEvent.click(watchlistTableRowPlay);

		expect(handleMouseEnter).toHaveBeenCalledTimes(1);
		expect(handleMouseLeave).toHaveBeenCalledTimes(1);
		expect(handleFocus).toHaveBeenCalledTimes(1);
		expect(handleTouchStart).toHaveBeenCalledTimes(1);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
