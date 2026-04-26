import { tanstackRouterMock } from "@tests/factories/make-tanstack-router";
import { fireEvent, render, screen } from "@tests/utils";
import { MovieDetailBody } from "./movie-detail-body";
import { useMovieDetailBody } from "./movie-detail-body.hook";

vi.mock("./movie-detail-body.hook");

describe("MovieDetailBody", () => {
	let movieDetailBodyRetryKeyCrewMock: ReturnType<typeof vi.fn>;
	let defaultUseMovieDetailBodyMock: ReturnType<typeof useMovieDetailBody>;

	beforeEach(() => {
		tanstackRouterMock.setParams({ id: "1" });
		movieDetailBodyRetryKeyCrewMock = vi.fn();

		defaultUseMovieDetailBodyMock = {
			body: {
				synopsis: "A temporal pincer movement.",
				cast: [{ id: "1", name: "Cast", role: "Lead", profilePath: null }],
				audienceScore: {
					score: 7.3,
					max: 10,
					votes: 100,
				},
				keyCrew: [{ role: "Director", name: "Christopher Nolan" }],
			},
			isError: false,
			isLoading: false,
			isKeyCrewError: false,
			retryKeyCrew: movieDetailBodyRetryKeyCrewMock,
		};

		vi.mocked(useMovieDetailBody).mockReturnValue(
			defaultUseMovieDetailBodyMock,
		);
	});

	it("should be able to render body sections driven by its own hook", async () => {
		render(<MovieDetailBody />);

		const movieDetailBody = screen.getByTestId("movie-detail-body");
		const movieDetailBodyLeft = screen.getByTestId("movie-detail-body-left");
		const movieDetailBodyRight = screen.getByTestId("movie-detail-body-right");
		const movieDetailBodySynopsis = screen.getByTestId("movie-detail-synopsis");
		const movieDetailBodySynopsisBody = screen.getByTestId(
			"movie-detail-synopsis-body",
		);
		const movieDetailBodyCast = screen.getByTestId("movie-detail-cast");
		const movieDetailBodyCastCards = screen.getAllByTestId(
			"movie-detail-cast-card",
		);
		const movieDetailBodyKeyCrew = screen.getByTestId("movie-detail-key-crew");
		const movieDetailBodyKeyCrewItems = screen.getAllByTestId(
			"movie-detail-key-crew-item",
		);
		const movieDetailBodyTrailer = await screen.findByTestId(
			"movie-detail-trailer",
		);
		const movieDetailBodyAudienceScore = await screen.findByTestId(
			"movie-detail-audience-score",
		);
		const movieDetailBodyWhereToWatch = await screen.findByTestId(
			"movie-detail-where-to-watch",
		);

		expect(movieDetailBody).toBeDefined();
		expect(movieDetailBodyLeft).toBeDefined();
		expect(movieDetailBodyRight).toBeDefined();
		expect(movieDetailBodySynopsis).toBeDefined();
		expect(movieDetailBodySynopsisBody.textContent).toBe(
			"A temporal pincer movement.",
		);
		expect(movieDetailBodyCast).toBeDefined();
		expect(movieDetailBodyCastCards).toHaveLength(1);
		expect(movieDetailBodyKeyCrew).toBeDefined();
		expect(movieDetailBodyKeyCrewItems).toHaveLength(1);
		expect(movieDetailBodyTrailer).toBeDefined();
		expect(movieDetailBodyAudienceScore).toBeDefined();
		expect(movieDetailBodyWhereToWatch).toBeDefined();
	});

	it("should be able to call retry key crew handler", () => {
		vi.mocked(useMovieDetailBody).mockReturnValueOnce({
			...defaultUseMovieDetailBodyMock,
			isKeyCrewError: true,
		});

		render(<MovieDetailBody />);

		const movieDetailBodyKeyCrewRetry = screen.getByTestId(
			"movie-detail-key-crew-error-retry",
		);

		fireEvent.click(movieDetailBodyKeyCrewRetry);

		expect(movieDetailBodyRetryKeyCrewMock).toHaveBeenCalled();
		expect(movieDetailBodyRetryKeyCrewMock).toHaveBeenCalledTimes(1);
	});

	it("should be able to render body errors controlled by its own hook", () => {
		vi.mocked(useMovieDetailBody).mockReturnValueOnce({
			...defaultUseMovieDetailBodyMock,
			isError: true,
			isKeyCrewError: true,
		});

		render(<MovieDetailBody />);

		const movieDetailBodySynopsisError = screen.getByTestId(
			"movie-detail-synopsis-error",
		);
		const movieDetailBodyCastError = screen.getByTestId(
			"movie-detail-cast-error",
		);
		const movieDetailBodyKeyCrewError = screen.getByTestId(
			"movie-detail-key-crew-error",
		);

		expect(movieDetailBodySynopsisError).toBeDefined();
		expect(movieDetailBodyCastError).toBeDefined();
		expect(movieDetailBodyKeyCrewError).toBeDefined();
	});
});
