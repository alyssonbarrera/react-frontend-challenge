import { render, screen } from "@tests/utils";
import type React from "react";
import { NotFound } from "./not-found";

vi.mock("@tanstack/react-router", async (importOriginal) => {
	const actual =
		await importOriginal<typeof import("@tanstack/react-router")>();

	return {
		...actual,
		Link: ({
			to,
			children,
			...props
		}: {
			to: string;
			children: React.ReactNode;
		} & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
			<a href={to} {...props}>
				{children}
			</a>
		),
	};
});

describe("NotFound", () => {
	it("should be able to render default title and description", () => {
		render(<NotFound />);

		const notFound = screen.getByTestId("not-found");
		const notFoundTitle = screen.getByTestId("not-found-title");
		const notFoundDescription = screen.getByTestId("not-found-description");

		expect(notFound).toBeDefined();
		expect(notFoundTitle.textContent).toContain(
			"This scene didn't make the final cut.",
		);
		expect(notFoundDescription.textContent).toContain(
			"The page you're looking for has been removed",
		);
	});

	it("should be able to render custom title and description", () => {
		render(<NotFound title="Custom title" description="Custom description" />);

		const notFoundTitle = screen.getByTestId("not-found-title");
		const notFoundDescription = screen.getByTestId("not-found-description");

		expect(notFoundTitle.textContent).toContain("Custom title");
		expect(notFoundDescription.textContent).toContain("Custom description");
	});

	it("should be able to render suggestion shortcuts", () => {
		render(<NotFound />);

		const suggestionDiscover = screen.getByTestId(
			"not-found-suggestion-discover",
		);
		const suggestionWatchlist = screen.getByTestId(
			"not-found-suggestion-watchlist",
		);

		expect(suggestionDiscover.getAttribute("href")).toBe("/discovery");
		expect(suggestionWatchlist.getAttribute("href")).toBe("/watchlist");
	});
});
