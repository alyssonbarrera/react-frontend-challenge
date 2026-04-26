export type TmdbCastMemberResponse = {
	id: number;
	name: string;
	character: string;
	order: number;
	profile_path: string | null;
};

export type TmdbCrewMemberResponse = {
	id: number;
	name: string;
	job: string;
	department: string;
	profile_path: string | null;
};

export type TmdbMovieCreditsResponse = {
	id: number;
	cast: TmdbCastMemberResponse[];
	crew: TmdbCrewMemberResponse[];
};

export type CastMember = {
	id: number;
	name: string;
	character: string;
	order: number;
	profilePath: string | null;
};

export type CrewMember = {
	id: number;
	name: string;
	job: string;
	department: string;
	profilePath: string | null;
};

export type MovieCredits = {
	movieId: number;
	cast: ReadonlyArray<CastMember>;
	crew: ReadonlyArray<CrewMember>;
};
