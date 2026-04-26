import { fireEvent, render, screen } from "@tests/utils";
import { MovieDetailAudienceScore } from "./movie-detail-audience-score";
import { useMovieDetailAudienceScore } from "./movie-detail-audience-score.hook";

vi.mock("./movie-detail-audience-score.hook");

describe("MovieDetailAudienceScore", () => {
	let movieDetailAudienceScoreRetryMock: ReturnType<typeof vi.fn>;
	let defaultUseMovieDetailAudienceScoreMock: ReturnType<
		typeof useMovieDetailAudienceScore
	>;

	beforeEach(() => {
		movieDetailAudienceScoreRetryMock = vi.fn();

		defaultUseMovieDetailAudienceScoreMock = {
			formattedScore: "7.3",
			formattedScoreMax: "/ 10",
			formattedVotes: "100 votes",
			scorePercentage: 73,
			retryAudienceScore: movieDetailAudienceScoreRetryMock,
			isError: false,
		};

		vi.mocked(useMovieDetailAudienceScore).mockReturnValue(
			defaultUseMovieDetailAudienceScoreMock,
		);
	});

	it("should be able to render audience score content", () => {
		render(<MovieDetailAudienceScore />);

		const movieDetailAudienceScore = screen.getByTestId(
			"movie-detail-audience-score",
		);
		const movieDetailAudienceScoreLabel = screen.getByTestId(
			"movie-detail-audience-score-label",
		);
		const movieDetailAudienceScoreHeadline = screen.getByTestId(
			"movie-detail-audience-score-headline",
		);
		const movieDetailAudienceScoreBar = screen.getByTestId(
			"movie-detail-audience-score-bar",
		);

		expect(movieDetailAudienceScore).toBeDefined();
		expect(movieDetailAudienceScoreLabel.textContent).toContain(
			"Audience Score",
		);
		expect(movieDetailAudienceScoreHeadline.textContent).toContain("7.3");
		expect(movieDetailAudienceScoreHeadline.textContent).toContain("/ 10");
		expect(movieDetailAudienceScoreHeadline.textContent).toContain("100 votes");
		expect(movieDetailAudienceScoreBar).toBeDefined();
	});

	it("should be able to render audience score error and retry", () => {
		vi.mocked(useMovieDetailAudienceScore).mockReturnValueOnce({
			...defaultUseMovieDetailAudienceScoreMock,
			isError: true,
		});

		render(<MovieDetailAudienceScore />);

		const movieDetailAudienceScoreError = screen.getByTestId(
			"movie-detail-audience-score-error",
		);
		const movieDetailAudienceScoreErrorRetry = screen.getByTestId(
			"movie-detail-audience-score-error-retry",
		);

		fireEvent.click(movieDetailAudienceScoreErrorRetry);

		expect(movieDetailAudienceScoreError).toBeDefined();
		expect(movieDetailAudienceScoreRetryMock).toHaveBeenCalled();
		expect(movieDetailAudienceScoreRetryMock).toHaveBeenCalledTimes(1);
	});
});
