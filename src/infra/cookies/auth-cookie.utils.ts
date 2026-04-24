import {
	type CookieOptions,
	getAllCookies,
	getCookieValue,
	removeCookieValue,
	setCookieValue,
} from "./cookies";

const AUTH_TOKEN_COOKIE_KEY = "cinedash:token";
const AUTH_TOKEN_COOKIE_EXPIRATION_DAYS = 7;

const AUTH_TOKEN_COOKIE_DEFAULT_OPTIONS: CookieOptions = {
	path: "/",
	sameSite: "strict",
	secure: import.meta.env.PROD,
};

function getAuthTokenCookieOptions(options?: CookieOptions): CookieOptions {
	return {
		...AUTH_TOKEN_COOKIE_DEFAULT_OPTIONS,
		...options,
	};
}

export function setTokenOnCookie(token: string, options?: CookieOptions) {
	const cookieOptions = getAuthTokenCookieOptions(options);

	setCookieValue(AUTH_TOKEN_COOKIE_KEY, token, {
		...cookieOptions,
		expires: options?.expires || AUTH_TOKEN_COOKIE_EXPIRATION_DAYS,
	});
}

export function getTokenFromCookie() {
	return getCookieValue(AUTH_TOKEN_COOKIE_KEY);
}

export function hasTokenOnCookie() {
	return !!getTokenFromCookie();
}

export function removeTokenFromCookie(options?: CookieOptions) {
	removeCookieValue(AUTH_TOKEN_COOKIE_KEY, getAuthTokenCookieOptions(options));
}

export function clearAuthCookies() {
	const allCookies = getAllCookies();

	for (const cookieName of Object.keys(allCookies)) {
		removeCookieValue(cookieName);
	}
}
