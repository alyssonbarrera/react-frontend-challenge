import { fireEvent, render, screen } from "@tests/utils";
import { RouteErrorFallback } from "./route-error-fallback";

describe("RouteErrorFallback", () => {
	it("should be able to render default title description and retry action", () => {
		render(<RouteErrorFallback />);

		const routeErrorFallback = screen.getByTestId("route-error-fallback");
		const routeErrorRetry = screen.getByTestId("route-error-retry");

		expect(routeErrorFallback.textContent).toContain(
			"The projector just gave out.",
		);
		expect(routeErrorFallback.textContent).toContain(
			"An unexpected error broke this page mid-reel.",
		);
		expect(routeErrorRetry).toBeDefined();
	});

	it("should be able to call onRetry callback when retry button is clicked", () => {
		const routeErrorFallbackOnRetryMock = vi.fn();

		render(
			<RouteErrorFallback
				title="Custom title"
				description="Custom description"
				onRetry={routeErrorFallbackOnRetryMock}
			/>,
		);

		const routeErrorFallback = screen.getByTestId("route-error-fallback");
		const routeErrorRetry = screen.getByTestId("route-error-retry");

		fireEvent.click(routeErrorRetry);

		expect(routeErrorFallback.textContent).toContain("Custom title");
		expect(routeErrorFallback.textContent).toContain("Custom description");
		expect(routeErrorFallbackOnRetryMock).toHaveBeenCalled();
		expect(routeErrorFallbackOnRetryMock).toHaveBeenCalledTimes(1);
	});
});
