import { render, screen } from "@tests/utils";
import { DiscoveryScreen } from "./discovery-screen";

describe("DiscoveryScreen", () => {
	it("should be able to render screen elements", () => {
		render(<DiscoveryScreen />);

		const discoveryScreen = screen.getByTestId("discovery-screen");
		const discoveryScreenPageHeader = screen.getByTestId(
			"discovery-page-header",
		);
		const discoveryScreenFilterBar = screen.getByTestId("discovery-filter-bar");
		const discoveryScreenMovieGrid = screen.getByTestId("movie-grid-skeleton");

		expect(discoveryScreen).toBeDefined();
		expect(discoveryScreenPageHeader).toBeDefined();
		expect(discoveryScreenFilterBar).toBeDefined();
		expect(discoveryScreenMovieGrid).toBeDefined();
	});
});
