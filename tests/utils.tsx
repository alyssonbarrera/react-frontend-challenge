import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	type RenderHookOptions,
	type RenderOptions,
	render,
	renderHook,
} from "@testing-library/react";
import { NuqsTestingAdapter, type UrlUpdateEvent } from "nuqs/adapters/testing";
import type React from "react";
import { TooltipProvider } from "@/core/components/ui/tooltip";

type TestSearchParams = Record<string, string>;
type OnUrlUpdate = (event: UrlUpdateEvent) => void;

type CustomRenderOptions = Omit<RenderOptions, "wrapper"> & {
	searchParams?: TestSearchParams;
	onUrlUpdate?: OnUrlUpdate;
};

type CustomRenderHookOptions<Props> = Omit<
	RenderHookOptions<Props>,
	"wrapper"
> & {
	searchParams?: TestSearchParams;
	onUrlUpdate?: OnUrlUpdate;
};

function createTestQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: { retry: false, gcTime: 0 },
			mutations: { retry: false },
		},
	});
}

function createProviders(
	searchParams?: TestSearchParams,
	onUrlUpdate?: OnUrlUpdate,
) {
	const queryClient = createTestQueryClient();

	return function Providers({ children }: { children: React.ReactNode }) {
		return (
			<QueryClientProvider client={queryClient}>
				<NuqsTestingAdapter
					searchParams={searchParams}
					onUrlUpdate={onUrlUpdate}
				>
					<TooltipProvider>{children}</TooltipProvider>
				</NuqsTestingAdapter>
			</QueryClientProvider>
		);
	};
}

function customRender(ui: React.ReactElement, options?: CustomRenderOptions) {
	const { searchParams, onUrlUpdate, ...renderOptions } = options ?? {};
	const Providers = createProviders(searchParams, onUrlUpdate);

	return render(ui, { wrapper: Providers, ...renderOptions });
}

function customRenderHook<Result, Props>(
	renderCallback: (props: Props) => Result,
	options?: CustomRenderHookOptions<Props>,
) {
	const { searchParams, onUrlUpdate, ...renderHookOptions } = options ?? {};
	const Providers = createProviders(searchParams, onUrlUpdate);

	return renderHook(renderCallback, {
		wrapper: Providers,
		...renderHookOptions,
	});
}

export * from "@testing-library/react";
export { customRender as render, customRenderHook as renderHook };
