import { render, screen } from "@tests/utils";
import { MovieDetailHeroInfo } from "./movie-detail-hero-info";

describe("MovieDetailHeroInfo", () => {
	it("should be able to render hero info with full metadata", () => {
		render(
			<MovieDetailHeroInfo
				primaryGenre="ACTION"
				title="Tenet"
				formattedRating="7.3"
				formattedRatingMax="/ 10"
				year="2020"
				runtime="2h 30m"
				director="dir. Christopher Nolan"
			/>,
		);

		const movieDetailHeroInfo = screen.getByTestId("movie-detail-hero-info");
		const movieDetailHeroInfoGenre = screen.getByTestId(
			"movie-detail-hero-info-genre",
		);
		const movieDetailHeroInfoTitle = screen.getByTestId(
			"movie-detail-hero-info-title",
		);
		const movieDetailHeroInfoMeta = screen.getByTestId(
			"movie-detail-hero-info-meta",
		);

		expect(movieDetailHeroInfo).toBeDefined();
		expect(movieDetailHeroInfoGenre.textContent).toBe("ACTION");
		expect(movieDetailHeroInfoTitle.textContent).toBe("Tenet");
		expect(movieDetailHeroInfoMeta.textContent).toContain("7.3");
		expect(movieDetailHeroInfoMeta.textContent).toContain("/ 10");
		expect(movieDetailHeroInfoMeta.textContent).toContain("2020");
		expect(movieDetailHeroInfoMeta.textContent).toContain("2h 30m");
		expect(movieDetailHeroInfoMeta.textContent).toContain(
			"dir. Christopher Nolan",
		);
	});

	it("should not be able to render optional genre runtime and director when they are empty", () => {
		render(
			<MovieDetailHeroInfo
				primaryGenre=""
				title="Tenet"
				formattedRating="7.3"
				formattedRatingMax="/ 10"
				year="2020"
				runtime=""
				director=""
			/>,
		);

		const movieDetailHeroInfoGenre = screen.queryByTestId(
			"movie-detail-hero-info-genre",
		);
		const movieDetailHeroInfoMeta = screen.getByTestId(
			"movie-detail-hero-info-meta",
		);

		expect(movieDetailHeroInfoGenre).toBeNull();
		expect(movieDetailHeroInfoMeta.textContent).not.toContain("2h 30m");
		expect(movieDetailHeroInfoMeta.textContent).not.toContain(
			"dir. Christopher Nolan",
		);
	});
});
