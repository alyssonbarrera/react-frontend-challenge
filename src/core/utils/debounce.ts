/**
 * Creates a debounced function that delays invoking the provided function until after the specified delay has elapsed
 * since the last time the debounced function was invoked.
 *
 * @template T - The type of the function to debounce.
 * @param {T} func - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay.
 */

// biome-ignore lint/suspicious/noExplicitAny: This is a utility function that can accept any function type.
export function debounce<T extends (...args: any[]) => any>(
	func: T,
	delay: number,
): T & { cancel: VoidFunction } {
	let timer: NodeJS.Timeout | null = null;

	const debouncedFunction = (...args: Parameters<T>): void => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			func(...args);
		}, delay);
	};

	debouncedFunction.cancel = () => {
		if (timer) {
			clearTimeout(timer);
		}
	};

	return debouncedFunction as T & { cancel: VoidFunction };
}
