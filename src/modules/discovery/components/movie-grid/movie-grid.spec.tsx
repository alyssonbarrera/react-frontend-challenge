import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { Movie } from "../../dtos/movie";
import { MovieGrid } from "./movie-grid";

const useMovieGridMock = vi.hoisted(() => vi.fn());

vi.mock("./movie-grid.hook", async () => {
	const actual =
		await vi.importActual<typeof import("./movie-grid.hook")>(
			"./movie-grid.hook",
		);

	return {
		...actual,
		useMovieGrid: useMovieGridMock,
	};
});

vi.mock("../movie-card", () => ({
	MovieCard: ({ movie }: { movie: Movie }) => (
		<div data-testid="movie-grid-movie-card">{movie.title}</div>
	),
	MovieCardSkeleton: () => <div data-testid="movie-card-skeleton" />,
}));

vi.mock("@tanstack/react-virtual", () => ({
	useWindowVirtualizer: () => ({
		getVirtualItems: () => [
			{ index: 0, key: "row-0", start: 0, size: 400, end: 400, lane: 0 },
		],
		getTotalSize: () => 400,
		measureElement: vi.fn(),
	}),
}));

const baseMovie: Movie = {
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

describe("MovieGrid", () => {
	let movieGridHandleRetryMock: ReturnType<typeof vi.fn>;
	let movieGridHandleEndReachedMock: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		movieGridHandleRetryMock = vi.fn();
		movieGridHandleEndReachedMock = vi.fn();

		useMovieGridMock.mockReturnValue({
			movies: [baseMovie],
			isError: false,
			isPending: false,
			hasMovies: true,
			totalCount: 1,
			isFetching: false,
			hasNextPage: true,
			searchQuery: "",
			handleRetry: movieGridHandleRetryMock,
			handleEndReached: movieGridHandleEndReachedMock,
			isFetchingNextPage: false,
		});
	});

	it("should be able to render the skeleton while pending", async () => {
		useMovieGridMock.mockReturnValue({
			movies: [],
			isError: false,
			isPending: true,
			hasMovies: false,
			totalCount: 0,
			isFetching: false,
			hasNextPage: false,
			searchQuery: "",
			handleRetry: movieGridHandleRetryMock,
			handleEndReached: movieGridHandleEndReachedMock,
			isFetchingNextPage: false,
		});

		render(<MovieGrid />);

		const movieGridSkeleton = screen.getByTestId("movie-grid-skeleton");
		const movieGridError = screen.queryByTestId("movie-grid-error");
		const movieGridEmpty = screen.queryByTestId("movie-grid-empty");

		expect(movieGridSkeleton).toBeDefined();
		expect(movieGridError).toBeNull();
		expect(movieGridEmpty).toBeNull();
	});

	it("should be able to render error state and retry action", async () => {
		useMovieGridMock.mockReturnValue({
			movies: [],
			isError: true,
			isPending: false,
			hasMovies: false,
			totalCount: 0,
			isFetching: false,
			hasNextPage: false,
			searchQuery: "",
			handleRetry: movieGridHandleRetryMock,
			handleEndReached: movieGridHandleEndReachedMock,
			isFetchingNextPage: false,
		});

		render(<MovieGrid />);

		const movieGridError = screen.getByTestId("movie-grid-error");
		const movieGridRetry = screen.getByTestId("movie-grid-retry");

		fireEvent.click(movieGridRetry);

		expect(movieGridError).toBeDefined();
		expect(movieGridHandleRetryMock).toHaveBeenCalled();
		expect(movieGridHandleRetryMock).toHaveBeenCalledTimes(1);
	});

	it("should be able to render empty state", async () => {
		useMovieGridMock.mockReturnValue({
			movies: [],
			isError: false,
			isPending: false,
			hasMovies: false,
			totalCount: 0,
			isFetching: false,
			hasNextPage: false,
			searchQuery: "matrix",
			handleRetry: movieGridHandleRetryMock,
			handleEndReached: movieGridHandleEndReachedMock,
			isFetchingNextPage: false,
		});

		render(<MovieGrid />);

		const movieGridEmpty = screen.getByTestId("movie-grid-empty");

		expect(movieGridEmpty).toBeDefined();
		expect(movieGridEmpty.textContent).toContain("matrix");
	});

	it("should be able to render the virtualized movie grid", async () => {
		useMovieGridMock.mockReturnValue({
			movies: [baseMovie, { ...baseMovie, id: 2, title: "Dune" }],
			isError: false,
			isPending: false,
			hasMovies: true,
			totalCount: 2,
			isFetching: false,
			hasNextPage: false,
			searchQuery: "",
			handleRetry: movieGridHandleRetryMock,
			handleEndReached: movieGridHandleEndReachedMock,
			isFetchingNextPage: false,
		});

		render(<MovieGrid />);

		const movieGridVirtualizer = screen.getByTestId("movie-grid-virtualizer");
		const movieGridMovieCards = screen.getAllByTestId("movie-grid-movie-card");
		const movieGridEnd = screen.getByTestId("movie-grid-end");

		expect(movieGridVirtualizer).toBeDefined();
		expect(movieGridMovieCards).toHaveLength(2);
		expect(movieGridEnd).toBeDefined();
	});

	it("should be able to render loading footer while fetching next page", async () => {
		useMovieGridMock.mockReturnValue({
			movies: [baseMovie],
			isError: false,
			isPending: false,
			hasMovies: true,
			totalCount: 1,
			isFetching: false,
			hasNextPage: true,
			searchQuery: "",
			handleRetry: movieGridHandleRetryMock,
			handleEndReached: movieGridHandleEndReachedMock,
			isFetchingNextPage: true,
		});

		render(<MovieGrid />);

		const movieGridLoadingMore = screen.getByTestId("movie-grid-loading-more");
		const movieGridEnd = screen.queryByTestId("movie-grid-end");

		expect(movieGridLoadingMore).toBeDefined();
		expect(movieGridEnd).toBeNull();
	});

	it("should be able to call endReached handler when virtualized list reaches the end", async () => {
		useMovieGridMock.mockReturnValue({
			movies: [baseMovie],
			isError: false,
			isPending: false,
			hasMovies: true,
			totalCount: 1,
			isFetching: false,
			hasNextPage: true,
			searchQuery: "",
			handleRetry: movieGridHandleRetryMock,
			handleEndReached: movieGridHandleEndReachedMock,
			isFetchingNextPage: false,
		});

		render(<MovieGrid />);

		await waitFor(() => {
			expect(movieGridHandleEndReachedMock).toHaveBeenCalled();
		});
		expect(movieGridHandleEndReachedMock).toHaveBeenCalledTimes(1);
	});
});
