import { fireEvent, render, screen } from "@tests/utils";
import { MovieDetailTrailer } from "./movie-detail-trailer";
import { useMovieDetailTrailer } from "./movie-detail-trailer.hook";

vi.mock("./movie-detail-trailer.hook");

describe("MovieDetailTrailer", () => {
	let movieDetailTrailerRetryMock: ReturnType<typeof vi.fn>;
	let defaultUseMovieDetailTrailerMock: ReturnType<
		typeof useMovieDetailTrailer
	>;

	beforeEach(() => {
		movieDetailTrailerRetryMock = vi.fn();

		defaultUseMovieDetailTrailerMock = {
			trailer: {
				title: "Official Trailer",
				youtubeKey: "yt-key",
			},
			isLoading: false,
			isError: false,
			retry: movieDetailTrailerRetryMock,
		};

		vi.mocked(useMovieDetailTrailer).mockReturnValue(
			defaultUseMovieDetailTrailerMock,
		);
	});

	it("should be able to render trailer player", () => {
		render(<MovieDetailTrailer />);

		const movieDetailTrailer = screen.getByTestId("movie-detail-trailer");
		const movieDetailTrailerLabel = screen.getByTestId(
			"movie-detail-trailer-label",
		);
		const movieDetailTrailerBox = screen.getByTestId(
			"movie-detail-trailer-box",
		);
		const movieDetailTrailerPlayer = screen.getByTestId("player");
		const movieDetailTrailerPlayerIframe = screen.getByTestId("player-iframe");

		expect(movieDetailTrailer).toBeDefined();
		expect(movieDetailTrailerLabel.textContent).toContain("Trailer");
		expect(movieDetailTrailerBox).toBeDefined();
		expect(movieDetailTrailerPlayer).toBeDefined();
		expect(movieDetailTrailerPlayerIframe.getAttribute("title")).toBe(
			"Official Trailer",
		);
		expect(movieDetailTrailerPlayerIframe.getAttribute("src")).toContain(
			"/embed/yt-key",
		);
	});

	it("should be able to render trailer skeleton while loading", () => {
		vi.mocked(useMovieDetailTrailer).mockReturnValueOnce({
			...defaultUseMovieDetailTrailerMock,
			isLoading: true,
			trailer: null,
		});

		render(<MovieDetailTrailer />);

		const movieDetailTrailerSkeleton = screen.getByTestId(
			"movie-detail-trailer-skeleton",
		);
		const movieDetailTrailer = screen.queryByTestId("movie-detail-trailer");

		expect(movieDetailTrailerSkeleton).toBeDefined();
		expect(movieDetailTrailer).toBeNull();
	});

	it("should be able to render trailer error and retry", () => {
		vi.mocked(useMovieDetailTrailer).mockReturnValueOnce({
			...defaultUseMovieDetailTrailerMock,
			isError: true,
			trailer: null,
		});

		render(<MovieDetailTrailer />);

		const movieDetailTrailerError = screen.getByTestId(
			"movie-detail-trailer-error",
		);
		const movieDetailTrailerErrorRetry = screen.getByTestId(
			"movie-detail-trailer-error-retry",
		);

		fireEvent.click(movieDetailTrailerErrorRetry);

		expect(movieDetailTrailerError).toBeDefined();
		expect(movieDetailTrailerRetryMock).toHaveBeenCalled();
		expect(movieDetailTrailerRetryMock).toHaveBeenCalledTimes(1);
	});

	it("should not be able to render trailer section when trailer data is missing", () => {
		vi.mocked(useMovieDetailTrailer).mockReturnValueOnce({
			...defaultUseMovieDetailTrailerMock,
			trailer: null,
		});

		render(<MovieDetailTrailer />);

		const movieDetailTrailer = screen.queryByTestId("movie-detail-trailer");

		expect(movieDetailTrailer).toBeNull();
	});
});
