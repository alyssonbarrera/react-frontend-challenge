import { render, screen } from "@tests/utils";
import { AsyncState } from "./async-state";

describe("AsyncState", () => {
	it("should be able to render children when state is ready", () => {
		render(
			<AsyncState
				errorComponent={<div data-testid="async-state-error" />}
				isError={false}
				isLoading={false}
				loadingComponent={<div data-testid="async-state-loading" />}
			>
				<div data-testid="async-state-content" />
			</AsyncState>,
		);

		const asyncStateContent = screen.getByTestId("async-state-content");

		expect(asyncStateContent).toBeDefined();
	});

	it("should be able to render loading fallback", () => {
		render(
			<AsyncState
				errorComponent={<div data-testid="async-state-error" />}
				isError={false}
				isLoading={true}
				loadingComponent={<div data-testid="async-state-loading" />}
			>
				<div data-testid="async-state-content" />
			</AsyncState>,
		);

		const asyncStateLoading = screen.getByTestId("async-state-loading");

		expect(asyncStateLoading).toBeDefined();
	});

	it("should be able to render error fallback", () => {
		render(
			<AsyncState
				errorComponent={<div data-testid="async-state-error" />}
				isError={true}
				isLoading={false}
				loadingComponent={<div data-testid="async-state-loading" />}
			>
				<div data-testid="async-state-content" />
			</AsyncState>,
		);

		const asyncStateError = screen.getByTestId("async-state-error");

		expect(asyncStateError).toBeDefined();
	});

	it("should be able to render empty fallback", () => {
		render(
			<AsyncState
				errorComponent={<div data-testid="async-state-error" />}
				emptyComponent={<div data-testid="async-state-empty" />}
				isEmpty={true}
				isError={false}
				isLoading={false}
				loadingComponent={<div data-testid="async-state-loading" />}
			>
				<div data-testid="async-state-content" />
			</AsyncState>,
		);

		const asyncStateEmpty = screen.getByTestId("async-state-empty");

		expect(asyncStateEmpty).toBeDefined();
	});

	it("should be able to prioritize loading over error and empty", () => {
		render(
			<AsyncState
				errorComponent={<div data-testid="async-state-error" />}
				emptyComponent={<div data-testid="async-state-empty" />}
				isEmpty={true}
				isError={true}
				isLoading={true}
				loadingComponent={<div data-testid="async-state-loading" />}
			>
				<div data-testid="async-state-content" />
			</AsyncState>,
		);

		const asyncStateLoading = screen.getByTestId("async-state-loading");

		expect(asyncStateLoading).toBeDefined();
	});
});
