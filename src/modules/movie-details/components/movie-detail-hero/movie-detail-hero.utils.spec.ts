import { makeMovieCredits } from "@tests/factories/make-movie-credits";
import { makeMovieDetails } from "@tests/factories/make-movie-details";
import {
	buildBackdropUrl,
	formatHeroRating,
	formatHeroRatingMax,
	formatReleaseDate,
	formatRuntime,
	getDirectorLabel,
	mapMovieDetailsToHeroData,
	mapMovieDetailsToWatchlistMovie,
} from "./movie-detail-hero.utils";

describe("movieDetailHeroUtils", () => {
	it("should be able to return empty backdrop url when path is null", async () => {
		const backdropUrl = buildBackdropUrl(null);

		expect(backdropUrl).toBe("");
	});

	it("should be able to return empty runtime when runtime is null or zero", async () => {
		const nullRuntime = formatRuntime(null);
		const zeroRuntime = formatRuntime(0);

		expect(nullRuntime).toBe("");
		expect(zeroRuntime).toBe("");
	});

	it("should be able to format runtime with hours and minutes", async () => {
		const formattedRuntime = formatRuntime(125);

		expect(formattedRuntime).toBe("2h 5m");
	});

	it("should not be able to format release date from an invalid release date", async () => {
		const releaseDate = formatReleaseDate("invalid-date");

		expect(releaseDate).toBe("");
	});

	it("should be able to return an empty director label when director is absent", async () => {
		const creditsWithoutDirector = makeMovieCredits({
			crew: [
				{
					id: 1,
					name: "Jane Doe",
					job: "Producer",
					department: "Production",
					profilePath: null,
				},
			],
		});

		const directorLabel = getDirectorLabel(creditsWithoutDirector);

		expect(directorLabel).toBe("");
	});

	it("should be able to map movie details to hero data", async () => {
		const movieDetails = makeMovieDetails({
			title: "Tenet",
			backdropPath: "/backdrop.jpg",
			releaseDate: "2020-08-26",
			runtime: 150,
			voteAverage: 7.3,
			genres: [{ id: 28, name: "Action" }],
		});
		const movieCredits = makeMovieCredits();

		const heroData = mapMovieDetailsToHeroData(movieDetails, movieCredits);

		expect(heroData).toEqual({
			title: "Tenet",
			backdropUrl: "https://image.tmdb.org/t/p/original/backdrop.jpg",
			posterUrl: "https://image.tmdb.org/t/p/w500/poster.jpg",
			primaryGenre: "ACTION",
			rating: 7.3,
			ratingMax: 10,
			releaseDate: "Aug 26, 2020",
			runtime: "2h 30m",
			director: "dir. Christopher Nolan",
		});
	});

	it("should be able to map movie details to watchlist movie", async () => {
		const movieDetails = makeMovieDetails({
			genres: [
				{ id: 28, name: "Action" },
				{ id: 12, name: "Adventure" },
			],
		});

		const watchlistMovie = mapMovieDetailsToWatchlistMovie(movieDetails);

		expect(watchlistMovie.genreIds).toEqual([28, 12]);
		expect(watchlistMovie.title).toBe(movieDetails.title);
	});

	it("should be able to format hero rating and max rating", async () => {
		const formattedHeroRating = formatHeroRating(7.345);
		const formattedHeroRatingMax = formatHeroRatingMax(10);

		expect(formattedHeroRating).toBe("7.3");
		expect(formattedHeroRatingMax).toBe("/ 10");
	});
});
