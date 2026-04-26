import { makeMovie } from "@tests/mocks/factories/make-movie";
import { makeMoviesPage } from "@tests/mocks/factories/make-movies-page";
import { act, renderHook, waitFor } from "@tests/utils";
import { discoverMoviesRequest } from "../../http/discover-movies-request";
import { searchMoviesRequest } from "../../http/search-movies-request";
import { useMovieGrid } from "./movie-grid.hook";

vi.mock("../../http/discover-movies-request", () => ({
	discoverMoviesRequest: vi.fn(),
}));

vi.mock("../../http/search-movies-request", () => ({
	searchMoviesRequest: vi.fn(),
}));

describe("useMovieGrid", () => {
	const discoverMoviesRequestMock = vi.mocked(discoverMoviesRequest);
	const searchMoviesRequestMock = vi.mocked(searchMoviesRequest);

	beforeEach(() => {
		discoverMoviesRequestMock.mockReset();
		searchMoviesRequestMock.mockReset();
	});

	it("should be able to expose derived grid state in discover mode", async () => {
		discoverMoviesRequestMock.mockResolvedValueOnce(
			makeMoviesPage({
				page: 1,
				totalPages: 1,
				results: [makeMovie({ id: 1, title: "Tenet" })],
			}),
		);

		const { result } = renderHook(() => useMovieGrid());

		await waitFor(() => {
			expect(result.current.isPending).toBe(false);
			expect(result.current.isError).toBe(false);
		});

		expect(result.current.isSearching).toBe(false);
		expect(result.current.searchQuery).toBe("");
		expect(result.current.totalCount).toBe(1);
		expect(result.current.hasMovies).toBe(true);
		expect(result.current.movies).toHaveLength(1);
		expect(discoverMoviesRequestMock).toHaveBeenCalledTimes(1);
		expect(searchMoviesRequestMock).not.toHaveBeenCalled();
	});

	it("should be able to expose search mode state from query params", async () => {
		searchMoviesRequestMock.mockResolvedValueOnce(
			makeMoviesPage({
				page: 1,
				totalPages: 1,
				results: [makeMovie({ id: 2, title: "Dune" })],
			}),
		);

		const { result } = renderHook(() => useMovieGrid(), {
			searchParams: { q: "dune" },
		});

		await waitFor(() => {
			expect(result.current.isPending).toBe(false);
			expect(result.current.isError).toBe(false);
		});

		expect(result.current.isSearching).toBe(true);
		expect(result.current.searchQuery).toBe("dune");
		expect(result.current.totalCount).toBe(1);
		expect(result.current.hasMovies).toBe(true);
		expect(searchMoviesRequestMock).toHaveBeenCalledTimes(1);
		expect(discoverMoviesRequestMock).not.toHaveBeenCalled();
	});

	it("should be able to expose hasMovies as false when the API returns no results", async () => {
		discoverMoviesRequestMock.mockResolvedValueOnce(
			makeMoviesPage({ page: 1, totalPages: 1, results: [] }),
		);

		const { result } = renderHook(() => useMovieGrid());

		await waitFor(() => {
			expect(result.current.isPending).toBe(false);
			expect(result.current.isError).toBe(false);
		});

		expect(result.current.totalCount).toBe(0);
		expect(result.current.hasMovies).toBe(false);
		expect(result.current.movies).toHaveLength(0);
		expect(discoverMoviesRequestMock).toHaveBeenCalledTimes(1);
	});

	it("should be able to fetch next page when end is reached and there is a next page", async () => {
		discoverMoviesRequestMock
			.mockResolvedValueOnce(
				makeMoviesPage({
					page: 1,
					totalPages: 2,
					results: [makeMovie({ id: 1, title: "Tenet" })],
				}),
			)
			.mockResolvedValueOnce(
				makeMoviesPage({
					page: 2,
					totalPages: 2,
					results: [makeMovie({ id: 2, title: "Dune" })],
				}),
			);

		const { result } = renderHook(() => useMovieGrid());

		await waitFor(() => {
			expect(result.current.isPending).toBe(false);
			expect(result.current.isError).toBe(false);
			expect(result.current.hasNextPage).toBe(true);
			expect(result.current.totalCount).toBe(1);
		});

		act(() => {
			result.current.handleEndReached();
		});

		await waitFor(() => {
			expect(result.current.totalCount).toBe(2);
		});

		expect(result.current.movies[0].title).toBe("Tenet");
		expect(result.current.movies[1].title).toBe("Dune");
		expect(result.current.hasNextPage).toBe(false);
		expect(discoverMoviesRequestMock).toHaveBeenCalledTimes(2);
		expect(discoverMoviesRequestMock).toHaveBeenNthCalledWith(
			1,
			expect.objectContaining({ page: 1 }),
		);
		expect(discoverMoviesRequestMock).toHaveBeenNthCalledWith(
			2,
			expect.objectContaining({ page: 2 }),
		);
	});

	it("should be able to avoid fetching next page when there is no next page", async () => {
		discoverMoviesRequestMock.mockResolvedValueOnce(
			makeMoviesPage({
				page: 1,
				totalPages: 1,
				results: [makeMovie({ id: 1, title: "Tenet" })],
			}),
		);

		const { result } = renderHook(() => useMovieGrid());

		await waitFor(() => {
			expect(result.current.isPending).toBe(false);
			expect(result.current.isError).toBe(false);
			expect(result.current.hasNextPage).toBe(false);
		});

		act(() => {
			result.current.handleEndReached();
		});

		expect(discoverMoviesRequestMock).toHaveBeenCalledTimes(1);
		expect(result.current.totalCount).toBe(1);
	});

	it("should be able to retry after a failed request", async () => {
		discoverMoviesRequestMock
			.mockRejectedValueOnce(new Error("Server error"))
			.mockResolvedValueOnce(
				makeMoviesPage({
					page: 1,
					totalPages: 1,
					results: [makeMovie({ id: 1, title: "Tenet" })],
				}),
			);

		const { result } = renderHook(() => useMovieGrid());

		await waitFor(() => {
			expect(result.current.isError).toBe(true);
		});

		act(() => {
			result.current.handleRetry();
		});

		await waitFor(() => {
			expect(result.current.isPending).toBe(false);
			expect(result.current.isError).toBe(false);
		});

		expect(result.current.totalCount).toBe(1);
		expect(result.current.hasMovies).toBe(true);
		expect(discoverMoviesRequestMock).toHaveBeenCalledTimes(2);
	});

	it("should be able to expose initialItemIndex as 0 when there is no cached scroll position", async () => {
		discoverMoviesRequestMock.mockResolvedValueOnce(
			makeMoviesPage({
				page: 1,
				totalPages: 1,
				results: [makeMovie({ id: 1, title: "Tenet" })],
			}),
		);

		const { result } = renderHook(() => useMovieGrid());

		await waitFor(() => {
			expect(result.current.isPending).toBe(false);
		});

		expect(result.current.initialItemIndex).toBe(0);
	});

	it("should be able to restore initialItemIndex from a previously reported range on remount", async () => {
		discoverMoviesRequestMock.mockResolvedValue(
			makeMoviesPage({
				page: 1,
				totalPages: 1,
				results: [makeMovie({ id: 1, title: "Tenet" })],
			}),
		);

		const first = renderHook(() => useMovieGrid());

		await waitFor(() => {
			expect(first.result.current.isPending).toBe(false);
		});

		expect(first.result.current.initialItemIndex).toBe(0);

		act(() => {
			first.result.current.handleRangeChanged({
				startIndex: 24,
				endIndex: 36,
			});
		});

		first.unmount();

		const second = renderHook(() => useMovieGrid());

		await waitFor(() => {
			expect(second.result.current.isPending).toBe(false);
		});

		expect(second.result.current.initialItemIndex).toBe(24);
	});

	it("should be able to keep separate cached scroll positions for discover and search modes", async () => {
		discoverMoviesRequestMock.mockResolvedValue(
			makeMoviesPage({
				page: 1,
				totalPages: 1,
				results: [makeMovie({ id: 1, title: "Tenet" })],
			}),
		);
		searchMoviesRequestMock.mockResolvedValue(
			makeMoviesPage({
				page: 1,
				totalPages: 1,
				results: [makeMovie({ id: 2, title: "Dune" })],
			}),
		);

		const discover = renderHook(() => useMovieGrid());

		await waitFor(() => {
			expect(discover.result.current.isPending).toBe(false);
		});

		act(() => {
			discover.result.current.handleRangeChanged({
				startIndex: 10,
				endIndex: 20,
			});
		});

		discover.unmount();

		const search = renderHook(() => useMovieGrid(), {
			searchParams: { q: "dune" },
		});

		await waitFor(() => {
			expect(search.result.current.isPending).toBe(false);
		});

		expect(search.result.current.isSearching).toBe(true);
		expect(search.result.current.initialItemIndex).toBe(0);

		search.unmount();

		const discoverAgain = renderHook(() => useMovieGrid());

		await waitFor(() => {
			expect(discoverAgain.result.current.isPending).toBe(false);
		});

		expect(discoverAgain.result.current.initialItemIndex).toBe(10);
	});
});
