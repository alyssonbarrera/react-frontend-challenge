import { render, screen } from "@tests/utils";
import { WatchlistTablePoster } from "./watchlist-table-poster";

describe("WatchlistTablePoster", () => {
	it("should be able to render poster image when poster path is available", () => {
		render(
			<WatchlistTablePoster title="The Matrix" posterPath="/the-matrix.jpg" />,
		);

		const watchlistTableRowPoster = screen.getByTestId(
			"watchlist-table-row-poster",
		);
		const watchlistTableRowPosterFallback = screen.queryByTestId(
			"watchlist-table-row-poster-fallback",
		);

		expect(watchlistTableRowPoster).toBeDefined();
		expect(watchlistTableRowPoster.getAttribute("alt")).toBe("The Matrix");
		expect(watchlistTableRowPosterFallback).toBeNull();
	});

	it("should be able to render fallback when poster path is not available", () => {
		render(<WatchlistTablePoster title="Posterless Movie" posterPath={null} />);

		const watchlistTableRowPoster = screen.queryByTestId(
			"watchlist-table-row-poster",
		);
		const watchlistTableRowPosterFallback = screen.getByTestId(
			"watchlist-table-row-poster-fallback",
		);

		expect(watchlistTableRowPoster).toBeNull();
		expect(watchlistTableRowPosterFallback).toBeDefined();
	});
});
