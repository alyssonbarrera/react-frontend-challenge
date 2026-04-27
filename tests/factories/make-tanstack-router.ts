import { type ComponentProps, createElement, type ReactNode } from "react";
import { vi } from "vitest";

type RouterParams = Record<string, string>;
type RouterLocation = { pathname: string };

type LinkProps = {
	to: string;
	children: ReactNode;
} & Omit<ComponentProps<"a">, "href">;

type TanstackRouterState = {
	params: RouterParams;
	canGoBack: boolean;
	location: RouterLocation;
	navigate: ReturnType<typeof vi.fn>;
	backHistory: ReturnType<typeof vi.fn>;
	preloadRoute: ReturnType<typeof vi.fn>;
};

const state: TanstackRouterState = {
	params: { id: "1" },
	canGoBack: false,
	location: { pathname: "/discovery" },
	navigate: vi.fn(),
	backHistory: vi.fn(),
	preloadRoute: vi.fn().mockResolvedValue([]),
};

const useNavigateMock = vi.fn(() => state.navigate);
const useCanGoBackMock = vi.fn(() => state.canGoBack);
const useRouterMock = vi.fn(() => ({
	history: { back: state.backHistory },
	preloadRoute: state.preloadRoute,
}));
const useLocationMock = vi.fn(
	({ select }: { select?: (location: RouterLocation) => unknown } = {}) => {
		if (typeof select === "function") {
			return select(state.location);
		}

		return state.location;
	},
);
const getRouteApiMock = vi.fn(() => ({
	useParams: () => state.params,
}));

function RouterLink({ to, children, ...props }: LinkProps) {
	return createElement("a", { href: to, ...props }, children);
}

function resetMockImplementations() {
	useNavigateMock.mockReset();
	useNavigateMock.mockImplementation(() => state.navigate);

	useCanGoBackMock.mockReset();
	useCanGoBackMock.mockImplementation(() => state.canGoBack);

	useRouterMock.mockReset();
	useRouterMock.mockImplementation(() => ({
		history: { back: state.backHistory },
		preloadRoute: state.preloadRoute,
	}));

	useLocationMock.mockReset();
	useLocationMock.mockImplementation(
		({ select }: { select?: (location: RouterLocation) => unknown } = {}) => {
			if (typeof select === "function") {
				return select(state.location);
			}

			return state.location;
		},
	);

	getRouteApiMock.mockReset();
	getRouteApiMock.mockImplementation(() => ({
		useParams: () => state.params,
	}));
}

export const tanstackRouterMock = {
	setParams(params: RouterParams) {
		state.params = params;
	},
	setCanGoBack(canGoBack: boolean) {
		state.canGoBack = canGoBack;
	},
	setPathname(pathname: string) {
		state.location = { pathname };
	},
	setNavigateMock(navigate: ReturnType<typeof vi.fn>) {
		state.navigate = navigate;
	},
	setBackHistoryMock(backHistory: ReturnType<typeof vi.fn>) {
		state.backHistory = backHistory;
	},
	setPreloadRouteMock(preloadRoute: ReturnType<typeof vi.fn>) {
		state.preloadRoute = preloadRoute;
	},
	get navigate() {
		return state.navigate;
	},
	get backHistory() {
		return state.backHistory;
	},
	get preloadRoute() {
		return state.preloadRoute;
	},
	reset() {
		state.params = { id: "1" };
		state.canGoBack = false;
		state.location = { pathname: "/discovery" };
		state.navigate = vi.fn();
		state.backHistory = vi.fn();
		state.preloadRoute = vi.fn().mockResolvedValue([]);

		resetMockImplementations();
	},
};

export function makeTanstackRouter() {
	return async (
		importOriginal: () => Promise<typeof import("@tanstack/react-router")>,
	) => {
		const actual = await importOriginal();

		return {
			...actual,
			Link: RouterLink,
			useNavigate: useNavigateMock,
			useCanGoBack: useCanGoBackMock,
			useRouter: useRouterMock,
			useLocation: useLocationMock,
			getRouteApi: getRouteApiMock,
		};
	};
}
