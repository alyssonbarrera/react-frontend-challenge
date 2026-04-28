type WindowWithNavigation = Window & {
	navigation?: { back: () => unknown };
};

/**
 * Navigates one entry back in the browser history, preferring the modern
 * Navigation API when available.
 *
 * Why: in Chromium, `window.history.back()` is silently dropped after two
 * `pushState` calls triggered from click handlers on routes sharing the same
 * URL prefix (history-manipulation intervention). The Navigation API
 * (`window.navigation.back()`) is not affected by that heuristic. Browsers
 * without the Navigation API (Firefox, Safari) do not implement the
 * intervention either, so the legacy fallback works for them.
 */
export function historyBack() {
	const win = window as WindowWithNavigation;

	if (typeof win.navigation?.back === "function") {
		win.navigation.back();
		return;
	}

	window.history.back();
}
