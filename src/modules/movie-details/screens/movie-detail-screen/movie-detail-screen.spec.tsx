import { tanstackRouterMock } from "@tests/factories/make-tanstack-router";
import { render, screen } from "@tests/utils";
import { MovieDetailScreen } from "./movie-detail-screen";

describe("MovieDetailScreen", () => {
	beforeEach(() => {
		tanstackRouterMock.setParams({ id: "1" });
	});

	it("should be able to render screen sections", async () => {
		render(<MovieDetailScreen id="1" />);

		const movieDetailScreen = screen.getByTestId("movie-detail-screen");
		const movieDetailScreenHero =
			await screen.findByTestId("movie-detail-hero");
		const movieDetailScreenBody =
			await screen.findByTestId("movie-detail-body");
		const movieDetailScreenRelated = await screen.findByTestId(
			"movie-detail-related",
		);

		expect(movieDetailScreen).toBeDefined();
		expect(movieDetailScreenHero).toBeDefined();
		expect(movieDetailScreenBody).toBeDefined();
		expect(movieDetailScreenRelated).toBeDefined();
	});

	it("should be able to render the not-found state when the id param is not valid", () => {
		render(<MovieDetailScreen id="abc" />);

		const notFound = screen.getByTestId("not-found");
		const notFoundTitle = screen.getByTestId("not-found-title");
		const notFoundSuggestionDiscover = screen.getByTestId(
			"not-found-suggestion-discover",
		);

		expect(notFound).toBeDefined();
		expect(notFoundTitle.textContent).toContain("missing");
		expect(notFoundSuggestionDiscover).toBeDefined();
	});
});
