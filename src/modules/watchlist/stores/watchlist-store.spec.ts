import { makeMovie } from "@tests/factories/make-movie";
import { useWatchlistStore, WATCHLIST_STORAGE_KEY } from "./watchlist-store";

const initialState = useWatchlistStore.getState();
const fixedNow = new Date("2026-04-25T12:00:00.000Z");

describe("useWatchlistStore", () => {
	beforeEach(() => {
		useWatchlistStore.setState({ ...initialState, items: [] });
		localStorage.clear();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should be able to initialize with empty watchlist", async () => {
		const { items } = useWatchlistStore.getState();

		expect(items).toEqual([]);
	});

	it("should be able to add a movie to watchlist with current timestamp", async () => {
		vi.useFakeTimers();
		vi.setSystemTime(fixedNow);

		const movie = makeMovie({ id: 1, title: "The Matrix" });

		useWatchlistStore.getState().add(movie);

		const { items } = useWatchlistStore.getState();

		expect(items).toHaveLength(1);
		expect(items[0]).toMatchObject({
			id: 1,
			title: "The Matrix",
			addedAt: fixedNow.toISOString(),
		});
	});

	it("should not be able to add the same movie twice", async () => {
		const movie = makeMovie({ id: 1, title: "The Matrix" });

		useWatchlistStore.getState().add(movie);
		useWatchlistStore.getState().add(movie);

		const { items } = useWatchlistStore.getState();

		expect(items).toHaveLength(1);
	});

	it("should be able to remove a movie from watchlist by id", async () => {
		const firstMovie = makeMovie({ id: 1, title: "The Matrix" });
		const secondMovie = makeMovie({ id: 2, title: "Inception" });

		useWatchlistStore.getState().add(firstMovie);
		useWatchlistStore.getState().add(secondMovie);
		useWatchlistStore.getState().remove(1);

		const { items } = useWatchlistStore.getState();

		expect(items).toHaveLength(1);
		expect(items[0].id).toBe(2);
	});

	it("should be able to toggle movie into watchlist when movie is not present", async () => {
		const movie = makeMovie({ id: 1, title: "The Matrix" });

		useWatchlistStore.getState().toggle(movie);

		const { items } = useWatchlistStore.getState();

		expect(items).toHaveLength(1);
		expect(items[0].id).toBe(1);
	});

	it("should be able to toggle movie out of watchlist when movie is present", async () => {
		const movie = makeMovie({ id: 1, title: "The Matrix" });

		useWatchlistStore.getState().add(movie);
		useWatchlistStore.getState().toggle(movie);

		const { items } = useWatchlistStore.getState();

		expect(items).toEqual([]);
	});

	it("should be able to check if movie is in watchlist", async () => {
		const movie = makeMovie({ id: 1, title: "The Matrix" });

		useWatchlistStore.getState().add(movie);

		const inWatchlist = useWatchlistStore.getState().isInWatchlist(1);
		const notInWatchlist = useWatchlistStore.getState().isInWatchlist(99);

		expect(inWatchlist).toBe(true);
		expect(notInWatchlist).toBe(false);
	});

	it("should be able to clear watchlist items", async () => {
		const firstMovie = makeMovie({ id: 1 });
		const secondMovie = makeMovie({ id: 2 });

		useWatchlistStore.getState().add(firstMovie);
		useWatchlistStore.getState().add(secondMovie);
		useWatchlistStore.getState().clear();

		const { items } = useWatchlistStore.getState();

		expect(items).toEqual([]);
	});

	it("should be able to persist watchlist in localStorage", async () => {
		const movie = makeMovie({ id: 1, title: "The Matrix" });

		useWatchlistStore.getState().add(movie);

		const persistedWatchlistRaw = localStorage.getItem(WATCHLIST_STORAGE_KEY);

		expect(persistedWatchlistRaw).toBeTruthy();
		expect(persistedWatchlistRaw).toContain('"id":1');
		expect(persistedWatchlistRaw).toContain('"title":"The Matrix"');
	});

	it("should be able to rehydrate watchlist from localStorage", async () => {
		const rehydratedItem = {
			...makeMovie({ id: 7, title: "Interstellar" }),
			addedAt: "2026-04-20T10:00:00.000Z",
		};

		useWatchlistStore.setState({ ...initialState, items: [] });
		localStorage.setItem(
			WATCHLIST_STORAGE_KEY,
			JSON.stringify({ state: { items: [rehydratedItem] }, version: 0 }),
		);

		await useWatchlistStore.persist.rehydrate();

		const { items } = useWatchlistStore.getState();

		expect(items).toHaveLength(1);
		expect(items[0]).toMatchObject({
			id: 7,
			title: "Interstellar",
			addedAt: "2026-04-20T10:00:00.000Z",
		});
	});

	it("should be able to keep empty items when rehydrating corrupted localStorage data", async () => {
		useWatchlistStore.setState({ ...initialState, items: [] });
		localStorage.setItem(WATCHLIST_STORAGE_KEY, '{"state":{"items":[}');

		await expect(
			useWatchlistStore.persist.rehydrate(),
		).resolves.toBeUndefined();

		const { items } = useWatchlistStore.getState();

		expect(items).toEqual([]);
	});

	it("should be able to clear persisted watchlist storage", async () => {
		localStorage.setItem(
			WATCHLIST_STORAGE_KEY,
			JSON.stringify({ state: { items: [{ id: 1 }] }, version: 0 }),
		);

		useWatchlistStore.persist.clearStorage();

		const persistedWatchlistRaw = localStorage.getItem(WATCHLIST_STORAGE_KEY);

		expect(persistedWatchlistRaw).toBeNull();
	});
});
