import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	createMemoryHistory,
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";
import {
	render,
	renderHook,
	type RenderOptions,
	type RenderHookOptions,
} from "@testing-library/react";
import type React from "react";
import { routeTree } from "@/route-tree.gen";

function createTestQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: { retry: false, gcTime: 0 },
			mutations: { retry: false },
		},
	});
}

function createRenderProviders() {
	const queryClient = createTestQueryClient();

	const router = createRouter({
		routeTree,
		context: { queryClient },
		defaultPreload: "intent",
		history: createMemoryHistory({ initialEntries: ["/"] }),
		scrollRestoration: true,
	});

	return function RenderProviders({ children }: { children: React.ReactNode }) {
		return (
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} defaultComponent={() => children} />
			</QueryClientProvider>
		);
	};
}

function createHookProviders() {
	const queryClient = createTestQueryClient();

	return function HookProviders({ children }: { children: React.ReactNode }) {
		return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
	};
}

function customRender(
	ui: React.ReactElement,
	options?: Omit<RenderOptions, "wrapper">,
) {
	const RenderProviders = createRenderProviders();

	return render(ui, { wrapper: RenderProviders, ...options });
}

function customRenderHook<Result, Props>(
	renderCallback: (props: Props) => Result,
	options?: Omit<RenderHookOptions<Props>, "wrapper">,
) {
	const HookProviders = createHookProviders();

	return renderHook(renderCallback, {
		wrapper: HookProviders,
		...options,
	});
}

export * from "@testing-library/react";
export { customRender as render, customRenderHook as renderHook };
