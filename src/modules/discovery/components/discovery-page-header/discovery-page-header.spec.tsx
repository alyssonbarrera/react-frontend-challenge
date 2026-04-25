import { render, screen } from "@testing-library/react";
import { DiscoveryPageHeader } from "./discovery-page-header";

describe("DiscoveryPageHeader", () => {
	it("should be able to render the header with its title and subtitle", () => {
		render(<DiscoveryPageHeader />);

		const discoveryPageHeader = screen.getByTestId("discovery-page-header");
		const discoveryPageHeaderTitle = screen.getByTestId(
			"discovery-page-header-title",
		);

		expect(discoveryPageHeader).toBeDefined();
		expect(discoveryPageHeaderTitle.textContent).toBe(
			"Films worth your evening",
		);
	});
});
