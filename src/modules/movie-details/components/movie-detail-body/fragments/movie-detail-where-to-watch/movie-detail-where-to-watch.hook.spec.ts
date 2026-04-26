import { makeMovieWatchProviders } from "@tests/factories/make-movie-watch-providers";
import { tanstackRouterMock } from "@tests/factories/make-tanstack-router";
import { renderHook, waitFor } from "@tests/utils";
import { getMovieWatchProvidersRequest } from "@/modules/movie-details/http/get-movie-watch-providers-request";
import { useMovieDetailWhereToWatch } from "./movie-detail-where-to-watch.hook";

vi.mock(
	"@/modules/movie-details/http/get-movie-watch-providers-request",
	() => ({
		getMovieWatchProvidersRequest: vi.fn(),
	}),
);

describe("useMovieDetailWhereToWatch", () => {
	const getMovieWatchProvidersRequestMock = vi.mocked(
		getMovieWatchProvidersRequest,
	);

	beforeEach(() => {
		tanstackRouterMock.setParams({ id: "1" });
	});

	it("should be able to expose mapped where to watch data from watch providers query", async () => {
		getMovieWatchProvidersRequestMock.mockResolvedValueOnce(
			makeMovieWatchProviders(),
		);

		const { result } = renderHook(() => useMovieDetailWhereToWatch());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
			expect(result.current.whereToWatch).not.toBeNull();
		});

		expect(result.current.whereToWatch).toEqual({
			region: "US",
			options: [
				{ id: "stream", label: "Stream · Netflix", icon: "play" },
				{ id: "rent", label: "Rent · Apple TV", icon: "download" },
				{ id: "buy", label: "Buy · Amazon Video", icon: "shopping-bag" },
			],
			footnote: "Available on 3 platforms in your region.",
		});
	});

	it("should be able to expose loading state while watch providers query is pending", async () => {
		let resolveWatchProvidersRequest: (
			value: Awaited<ReturnType<typeof getMovieWatchProvidersRequest>>,
		) => void = () => undefined;

		getMovieWatchProvidersRequestMock.mockImplementationOnce(
			() =>
				new Promise((resolve) => {
					resolveWatchProvidersRequest = resolve;
				}),
		);

		const { result } = renderHook(() => useMovieDetailWhereToWatch());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(true);
		});

		resolveWatchProvidersRequest(makeMovieWatchProviders());

		await waitFor(() => {
			expect(result.current.isLoading).toBe(false);
		});
	});

	it("should be able to return null when providers are unavailable", async () => {
		getMovieWatchProvidersRequestMock.mockResolvedValueOnce(
			makeMovieWatchProviders({ results: {} }),
		);

		const { result } = renderHook(() => useMovieDetailWhereToWatch());

		await waitFor(() => {
			expect(result.current.whereToWatch).toBeNull();
		});
	});

	it("should be able to build where to watch with partial providers", async () => {
		getMovieWatchProvidersRequestMock.mockResolvedValueOnce(
			makeMovieWatchProviders({
				results: {
					US: {
						link: "https://watch.example/us",
						flatrate: [],
						rent: [
							{
								providerId: 2,
								providerName: "Apple TV",
								logoPath: "/apple-tv.jpg",
								displayPriority: 2,
							},
						],
						buy: [],
					},
				},
			}),
		);

		const { result } = renderHook(() => useMovieDetailWhereToWatch());

		await waitFor(() => {
			expect(result.current.whereToWatch).not.toBeNull();
		});

		expect(result.current.whereToWatch).toEqual({
			region: "US",
			options: [{ id: "rent", label: "Rent · Apple TV", icon: "download" }],
			footnote: "Available on 1 platform in your region.",
		});
	});
});
