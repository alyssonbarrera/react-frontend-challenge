import {
	MOVIE_DETAIL_KEY_CREW_JOBS,
	MOVIE_DETAIL_MAX_CAST_MEMBERS,
	MOVIE_DETAIL_RATING_MAX,
	type MovieDetailCrewJob,
} from "../../constants/movie-detail.constants";
import type { MovieCredits } from "../../dtos/movie-credits";
import type { MovieDetails } from "../../dtos/movie-details";

export type CastMember = {
	id: string;
	name: string;
	role: string;
	profilePath: string | null;
};

export type CrewMember = {
	role: string;
	name: string;
};

export type MovieDetailBodyData = {
	synopsis: string;
	cast: ReadonlyArray<CastMember>;
	audienceScore: {
		score: number;
		max: number;
		votes: number;
	};
	keyCrew: ReadonlyArray<CrewMember>;
};

function mapCast(credits: MovieCredits | undefined): ReadonlyArray<CastMember> {
	if (!credits) {
		return [];
	}

	const limitedCast = credits.cast.slice(0, MOVIE_DETAIL_MAX_CAST_MEMBERS);
	const mappedCast = limitedCast.map((member) => ({
		id: String(member.id),
		name: member.name,
		role: member.character,
		profilePath: member.profilePath,
	}));

	return mappedCast;
}

function mapKeyCrew(
	credits: MovieCredits | undefined,
): ReadonlyArray<CrewMember> {
	if (!credits) {
		return [];
	}

	const mapCrewJobToKeyCrewMember = createCrewJobToKeyCrewMemberMapper(
		credits.crew,
	);

	return MOVIE_DETAIL_KEY_CREW_JOBS.flatMap(mapCrewJobToKeyCrewMember);
}

function createCrewJobToKeyCrewMemberMapper(crew: MovieCredits["crew"]) {
	return function mapCrewJobToKeyCrewMember(
		crewJob: MovieDetailCrewJob,
	): ReadonlyArray<CrewMember> {
		const member = crew.find((person) => person.job === crewJob.job);

		if (!member) {
			return [];
		}

		return [{ role: crewJob.label, name: member.name }];
	};
}

export function mapMovieDetailsToBodyData(params: {
	movie: MovieDetails;
	credits: MovieCredits | undefined;
}): MovieDetailBodyData {
	const { movie, credits } = params;

	return {
		synopsis: movie.overview,
		cast: mapCast(credits),
		audienceScore: {
			score: movie.voteAverage,
			max: MOVIE_DETAIL_RATING_MAX,
			votes: movie.voteCount,
		},
		keyCrew: mapKeyCrew(credits),
	};
}

export function formatAudienceScore(score: number): string {
	return score.toFixed(1);
}

export function formatAudienceScoreMax(max: number): string {
	return `/ ${max}`;
}

export function formatAudienceVotes(votes: number): string {
	return `${votes.toLocaleString("en-US")} votes`;
}

export function toAudienceScorePercentage(score: number, max: number): number {
	if (max <= 0) {
		return 0;
	}

	return Math.round((score / max) * 100);
}
