import Cookies from "js-cookie";

const TOKEN_KEY = "cinedash:token";
const TOKEN_DEFAULT_EXPIRATION_DAYS = 7;

export function setCookie(value: string, options?: Cookies.CookieAttributes) {
	Cookies.set(TOKEN_KEY, value, {
		...options,
		expires: options?.expires || TOKEN_DEFAULT_EXPIRATION_DAYS,
		path: options?.path || "/",
		sameSite: options?.sameSite || "strict",
		secure:
			options?.secure !== undefined ? options.secure : import.meta.env.PROD,
	});
}

export function getCookie(): string | undefined {
	return Cookies.get(TOKEN_KEY);
}

export function deleteCookie(options?: Cookies.CookieAttributes) {
	Cookies.remove(TOKEN_KEY, options);
}

export function clearAllCookies() {
	const allCookies = Cookies.get();

	for (const cookieName of Object.keys(allCookies)) {
		Cookies.remove(cookieName);
	}
}
