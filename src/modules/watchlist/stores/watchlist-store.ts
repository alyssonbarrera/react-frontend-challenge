import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Movie } from "@/modules/discovery/dtos/movie";
import type { WatchlistItem } from "../dtos/watchlist-item";

type WatchlistState = {
	items: WatchlistItem[];
	add: (movie: Movie) => void;
	remove: (id: number) => void;
	toggle: (movie: Movie) => void;
	isInWatchlist: (id: number) => boolean;
	clear: VoidFunction;
};

export const WATCHLIST_STORAGE_KEY = "cinedash:watchlist";

export const useWatchlistStore = create<WatchlistState>()(
	persist(
		(set, get) => ({
			items: [],
			add: (movie) => {
				if (get().items.some((item) => item.id === movie.id)) {
					return;
				}

				const newItem: WatchlistItem = {
					...movie,
					addedAt: new Date().toISOString(),
				};

				set({ items: [newItem, ...get().items] });
			},
			remove: (id) => {
				set({ items: get().items.filter((item) => item.id !== id) });
			},
			toggle: (movie) => {
				const { isInWatchlist, add, remove } = get();

				if (isInWatchlist(movie.id)) {
					remove(movie.id);
					return;
				}

				add(movie);
			},
			isInWatchlist: (id) => get().items.some((item) => item.id === id),
			clear: () => {
				set({ items: [] });
			},
		}),
		{
			name: WATCHLIST_STORAGE_KEY,
			storage: createJSONStorage(() => localStorage),
		},
	),
);
