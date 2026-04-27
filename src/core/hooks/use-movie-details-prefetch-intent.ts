import { useRouter } from "@tanstack/react-router";
import { useCallback, useEffect, useRef } from "react";

const MOVIE_DETAILS_PREFETCH_DELAY_IN_MS = 120;

type UseMovieDetailsPrefetchIntentParams = {
	hoverDelayInMs?: number;
};

type MoviePrefetchTimeoutMap = Map<number, ReturnType<typeof setTimeout>>;

export function useMovieDetailsPrefetchIntent({
	hoverDelayInMs = MOVIE_DETAILS_PREFETCH_DELAY_IN_MS,
}: UseMovieDetailsPrefetchIntentParams = {}) {
	const router = useRouter();
	const prefetchTimeoutByMovieIdRef = useRef<MoviePrefetchTimeoutMap>(
		new Map(),
	);
	const hasPrefetchedRouteByMovieIdRef = useRef<Set<number>>(new Set());

	const prefetchMovieDetailsRoute = useCallback(
		(movieId: number) => {
			if (hasPrefetchedRouteByMovieIdRef.current.has(movieId)) {
				return;
			}

			hasPrefetchedRouteByMovieIdRef.current.add(movieId);

			router
				.preloadRoute({
					to: "/movie/$id",
					params: { id: String(movieId) },
				})
				.catch(() => {
					hasPrefetchedRouteByMovieIdRef.current.delete(movieId);
				});
		},
		[router],
	);

	const clearMovieHoverPrefetchTimeout = useCallback((movieId: number) => {
		const timeout = prefetchTimeoutByMovieIdRef.current.get(movieId);

		if (!timeout) {
			return;
		}

		clearTimeout(timeout);
		prefetchTimeoutByMovieIdRef.current.delete(movieId);
	}, []);

	const handleMovieMouseEnterIntentPrefetch = useCallback(
		(movieId: number) => {
			if (prefetchTimeoutByMovieIdRef.current.has(movieId)) {
				return;
			}

			const timeout = setTimeout(() => {
				prefetchTimeoutByMovieIdRef.current.delete(movieId);
				prefetchMovieDetailsRoute(movieId);
			}, hoverDelayInMs);

			prefetchTimeoutByMovieIdRef.current.set(movieId, timeout);
		},
		[hoverDelayInMs, prefetchMovieDetailsRoute],
	);

	const handleMovieMouseLeaveIntentPrefetch = useCallback(
		(movieId: number) => {
			clearMovieHoverPrefetchTimeout(movieId);
		},
		[clearMovieHoverPrefetchTimeout],
	);

	const handleMovieFocusIntentPrefetch = useCallback(
		(movieId: number) => {
			prefetchMovieDetailsRoute(movieId);
		},
		[prefetchMovieDetailsRoute],
	);

	const handleMovieTouchStartIntentPrefetch = useCallback(
		(movieId: number) => {
			prefetchMovieDetailsRoute(movieId);
		},
		[prefetchMovieDetailsRoute],
	);

	useEffect(() => {
		return () => {
			for (const timeout of prefetchTimeoutByMovieIdRef.current.values()) {
				clearTimeout(timeout);
			}

			prefetchTimeoutByMovieIdRef.current.clear();
		};
	}, []);

	return {
		handleMovieFocusIntentPrefetch,
		handleMovieMouseEnterIntentPrefetch,
		handleMovieMouseLeaveIntentPrefetch,
		handleMovieTouchStartIntentPrefetch,
	};
}
