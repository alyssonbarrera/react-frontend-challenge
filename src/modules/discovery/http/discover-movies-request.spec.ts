import {
	DEFAULT_DISCOVERY_GENRE,
	DEFAULT_DISCOVERY_MIN_RATING,
	DEFAULT_DISCOVERY_SORT,
	DEFAULT_DISCOVERY_YEAR_FROM,
	DEFAULT_DISCOVERY_YEAR_TO,
} from "../constants/discovery-filters";
import { discoverMoviesRequest } from "./discover-movies-request";

describe("discoverMoviesRequest", () => {
	it("should be able to discover movies", async () => {
		const discoverMoviesRequestResponse = await discoverMoviesRequest({
			filters: {
				genre: DEFAULT_DISCOVERY_GENRE,
				yearFrom: DEFAULT_DISCOVERY_YEAR_FROM,
				yearTo: DEFAULT_DISCOVERY_YEAR_TO,
				minRating: DEFAULT_DISCOVERY_MIN_RATING,
				sort: DEFAULT_DISCOVERY_SORT,
			},
		});

		expect(discoverMoviesRequestResponse.page).toBe(1);
		expect(discoverMoviesRequestResponse.totalPages).toBe(1);
		expect(discoverMoviesRequestResponse.totalResults).toBe(1);
		expect(discoverMoviesRequestResponse.results).toHaveLength(1);
		expect(discoverMoviesRequestResponse.results[0]).toEqual({
			id: 1,
			title: "Tenet",
			originalTitle: "Tenet",
			overview: "",
			posterPath: "/poster.jpg",
			backdropPath: null,
			releaseDate: "2020-08-26",
			voteAverage: 7.3,
			voteCount: 100,
			popularity: 0,
			genreIds: [28, 12],
			originalLanguage: "en",
			adult: false,
			video: false,
		});
	});
});
