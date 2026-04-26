import { fireEvent, render, screen } from "@tests/utils";
import { MovieDetailWhereToWatch } from "./movie-detail-where-to-watch";
import { useMovieDetailWhereToWatch } from "./movie-detail-where-to-watch.hook";

vi.mock("./movie-detail-where-to-watch.hook");

describe("MovieDetailWhereToWatch", () => {
	let movieDetailWhereToWatchRetryMock: ReturnType<typeof vi.fn>;
	let movieDetailWhereToWatchSelectOptionMock: ReturnType<typeof vi.fn>;
	let defaultUseMovieDetailWhereToWatchMock: ReturnType<
		typeof useMovieDetailWhereToWatch
	>;

	beforeEach(() => {
		movieDetailWhereToWatchRetryMock = vi.fn();
		movieDetailWhereToWatchSelectOptionMock = vi.fn();

		defaultUseMovieDetailWhereToWatchMock = {
			whereToWatch: {
				region: "US",
				footnote: "Available on 3 platforms in your region.",
				options: [
					{ id: "stream", label: "Stream · Netflix", icon: "play" },
					{ id: "rent", label: "Rent · Apple TV", icon: "download" },
				],
			},
			handleSelectStreamingOption: movieDetailWhereToWatchSelectOptionMock,
			isLoading: false,
			isError: false,
			retryWhereToWatch: movieDetailWhereToWatchRetryMock,
		};

		vi.mocked(useMovieDetailWhereToWatch).mockReturnValue(
			defaultUseMovieDetailWhereToWatchMock,
		);
	});

	it("should be able to render where to watch skeleton while loading", () => {
		vi.mocked(useMovieDetailWhereToWatch).mockReturnValueOnce({
			...defaultUseMovieDetailWhereToWatchMock,
			isLoading: true,
			whereToWatch: null,
		});

		render(<MovieDetailWhereToWatch />);

		const movieDetailWhereToWatchSkeleton = screen.getByTestId(
			"movie-detail-where-to-watch-skeleton",
		);
		const movieDetailWhereToWatch = screen.queryByTestId(
			"movie-detail-where-to-watch",
		);

		expect(movieDetailWhereToWatchSkeleton).toBeDefined();
		expect(movieDetailWhereToWatch).toBeNull();
	});

	it("should be able to render where to watch error and retry", () => {
		vi.mocked(useMovieDetailWhereToWatch).mockReturnValueOnce({
			...defaultUseMovieDetailWhereToWatchMock,
			isError: true,
			whereToWatch: null,
		});

		render(<MovieDetailWhereToWatch />);

		const movieDetailWhereToWatchError = screen.getByTestId(
			"movie-detail-where-to-watch-error",
		);
		const movieDetailWhereToWatchErrorRetry = screen.getByTestId(
			"movie-detail-where-to-watch-error-retry",
		);

		fireEvent.click(movieDetailWhereToWatchErrorRetry);

		expect(movieDetailWhereToWatchError).toBeDefined();
		expect(movieDetailWhereToWatchRetryMock).toHaveBeenCalled();
		expect(movieDetailWhereToWatchRetryMock).toHaveBeenCalledTimes(1);
	});

	it("should not be able to render where to watch section when there are no providers", () => {
		vi.mocked(useMovieDetailWhereToWatch).mockReturnValueOnce({
			...defaultUseMovieDetailWhereToWatchMock,
			whereToWatch: null,
		});

		render(<MovieDetailWhereToWatch />);

		const movieDetailWhereToWatch = screen.queryByTestId(
			"movie-detail-where-to-watch",
		);

		expect(movieDetailWhereToWatch).toBeNull();
	});

	it("should be able to render where to watch section and select options", () => {
		render(<MovieDetailWhereToWatch />);

		const movieDetailWhereToWatch = screen.getByTestId(
			"movie-detail-where-to-watch",
		);
		const movieDetailWhereToWatchLabel = screen.getByTestId(
			"movie-detail-where-to-watch-label",
		);
		const movieDetailWhereToWatchRegion = screen.getByTestId(
			"movie-detail-where-to-watch-region",
		);
		const movieDetailWhereToWatchList = screen.getByTestId(
			"movie-detail-where-to-watch-list",
		);
		const movieDetailWhereToWatchOptions = screen.getAllByTestId(
			"movie-detail-where-to-watch-option",
		);
		const movieDetailWhereToWatchFootnote = screen.getByTestId(
			"movie-detail-where-to-watch-footnote",
		);

		fireEvent.click(movieDetailWhereToWatchOptions[0]);

		expect(movieDetailWhereToWatch).toBeDefined();
		expect(movieDetailWhereToWatchLabel.textContent).toContain(
			"Where to Watch",
		);
		expect(movieDetailWhereToWatchRegion.textContent).toBe("US");
		expect(movieDetailWhereToWatchList).toBeDefined();
		expect(movieDetailWhereToWatchOptions).toHaveLength(2);
		expect(movieDetailWhereToWatchFootnote.textContent).toContain(
			"Available on 3 platforms in your region.",
		);
		expect(movieDetailWhereToWatchSelectOptionMock).toHaveBeenCalledWith(
			"stream",
		);
		expect(movieDetailWhereToWatchSelectOptionMock).toHaveBeenCalledTimes(1);
	});
});
