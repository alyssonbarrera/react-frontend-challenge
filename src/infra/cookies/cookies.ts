import Cookies from "js-cookie";

export type CookieOptions = Cookies.CookieAttributes;

export function setCookieValue(
	key: string,
	value: string,
	options?: CookieOptions,
) {
	Cookies.set(key, value, options);
}

export function getCookieValue(key: string): string | undefined {
	return Cookies.get(key);
}

export function removeCookieValue(key: string, options?: CookieOptions) {
	Cookies.remove(key, options);
}

export function getAllCookies(): Record<string, string> {
	return Cookies.get();
}
