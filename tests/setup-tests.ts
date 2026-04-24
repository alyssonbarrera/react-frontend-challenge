import "@testing-library/react";
import { cleanup } from "@testing-library/react";
import { useAuthStore } from "@/core/stores/auth-store";
import { server } from "./mocks/node";

vi.mock("@/core/stores/auth-store", () => {
	const useAuthStoreMock = vi.fn();

	Object.assign(useAuthStoreMock, {
		getState: vi.fn(),
	});

	return {
		useAuthStore: useAuthStoreMock,
	};
});

const authenticatedUser = {
	id: "test-user-id",
	name: "Test User",
	email: "test.user@cinedash.app",
};

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
	server.resetHandlers();
	cleanup();
});

afterAll(() => {
	server.close();
	vi.unstubAllGlobals();
});
