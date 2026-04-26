import { makeMovieCredits } from "@tests/factories/make-movie-credits";
import { makeMovieDetails } from "@tests/factories/make-movie-details";
import { makeMovieVideos } from "@tests/factories/make-movie-videos";
import { makeMovieWatchProviders } from "@tests/factories/make-movie-watch-providers";
import {
	formatAudienceScore,
	formatAudienceScoreMax,
	formatAudienceVotes,
	mapMovieDetailsToBodyData,
	toAudienceScorePercentage,
} from "./movie-detail-body.utils";

describe("movieDetailBodyUtils", () => {
	it("should be able to prioritize official trailer over fallback trailers", async () => {
		const movieDetails = makeMovieDetails();
		const movieCredits = makeMovieCredits();
		const movieVideos = makeMovieVideos({
			results: [
				{
					id: "v1",
					key: "fallback-key",
					name: "Fallback Trailer",
					site: "YouTube",
					type: "Trailer",
					size: 1080,
					official: false,
					publishedAt: "2020-01-01T00:00:00.000Z",
				},
				{
					id: "v2",
					key: "official-key",
					name: "Official Trailer",
					site: "YouTube",
					type: "Trailer",
					size: 1080,
					official: true,
					publishedAt: "2020-01-02T00:00:00.000Z",
				},
			],
		});

		const bodyData = mapMovieDetailsToBodyData({
			movie: movieDetails,
			credits: movieCredits,
			videos: movieVideos,
			watchProviders: makeMovieWatchProviders(),
		});

		expect(bodyData.trailer).toEqual({
			title: "Official Trailer",
			key: "official-key",
		});
	});

	it("should be able to fallback to first youtube trailer when official trailer does not exist", async () => {
		const movieDetails = makeMovieDetails();
		const movieCredits = makeMovieCredits();
		const movieVideos = makeMovieVideos({
			results: [
				{
					id: "v1",
					key: "fallback-key",
					name: "Fallback Trailer",
					site: "YouTube",
					type: "Trailer",
					size: 1080,
					official: false,
					publishedAt: "2020-01-01T00:00:00.000Z",
				},
			],
		});

		const bodyData = mapMovieDetailsToBodyData({
			movie: movieDetails,
			credits: movieCredits,
			videos: movieVideos,
			watchProviders: makeMovieWatchProviders(),
		});

		expect(bodyData.trailer).toEqual({
			title: "Fallback Trailer",
			key: "fallback-key",
		});
	});

	it("should be able to map cast and key crew with limits and labels", async () => {
		const movieDetails = makeMovieDetails();
		const movieCredits = makeMovieCredits({
			cast: Array.from({ length: 12 }, (_, index) => ({
				id: index + 1,
				name: `Cast ${index + 1}`,
				character: `Role ${index + 1}`,
				order: index,
				profilePath: null,
			})),
		});

		const bodyData = mapMovieDetailsToBodyData({
			movie: movieDetails,
			credits: movieCredits,
			videos: makeMovieVideos(),
			watchProviders: makeMovieWatchProviders(),
		});

		expect(bodyData.cast).toHaveLength(8);
		expect(bodyData.cast[0]).toEqual({
			id: "1",
			name: "Cast 1",
			role: "Role 1",
			profilePath: null,
		});
		expect(bodyData.keyCrew).toEqual([
			{ role: "Director", name: "Christopher Nolan" },
			{ role: "Cinematography", name: "Hoyte van Hoytema" },
			{ role: "Score", name: "Ludwig Göransson" },
			{ role: "Editor", name: "Jennifer Lame" },
		]);
	});

	it("should be able to return null whereToWatch when providers are unavailable", async () => {
		const bodyData = mapMovieDetailsToBodyData({
			movie: makeMovieDetails(),
			credits: makeMovieCredits(),
			videos: makeMovieVideos(),
			watchProviders: makeMovieWatchProviders({ results: {} }),
		});

		expect(bodyData.whereToWatch).toBeNull();
	});

	it("should be able to build whereToWatch with partial providers", async () => {
		const bodyData = mapMovieDetailsToBodyData({
			movie: makeMovieDetails(),
			credits: makeMovieCredits(),
			videos: makeMovieVideos(),
			watchProviders: makeMovieWatchProviders({
				results: {
					US: {
						link: "https://watch.example/us",
						flatrate: [],
						rent: [
							{
								providerId: 2,
								providerName: "Apple TV",
								logoPath: "/apple-tv.jpg",
								displayPriority: 2,
							},
						],
						buy: [],
					},
				},
			}),
		});

		expect(bodyData.whereToWatch).toEqual({
			region: "US",
			options: [{ id: "rent", label: "Rent · Apple TV", icon: "download" }],
			footnote: "Available on 1 platform in your region.",
		});
	});

	it("should be able to format audience score labels and percentage", async () => {
		const formattedScore = formatAudienceScore(7.349);
		const formattedScoreMax = formatAudienceScoreMax(10);
		const formattedVotes = formatAudienceVotes(1_500_000);
		const scorePercentage = toAudienceScorePercentage(7.3, 10);

		expect(formattedScore).toBe("7.3");
		expect(formattedScoreMax).toBe("/ 10");
		expect(formattedVotes).toBe("1,500,000 votes");
		expect(scorePercentage).toBe(73);
	});

	it("should not be able to calculate score percentage when max is zero", async () => {
		const scorePercentage = toAudienceScorePercentage(7.3, 0);

		expect(scorePercentage).toBe(0);
	});
});
