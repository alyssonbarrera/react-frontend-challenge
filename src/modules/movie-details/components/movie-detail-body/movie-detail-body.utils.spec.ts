import { makeMovieCredits } from "@tests/factories/make-movie-credits";
import { makeMovieDetails } from "@tests/factories/make-movie-details";
import {
	formatAudienceScore,
	formatAudienceScoreMax,
	formatAudienceVotes,
	mapMovieDetailsToBodyData,
	toAudienceScorePercentage,
} from "./movie-detail-body.utils";

describe("movieDetailBodyUtils", () => {
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
