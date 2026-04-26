import { useNavigate } from "@tanstack/react-router";
import { makeMovie } from "@tests/factories/make-movie";
import { fireEvent, render, screen } from "@tests/utils";
import { MovieDetailRelated } from "./movie-detail-related";
import { useMovieDetailRelated } from "./movie-detail-related.hook";

vi.mock("./movie-detail-related.hook");

describe("MovieDetailRelated", () => {
	let movieDetailRelatedRetryMock: ReturnType<typeof vi.fn>;
	let defaultUseMovieDetailRelatedMock: ReturnType<
		typeof useMovieDetailRelated
	>;

	beforeEach(() => {
		vi.mocked(useNavigate).mockReturnValue(vi.fn() as never);
		movieDetailRelatedRetryMock = vi.fn();

		defaultUseMovieDetailRelatedMock = {
			related: [
				makeMovie({ id: 1, title: "Tenet" }),
				makeMovie({ id: 2, title: "Dune" }),
			],
			isError: false,
			isLoading: false,
			retry: movieDetailRelatedRetryMock,
		};

		vi.mocked(useMovieDetailRelated).mockReturnValue(
			defaultUseMovieDetailRelatedMock,
		);
	});

	it("should be able to render related skeleton while loading", () => {
		vi.mocked(useMovieDetailRelated).mockReturnValueOnce({
			...defaultUseMovieDetailRelatedMock,
			isLoading: true,
			related: [],
		});

		render(<MovieDetailRelated />);

		const movieDetailRelatedSkeleton = screen.getByTestId(
			"movie-detail-related-skeleton",
		);
		const movieDetailRelated = screen.queryByTestId("movie-detail-related");
		const movieDetailRelatedError = screen.queryByTestId(
			"movie-detail-related-error",
		);
		const movieDetailRelatedSkeletonMovieCards = screen.getAllByTestId(
			"movie-card-skeleton",
		);

		expect(movieDetailRelatedSkeleton).toBeDefined();
		expect(movieDetailRelatedSkeletonMovieCards).toHaveLength(4);
		expect(movieDetailRelated).toBeNull();
		expect(movieDetailRelatedError).toBeNull();
	});

	it("should be able to render related error and retry", () => {
		vi.mocked(useMovieDetailRelated).mockReturnValueOnce({
			...defaultUseMovieDetailRelatedMock,
			isError: true,
			related: [],
		});

		render(<MovieDetailRelated />);

		const movieDetailRelatedError = screen.getByTestId(
			"movie-detail-related-error",
		);
		const movieDetailRelatedRetry = screen.getByTestId(
			"movie-detail-related-error-retry",
		);

		fireEvent.click(movieDetailRelatedRetry);

		expect(movieDetailRelatedError).toBeDefined();
		expect(movieDetailRelatedRetryMock).toHaveBeenCalled();
		expect(movieDetailRelatedRetryMock).toHaveBeenCalledTimes(1);
	});

	it("should not be able to render related section when there are no related movies", () => {
		vi.mocked(useMovieDetailRelated).mockReturnValueOnce({
			...defaultUseMovieDetailRelatedMock,
			related: [],
		});

		render(<MovieDetailRelated />);

		const movieDetailRelated = screen.queryByTestId("movie-detail-related");

		expect(movieDetailRelated).toBeNull();
	});

	it("should be able to render related section and movie cards", () => {
		render(<MovieDetailRelated />);

		const movieDetailRelated = screen.getByTestId("movie-detail-related");
		const movieDetailRelatedHeader = screen.getByTestId(
			"movie-detail-related-header",
		);
		const movieDetailRelatedGrid = screen.getByTestId(
			"movie-detail-related-grid",
		);
		const movieDetailRelatedMovieCards = screen.getAllByTestId("movie-card");

		expect(movieDetailRelated).toBeDefined();
		expect(movieDetailRelatedHeader).toBeDefined();
		expect(movieDetailRelatedGrid).toBeDefined();
		expect(movieDetailRelatedMovieCards).toHaveLength(2);
	});
});
