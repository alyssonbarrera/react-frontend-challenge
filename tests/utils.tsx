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

const queryClient = new QueryClient({
	defaultOptions: { queries: { retry: false, gcTime: 0 } },
});

const router = createRouter({
	routeTree,
	context: { queryClient },
	defaultPreload: "intent",
	history: createMemoryHistory({ initialEntries: ["/"] }),
	scrollRestoration: true,
});

function AllTheProviders({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} defaultComponent={() => children} />
		</QueryClientProvider>
	);
}

function customRender(
	ui: React.ReactElement,
	options?: Omit<RenderOptions, "wrapper">,
) {
	return render(ui, { wrapper: AllTheProviders, ...options });
}

function customRenderHook<Result, Props>(
	renderCallback: (props: Props) => Result,
	options?: Omit<RenderHookOptions<Props>, "wrapper">,
) {
	return renderHook(renderCallback, {
		wrapper: AllTheProviders,
		...options,
	});
}

export * from "@testing-library/react";
export { customRender as render, customRenderHook as renderHook };
