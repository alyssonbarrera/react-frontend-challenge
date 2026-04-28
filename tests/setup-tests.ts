import "@testing-library/react";
import { cleanup } from "@testing-library/react";
import { config } from "dotenv";
import { useAuthStore } from "@/core/stores/auth-store";
import { tanstackRouterMock } from "./factories/make-tanstack-router";
import { makeUser } from "./factories/make-user";
import { server } from "./mocks/node";

config({ path: ".env.test", override: true, quiet: true });

vi.mock("@tanstack/react-router", async (importOriginal) => {
	const { makeTanstackRouter } = await import(
		"./factories/make-tanstack-router"
	);
	return makeTanstackRouter()(importOriginal);
});

vi.mock("@/core/stores/auth-store", () => {
	const useAuthStoreMock = vi.fn();

	Object.assign(useAuthStoreMock, {
		getState: vi.fn(),
	});

	return {
		useAuthStore: useAuthStoreMock,
	};
});

const authenticatedUser = makeUser();

const resizeObserverMock = vi.fn(() => ({
	disconnect: vi.fn(),
	observe: vi.fn(),
	unobserve: vi.fn(),
}));

beforeAll(() => {
	server.listen();
	vi.stubGlobal("ResizeObserver", resizeObserverMock);
});

beforeEach(() => {
	if (!vi.isMockFunction(useAuthStore)) {
		return;
	}

	const setAuth = vi.fn();
	const clearAuth = vi.fn();

	vi.mocked(useAuthStore).mockImplementation((selector) => {
		const state = {
			token: "test-token",
			user: authenticatedUser,
			setAuth,
			clearAuth,
		};

		if (typeof selector === "function") {
			return selector(state);
		}

		return state;
	});

	vi.mocked(useAuthStore.getState).mockReturnValue({
		token: "test-token",
		user: authenticatedUser,
		setAuth,
		clearAuth,
	});
});

afterEach(() => {
	tanstackRouterMock.reset();
	server.resetHandlers();
	cleanup();
});

afterAll(() => {
	server.close();
	vi.unstubAllGlobals();
});
