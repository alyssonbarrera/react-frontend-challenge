import { tanstackRouterMock } from "@tests/factories/make-tanstack-router";
import { render, screen } from "@tests/utils";
import { MOVIE_DETAILS_QUERY_KEY } from "@/modules/movie-details/queries/use-movie-details-query";
import {
	MovieDetailsComponent,
	Route,
} from "@/routes/_authenticated/movie.$id";

describe("movie.$id route", () => {
	beforeEach(() => {
		tanstackRouterMock.setParams({ id: "1" });
	});

	it("should be able to return null from loader when id is not numeric", async () => {
		const ensureQueryDataMock = vi.fn();
		const loader = Route.options.loader;

		if (!loader) {
			throw new Error("Route loader is not defined");
		}

		const loaderData = await loader({
			context: {
				queryClient: {
					ensureQueryData: ensureQueryDataMock,
				},
			},
			params: { id: "abc" },
		} as never);

		expect(loaderData).toBeNull();
		expect(ensureQueryDataMock).not.toHaveBeenCalled();
	});

	it("should be able to return null from loader when id is not a positive integer", async () => {
		const ensureQueryDataMock = vi.fn();
		const loader = Route.options.loader;

		if (!loader) {
			throw new Error("Route loader is not defined");
		}

		const loaderData = await loader({
			context: {
				queryClient: {
					ensureQueryData: ensureQueryDataMock,
				},
			},
			params: { id: "0" },
		} as never);

		expect(loaderData).toBeNull();
		expect(ensureQueryDataMock).not.toHaveBeenCalled();
	});

	it("should be able to call ensureQueryData from loader when id is valid", async () => {
		const loader = Route.options.loader;
		const loaderDataMock = { id: 1, title: "Tenet" };
		const ensureQueryDataMock = vi.fn().mockResolvedValueOnce(loaderDataMock);

		if (!loader) {
			throw new Error("Route loader is not defined");
		}

		const loaderData = await loader({
			context: {
				queryClient: {
					ensureQueryData: ensureQueryDataMock,
				},
			},
			params: { id: "1" },
		} as never);

		expect(loaderData).toEqual(loaderDataMock);
		expect(ensureQueryDataMock).toHaveBeenCalledWith(
			expect.objectContaining({
				queryKey: [MOVIE_DETAILS_QUERY_KEY, 1],
				staleTime: 1000 * 60 * 5,
				queryFn: expect.any(Function),
			}),
		);
	});

	it("should be able to render not found when id is invalid", () => {
		tanstackRouterMock.setParams({ id: "abc" });

		render(<MovieDetailsComponent />);

		const notFound = screen.getByTestId("not-found");
		const notFoundDiscover = screen.getByTestId(
			"not-found-suggestion-discover",
		);

		expect(notFound).toBeDefined();
		expect(notFoundDiscover.getAttribute("href")).toBe("/discovery");
	});
});
