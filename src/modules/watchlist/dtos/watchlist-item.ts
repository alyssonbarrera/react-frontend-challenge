import type { Movie } from "@/modules/discovery/dtos/movie";

export type WatchlistItem = Movie & {
	addedAt: string;
};
