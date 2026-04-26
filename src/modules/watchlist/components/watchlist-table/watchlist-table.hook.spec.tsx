import { useNavigate } from "@tanstack/react-router";
import { makeWatchlistItem } from "@tests/factories/make-watchlist-item";
import { act, renderHook, waitFor } from "@tests/utils";
import { seedWatchlist } from "@tests/utils/seed-watchlist";
import type { UrlUpdateEvent } from "nuqs/adapters/testing";
import { useGlobalSearch } from "@/core/hooks/use-global-search";
import { useWatchlistStore } from "../../stores/watchlist-store";
import { useWatchlistTable } from "./watchlist-table.hook";

vi.mock("@tanstack/react-router", () => ({
	useNavigate: vi.fn(),
}));

describe("useWatchlistTable", () => {
	const navigateMock = vi.fn();

	beforeEach(() => {
		seedWatchlist();
		navigateMock.mockReset();
		vi.mocked(useNavigate).mockReturnValue(navigateMock as never);
	});

	it("should be able to expose all watchlist items when there is no search query", () => {
		seedWatchlist([
			makeWatchlistItem({ id: 1, title: "The Matrix" }),
			makeWatchlistItem({ id: 2, title: "Inception" }),
		]);

		const { result } = renderHook(() => useWatchlistTable());
		const rowTitles = result.current.table
			.getRowModel()
			.rows.map((row) => row.original.title);

		expect(result.current.totalRows).toBe(2);
		expect(result.current.hasNoResults).toBe(false);
		expect(result.current.searchQuery).toBe("");
		expect(rowTitles).toEqual(["The Matrix", "Inception"]);
	});

	it("should be able to filter watchlist items by title using the global search query", () => {
		seedWatchlist([
			makeWatchlistItem({ id: 1, title: "The Matrix" }),
			makeWatchlistItem({ id: 2, title: "Inception" }),
			makeWatchlistItem({ id: 3, title: "The Matrix Reloaded" }),
		]);

		const { result } = renderHook(() => useWatchlistTable(), {
			searchParams: { q: "matrix" },
		});

		expect(result.current.totalRows).toBe(2);
		expect(result.current.searchQuery).toBe("matrix");
		expect(result.current.hasNoResults).toBe(false);
	});

	it("should be able to flag hasNoResults when the search matches no item", () => {
		seedWatchlist([
			makeWatchlistItem({ id: 1, title: "The Matrix" }),
			makeWatchlistItem({ id: 2, title: "Inception" }),
		]);

		const { result } = renderHook(() => useWatchlistTable(), {
			searchParams: { q: "godfather" },
		});

		expect(result.current.totalRows).toBe(0);
		expect(result.current.hasNoResults).toBe(true);
		expect(result.current.searchQuery).toBe("godfather");
	});

	it("should not be able to flag hasNoResults when the watchlist is empty and there is no search", () => {
		const { result } = renderHook(() => useWatchlistTable());

		expect(result.current.totalRows).toBe(0);
		expect(result.current.hasNoResults).toBe(false);
	});

	it("should be able to filter case-insensitively and ignore surrounding whitespace", () => {
		seedWatchlist([
			makeWatchlistItem({ id: 1, title: "The Matrix" }),
			makeWatchlistItem({ id: 2, title: "Inception" }),
		]);

		const { result } = renderHook(() => useWatchlistTable(), {
			searchParams: { q: "  MATRIX  " },
		});

		expect(result.current.totalRows).toBe(1);
	});

	it("should be able to reset to page 1 when the search query changes", async () => {
		seedWatchlist(
			Array.from({ length: 25 }, (_, index) =>
				makeWatchlistItem({ id: index + 1, title: `Movie ${index + 1}` }),
			),
		);

		const urlUpdates: UrlUpdateEvent[] = [];
		const onUrlUpdate = (event: UrlUpdateEvent) => {
			urlUpdates.push(event);
		};

		const { result } = renderHook(
			() => {
				const table = useWatchlistTable();
				const [, setSearch] = useGlobalSearch();
				return { table, setSearch };
			},
			{
				searchParams: { page: "3" },
				onUrlUpdate,
			},
		);

		expect(result.current.table.currentPage).toBe(3);

		await act(async () => {
			await result.current.setSearch("Movie 1");
		});

		await waitFor(() => {
			const pageResetUpdate = urlUpdates.find(
				(event) => !event.searchParams.has("page"),
			);

			expect(pageResetUpdate).toBeDefined();
			expect(result.current.table.currentPage).toBe(1);
		});
	});

	it("should not be able to reset the page on the initial render when the URL already has both page and q", () => {
		seedWatchlist(
			Array.from({ length: 25 }, (_, index) =>
				makeWatchlistItem({ id: index + 1, title: `Movie ${index + 1}` }),
			),
		);

		const urlUpdates: UrlUpdateEvent[] = [];
		const onUrlUpdate = (event: UrlUpdateEvent) => {
			urlUpdates.push(event);
		};

		renderHook(() => useWatchlistTable(), {
			searchParams: { page: "2", q: "Movie" },
			onUrlUpdate,
		});

		expect(urlUpdates).toHaveLength(0);
	});

	it("should be able to keep the current page after removing an item from watchlist", async () => {
		seedWatchlist(
			Array.from({ length: 25 }, (_, index) =>
				makeWatchlistItem({ id: index + 1, title: `Movie ${index + 1}` }),
			),
		);

		const urlUpdates: UrlUpdateEvent[] = [];
		const onUrlUpdate = (event: UrlUpdateEvent) => {
			urlUpdates.push(event);
		};

		const { result } = renderHook(() => useWatchlistTable(), {
			searchParams: { page: "2" },
			onUrlUpdate,
		});

		expect(result.current.currentPage).toBe(2);

		act(() => {
			useWatchlistStore.getState().remove(1);
		});

		await waitFor(() => {
			expect(result.current.currentPage).toBe(2);
		});

		expect(urlUpdates).toHaveLength(0);
	});
});
