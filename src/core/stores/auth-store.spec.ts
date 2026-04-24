vi.unmock("@/core/stores/auth-store");

import { makeUser } from "@tests/factories/make-user";
import { useAuthStore } from "@/core/stores/auth-store";
import {
	getCookieValue,
	removeCookieValue,
	setCookieValue,
} from "@/infra/cookies";
import {
	removeTokenFromCookie,
	setTokenOnCookie,
} from "@/infra/cookies/auth-cookie.utils";

vi.mock("@/infra/cookies", () => ({
	getCookieValue: vi.fn(),
	removeCookieValue: vi.fn(),
	setCookieValue: vi.fn(),
}));

vi.mock("@/infra/cookies/auth-cookie.utils", () => ({
	removeTokenFromCookie: vi.fn(),
	setTokenOnCookie: vi.fn(),
}));

const initialState = useAuthStore.getState();

const user = makeUser();
const token = "test-token";

describe("useAuthStore", () => {
	beforeEach(() => {
		useAuthStore.setState(initialState);
		vi.mocked(setCookieValue).mockClear();
		vi.mocked(removeCookieValue).mockClear();
		vi.mocked(setTokenOnCookie).mockClear();
		vi.mocked(removeTokenFromCookie).mockClear();
		vi.mocked(getCookieValue).mockReturnValue(undefined);
	});

	it("should be able to initialize with empty auth state", async () => {
		const { token: authToken, user: authUser } = useAuthStore.getState();

		expect(authToken).toBeNull();
		expect(authUser).toBeNull();
	});

	it("should be able to set auth state", async () => {
		useAuthStore.getState().setAuth({ token, user });

		const { token: authToken, user: authUser } = useAuthStore.getState();

		expect(setTokenOnCookie).toHaveBeenCalled();
		expect(setTokenOnCookie).toHaveBeenCalledTimes(1);
		expect(setTokenOnCookie).toHaveBeenCalledWith(token);

		expect(authToken).toBe(token);
		expect(authUser).toEqual(user);
	});

	it("should be able to clear auth state", async () => {
		useAuthStore.setState({ ...initialState, token, user });
		useAuthStore.getState().clearAuth();

		const { token: authToken, user: authUser } = useAuthStore.getState();

		expect(removeTokenFromCookie).toHaveBeenCalled();
		expect(removeTokenFromCookie).toHaveBeenCalledTimes(1);
		expect(authToken).toBeNull();
		expect(authUser).toBeNull();
	});

	it("should be able to persist auth state when setting auth", async () => {
		useAuthStore.getState().setAuth({ token, user });

		expect(setCookieValue).toHaveBeenCalled();
		expect(setCookieValue).toHaveBeenCalledTimes(1);
		expect(setCookieValue).toHaveBeenCalledWith(
			"cinedash:auth",
			expect.stringContaining('"token":"test-token"'),
			expect.objectContaining({
				expires: 7,
				path: "/",
				sameSite: "strict",
			}),
		);
		expect(setCookieValue).toHaveBeenCalledWith(
			"cinedash:auth",
			expect.stringContaining('"email":"john.doe@cinedash.app"'),
			expect.objectContaining({
				expires: 7,
				path: "/",
				sameSite: "strict",
			}),
		);
	});

	it("should be able to persist cleared auth state", async () => {
		useAuthStore.getState().clearAuth();

		expect(setCookieValue).toHaveBeenCalled();
		expect(setCookieValue).toHaveBeenCalledTimes(1);
		expect(setCookieValue).toHaveBeenCalledWith(
			"cinedash:auth",
			expect.stringContaining('"token":null'),
			expect.objectContaining({
				expires: 7,
				path: "/",
				sameSite: "strict",
			}),
		);
	});

	it("should be able to clear persisted auth storage", async () => {
		useAuthStore.persist.clearStorage();

		expect(removeCookieValue).toHaveBeenCalled();
		expect(removeCookieValue).toHaveBeenCalledTimes(1);
		expect(removeCookieValue).toHaveBeenCalledWith("cinedash:auth", {
			path: "/",
		});
	});

	it("should be able to rehydrate auth state from persisted storage", async () => {
		const persistedState = JSON.stringify({
			state: { token, user },
			version: 0,
		});

		vi.mocked(getCookieValue).mockImplementation((key) => {
			return key === "cinedash:auth" ? persistedState : undefined;
		});

		await useAuthStore.persist.rehydrate();

		const { token: authToken, user: authUser } = useAuthStore.getState();

		expect(authToken).toBe(token);
		expect(authUser).toEqual(user);
		expect(setTokenOnCookie).toHaveBeenCalled();
		expect(setTokenOnCookie).toHaveBeenCalledTimes(1);
		expect(setTokenOnCookie).toHaveBeenCalledWith(token);
	});

	it("should be able to clear token cookie when rehydrating without token", async () => {
		const persistedState = JSON.stringify({
			state: { token: null, user: null },
			version: 0,
		});

		vi.mocked(getCookieValue).mockImplementation((key) => {
			return key === "cinedash:auth" ? persistedState : undefined;
		});

		await useAuthStore.persist.rehydrate();

		const { token: authToken, user: authUser } = useAuthStore.getState();

		expect(authToken).toBeNull();
		expect(authUser).toBeNull();
		expect(removeTokenFromCookie).toHaveBeenCalled();
		expect(removeTokenFromCookie).toHaveBeenCalledTimes(1);
	});
});
