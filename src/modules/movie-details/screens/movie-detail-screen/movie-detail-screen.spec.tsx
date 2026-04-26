import { tanstackRouterMock } from "@tests/factories/make-tanstack-router";
import { render, screen } from "@tests/utils";
import { MovieDetailScreen } from "./movie-detail-screen";

describe("MovieDetailScreen", () => {
	beforeEach(() => {
		tanstackRouterMock.setParams({ id: "1" });
	});

	it("should be able to render screen sections", async () => {
		render(<MovieDetailScreen />);

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
});
