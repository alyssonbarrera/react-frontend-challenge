import type {
	CastMember,
	CrewMember,
	MovieCredits,
	TmdbCastMemberResponse,
	TmdbCrewMemberResponse,
	TmdbMovieCreditsResponse,
} from "../dtos/movie-credits";

function mapCastMember(raw: TmdbCastMemberResponse): CastMember {
	return {
		id: raw.id,
		name: raw.name,
		character: raw.character,
		order: raw.order,
		profilePath: raw.profile_path,
	};
}

function mapCrewMember(raw: TmdbCrewMemberResponse): CrewMember {
	return {
		id: raw.id,
		name: raw.name,
		job: raw.job,
		department: raw.department,
		profilePath: raw.profile_path,
	};
}

export function mapTmdbMovieCredits(
	raw: TmdbMovieCreditsResponse,
): MovieCredits {
	return {
		movieId: raw.id,
		cast: raw.cast.map(mapCastMember),
		crew: raw.crew.map(mapCrewMember),
	};
}
