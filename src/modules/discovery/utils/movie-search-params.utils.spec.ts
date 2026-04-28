import {
	DEFAULT_DISCOVERY_GENRE,
	DEFAULT_DISCOVERY_MIN_RATING,
	DEFAULT_DISCOVERY_SORT,
	DEFAULT_DISCOVERY_YEAR_FROM,
	DEFAULT_DISCOVERY_YEAR_TO,
} from "../constants/discovery-filters";
import type { DiscoveryFilters } from "../types/discovery-filters";
import {
	buildDiscoverMoviesSearchParams,
	buildSearchMoviesSearchParams,
} from "./movie-search-params.utils";

describe("movieSearchParamsUtils", () => {
	it("should be able to build search movies params without year", async () => {
		const searchMoviesSearchParams = buildSearchMoviesSearchParams({
			query: "tenet",
			page: 2,
			language: "en-US",
		});

		expect(searchMoviesSearchParams.get("query")).toBe("tenet");
		expect(searchMoviesSearchParams.get("page")).toBe("2");
		expect(searchMoviesSearchParams.get("language")).toBe("en-US");
		expect(searchMoviesSearchParams.get("include_adult")).toBe("false");
		expect(searchMoviesSearchParams.get("primary_release_year")).toBeNull();
	});

	it("should be able to build search movies params with year", async () => {
		const searchMoviesSearchParams = buildSearchMoviesSearchParams({
			query: "arrival",
			page: 1,
			year: 2016,
			language: "pt-BR",
		});

		expect(searchMoviesSearchParams.get("query")).toBe("arrival");
		expect(searchMoviesSearchParams.get("page")).toBe("1");
		expect(searchMoviesSearchParams.get("language")).toBe("pt-BR");
		expect(searchMoviesSearchParams.get("primary_release_year")).toBe("2016");
	});

	it("should be able to build discover movies params with default filters", async () => {
		const defaultFilters: DiscoveryFilters = {
			genre: DEFAULT_DISCOVERY_GENRE,
			yearFrom: DEFAULT_DISCOVERY_YEAR_FROM,
			yearTo: DEFAULT_DISCOVERY_YEAR_TO,
			minRating: DEFAULT_DISCOVERY_MIN_RATING,
			sort: DEFAULT_DISCOVERY_SORT,
		};

		const discoverMoviesSearchParams = buildDiscoverMoviesSearchParams({
			page: 1,
			language: "en-US",
			filters: defaultFilters,
		});

		expect(discoverMoviesSearchParams.get("page")).toBe("1");
		expect(discoverMoviesSearchParams.get("language")).toBe("en-US");
		expect(discoverMoviesSearchParams.get("include_adult")).toBe("false");
		expect(discoverMoviesSearchParams.get("include_video")).toBe("false");
		expect(discoverMoviesSearchParams.get("sort_by")).toBe("popularity.desc");
		expect(discoverMoviesSearchParams.get("vote_count.gte")).toBeNull();
		expect(discoverMoviesSearchParams.get("with_genres")).toBeNull();
		expect(
			discoverMoviesSearchParams.get("primary_release_date.gte"),
		).toBeNull();
		expect(
			discoverMoviesSearchParams.get("primary_release_date.lte"),
		).toBeNull();
		expect(discoverMoviesSearchParams.get("vote_average.gte")).toBeNull();
	});

	it("should be able to build discover movies params with active filters", async () => {
		const activeFilters: DiscoveryFilters = {
			genre: "Action",
			yearFrom: 1990,
			yearTo: 1999,
			minRating: 8,
			sort: "critics-picks",
		};

		const discoverMoviesSearchParams = buildDiscoverMoviesSearchParams({
			page: 3,
			language: "pt-BR",
			filters: activeFilters,
		});

		expect(discoverMoviesSearchParams.get("page")).toBe("3");
		expect(discoverMoviesSearchParams.get("language")).toBe("pt-BR");
		expect(discoverMoviesSearchParams.get("sort_by")).toBe("vote_average.desc");
		expect(discoverMoviesSearchParams.get("vote_count.gte")).toBe("300");
		expect(discoverMoviesSearchParams.get("with_genres")).toBe("28");
		expect(discoverMoviesSearchParams.get("primary_release_date.gte")).toBe(
			"1990-01-01",
		);
		expect(discoverMoviesSearchParams.get("primary_release_date.lte")).toBe(
			"1999-12-31",
		);
		expect(discoverMoviesSearchParams.get("vote_average.gte")).toBe("8");
	});

	it("should be able to build discover movies params with vote count for rating desc", async () => {
		const ratingDescFilters: DiscoveryFilters = {
			genre: DEFAULT_DISCOVERY_GENRE,
			yearFrom: DEFAULT_DISCOVERY_YEAR_FROM,
			yearTo: DEFAULT_DISCOVERY_YEAR_TO,
			minRating: DEFAULT_DISCOVERY_MIN_RATING,
			sort: "rating-desc",
		};

		const discoverMoviesSearchParams = buildDiscoverMoviesSearchParams({
			page: 1,
			language: "en-US",
			filters: ratingDescFilters,
		});

		expect(discoverMoviesSearchParams.get("sort_by")).toBe("vote_average.desc");
		expect(discoverMoviesSearchParams.get("vote_count.gte")).toBe("300");
	});
});
