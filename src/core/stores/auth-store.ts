import { create } from "zustand";
import {
	createJSONStorage,
	persist,
	type StateStorage,
} from "zustand/middleware";
import type { UserDTO } from "@/core/dtos/user-dto";
import {
	type CookieOptions,
	getCookieValue,
	removeCookieValue,
	setCookieValue,
} from "@/infra/cookies";
import {
	removeTokenFromCookie,
	setTokenOnCookie,
} from "@/infra/cookies/auth-cookie.utils";

const AUTH_STORAGE_KEY = "cinedash:auth";
const AUTH_STORAGE_EXPIRATION_DAYS = 7;

const authStorageOptions: CookieOptions = {
	expires: AUTH_STORAGE_EXPIRATION_DAYS,
	path: "/",
	sameSite: "strict",
	secure: import.meta.env.PROD,
};

const cookieStorage: StateStorage = {
	getItem: (key) => getCookieValue(key) ?? null,
	setItem: (key, value) => {
		setCookieValue(key, value, authStorageOptions);
	},
	removeItem: (key) => {
		removeCookieValue(key, { path: "/" });
	},
};

type AuthState = {
	token: string | null;
	user: UserDTO | null;
	clearAuth: VoidFunction;
	setAuth: (auth: { token: string; user: UserDTO }) => void;
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			token: null,
			user: null,
			setAuth: ({ token, user }) => {
				setTokenOnCookie(token);
				set({ token, user });
			},
			clearAuth: () => {
				removeTokenFromCookie();
				set({ token: null, user: null });
			},
		}),
		{
			name: AUTH_STORAGE_KEY,
			storage: createJSONStorage(() => cookieStorage),
			onRehydrateStorage: () => (state) => {
				const token = state?.token;

				if (token) {
					setTokenOnCookie(token);
					return;
				}

				removeTokenFromCookie();
			},
		},
	),
);
